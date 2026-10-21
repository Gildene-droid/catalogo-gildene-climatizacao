/** Public write-only receiver. The spreadsheet itself remains private. */
// Configure privately in Apps Script > Project Settings > Script Properties.
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const SITE_ORIGIN = 'https://gildene-droid.github.io';
const TAB_NAME = 'Cadastros';

function doGet() {
  return ContentService.createTextOutput('GouveClima: receptor de cadastros.');
}

function doPost(event) {
  let requestId = '';
  let ok = false;
  try {
    const payload = event && event.parameter && event.parameter.payload;
    if (!payload || payload.length > 16000) throw new Error('Payload inválido');
    const data = JSON.parse(payload);
    requestId = String(data.requestId || '');
    if (!/^[a-f0-9-]{36}$/.test(requestId)) throw new Error('ID inválido');
    if (data.website) throw new Error('Cadastro inválido');
    const required = ['name','phone','city','interest','source'];
    required.forEach(key => {
      if (typeof data[key] !== 'string' || !data[key].trim() || data[key].length > 250) throw new Error('Campo inválido');
    });
    if (!/^\d{10,13}$/.test(data.phone.replace(/\D/g,''))) throw new Error('Telefone inválido');
    if (data.email && (typeof data.email !== 'string' || data.email.length > 250 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) throw new Error('E-mail inválido');
    if (data.details && (typeof data.details !== 'string' || data.details.length > 10000)) throw new Error('Detalhes inválidos');
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME);
      if (!sheet || sheet.getRange('J1').getValue() !== 'ID do cadastro') throw new Error('Planilha inválida');
      const lastRow = sheet.getLastRow();
      const exists = lastRow > 1 && sheet.getRange(2,10,lastRow-1,1).createTextFinder(requestId).matchEntireCell(true).findNext();
      if (!exists) {
        // Do not let public submissions execute formulas in the owner's sheet.
        const safe = value => {
          const text = String(value || '').trim();
          return /^[=+\-@]/.test(text) ? "'" + text : text;
        };
        const row = [Utilities.formatDate(new Date(),'America/Sao_Paulo','dd/MM/yyyy HH:mm:ss'),data.name,data.phone,data.email,data.city,data.interest,data.details,data.source,'Novo',requestId].map(safe);
        sheet.getRange(lastRow+1,1,1,10).setNumberFormat('@').setValues([row]);
        SpreadsheetApp.flush();
      }
      ok = true;
    } finally {lock.releaseLock();}
  } catch (error) {
    // Never include personal data or internal error details in the response.
    ok = false;
  }
  const result = JSON.stringify({type:'gouveclima-lead',requestId,ok}).replace(/</g,'\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><script>window.top.postMessage('+result+','+JSON.stringify(SITE_ORIGIN)+');</script>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
