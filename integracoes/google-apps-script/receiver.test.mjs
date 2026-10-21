import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

function receiver() {
  const rows = [];
  let fail = false;
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length + 1,
    getRange: (row,col) => ({
      getValue: () => 'ID do cadastro',
      createTextFinder: id => ({matchEntireCell: () => ({findNext: () => rows.some(r=>r[9]===id)})}),
      setNumberFormat: () => ({setValues: values => {if (fail) throw Error('write failed'); rows.push(...values);}}),
    }),
  };
  const context = vm.createContext({
    PropertiesService: {getScriptProperties: () => ({getProperty: () => 'private-test-id'})},
    ContentService: {createTextOutput: x=>x},
    LockService: {getScriptLock: () => ({waitLock: () => {locked=true;},releaseLock: () => {locked=false;}})},
    SpreadsheetApp: {openById: () => ({getSheetByName:()=>sheet}),flush:()=>{}},
    Utilities: {formatDate: () => '21/10/2026 15:00:00'},
    HtmlService: {XFrameOptionsMode:{ALLOWALL:'allow'},createHtmlOutput: html => ({setXFrameOptionsMode:()=>html})},
  });
  vm.runInContext(readFileSync(new URL('./Code.gs',import.meta.url),'utf8'),context);
  return {rows,send: data=>context.doPost({parameter:{payload:JSON.stringify(data)}}),fail:()=>{fail=true;},locked:()=>locked};
}
const lead = {requestId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',name:'Cliente de teste',phone:'61999990000',city:'Brasília / DF',interest:'Ar-condicionado',email:'teste@example.com',source:'Consultor do site'};

test('acknowledges only a saved row and keeps receiver write-only',()=>{
  const r=receiver(); const html=r.send(lead);
  assert.equal(r.rows.length,1);assert.match(html,/"ok":true/);
  assert.ok(!html.includes(lead.phone));assert.equal(r.locked(),false);
});
test('retries with same ID do not duplicate rows',()=>{
  const r=receiver();r.send(lead);r.send(lead);assert.equal(r.rows.length,1);
});
test('invalid contact and honeypot are rejected without saving',()=>{
  for (const change of [{phone:'12'},{city:''},{email:'invalid'},{website:'spam'},{requestId:'</script>'}]) {
    const r=receiver();assert.match(r.send({...lead,...change}),/"ok":false/);assert.equal(r.rows.length,0);
  }
});
test('spreadsheet failure returns failure and releases lock',()=>{
  const r=receiver();r.fail();assert.match(r.send(lead),/"ok":false/);assert.equal(r.locked(),false);assert.equal(r.rows.length,0);
});
test('spreadsheet formula injection is neutralized',()=>{
  const r=receiver();r.send({...lead,name:'=IMPORTXML("x")',details:'+SUM(1,2)'});
  assert.equal(r.rows[0][1],"'=IMPORTXML(\"x\")");assert.equal(r.rows[0][6],"'+SUM(1,2)");
});
