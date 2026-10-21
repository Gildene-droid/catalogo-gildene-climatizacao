export interface Lead {
  name: string;
  phone: string;
  email?: string;
  city: string;
  interest: string;
  details?: string;
  source: string;
  website?: string;
}

// Public receiver address only. Never put Google credentials in this file.
export const LEADS_ENDPOINT = '';
export const leadsEnabled = () => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(LEADS_ENDPOINT);

export function validateLead(lead: Lead): string {
  if (!lead.name.trim() || !lead.city.trim() || !lead.interest.trim()) return 'Preencha nome, cidade e interesse.';
  if (!/^\d{10,13}$/.test(lead.phone.replace(/\D/g, ''))) return 'Informe um telefone com DDD válido.';
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) return 'Confira seu endereço de e-mail.';
  return '';
}

/** A POST is only successful after the receiver confirms the row was written. */
export function saveLead(lead: Lead, requestId: string): Promise<void> {
  const invalid = validateLead(lead);
  if (invalid) return Promise.reject(new Error(invalid));
  if (!leadsEnabled()) return Promise.reject(new Error('O cadastro está temporariamente indisponível. Fale conosco pelo WhatsApp ou e-mail.'));
  return new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    const form = document.createElement('form');
    const input = document.createElement('input');
    frame.name = `lead-${requestId}`;
    frame.hidden = true;
    frame.title = 'Envio do cadastro';
    form.hidden = true;
    form.method = 'POST';
    form.action = LEADS_ENDPOINT;
    form.target = frame.name;
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify({...lead, requestId});
    form.appendChild(input);
    let timer: ReturnType<typeof setTimeout>;
    const clean = () => {
      clearTimeout(timer);
      window.removeEventListener('message', receive);
      form.remove();
      frame.remove();
    };
    const receive = (event: MessageEvent) => {
      if (!/^https:\/\/([a-z0-9-]+\.)*googleusercontent\.com$/.test(event.origin)) return;
      const data = event.data;
      if (!data || data.type !== 'gouveclima-lead' || data.requestId !== requestId) return;
      clean();
      if (data.ok === true) resolve();
      else reject(new Error('Não foi possível salvar. Tente novamente ou fale conosco pelo WhatsApp.'));
    };
    window.addEventListener('message', receive);
    timer = setTimeout(() => {
      clean();
      reject(new Error('Não recebemos a confirmação. Tente novamente; o mesmo pedido não será duplicado.'));
    }, 30000);
    document.body.append(frame, form);
    try { form.submit(); } catch (error) { clean(); reject(error); }
  });
}
