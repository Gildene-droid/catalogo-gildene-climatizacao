import React, {useRef, useState} from 'react';
import {Lead, leadsEnabled, saveLead, validateLead} from '../leadCapture';

export default function ContactCapture({onClose}: {onClose: () => void}) {
  const [lead, setLead] = useState<Lead>({name:'',phone:'',email:'',city:'',interest:'',source:'Consultor do site',website:''});
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const requestId = useRef(crypto.randomUUID());
  const field = (key: keyof Lead, label: string, required = true, type = 'text') => (
    <label className="block text-xs font-bold text-slate-700">{label}{required ? ' *' : ' (opcional)'}
      <input type={type} required={required} maxLength={250} value={lead[key] || ''}
        onChange={e => setLead({...lead,[key]:e.target.value})} disabled={busy}
        className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm font-normal" />
    </label>
  );
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy || saved) return;
    const invalid = validateLead(lead);
    if (invalid) {setError(invalid);return;}
    setBusy(true);setError('');
    try {await saveLead(lead,requestId.current);setSaved(true);}
    catch (e) {setError(e instanceof Error ? e.message : 'Falha ao salvar. Tente novamente.');}
    finally {setBusy(false);}
  };
  const message = encodeURIComponent(`Olá! Quero atendimento da GouveClima.\nNome: ${lead.name}\nWhatsApp: ${lead.phone}\nCidade: ${lead.city}\nInteresse: ${lead.interest}\nE-mail: ${lead.email || 'Não informado'}`);
  return <div className="space-y-4">
    {saved ? <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">Cadastro recebido! A GouveClima entrará em contato.</p> :
      <form onSubmit={submit} className="space-y-3">
        {field('name','Nome')}{field('phone','WhatsApp com DDD',true,'tel')}
        {field('email','E-mail',false,'email')}{field('city','Cidade / UF')}{field('interest','O que você procura?')}
        <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" value={lead.website} onChange={e=>setLead({...lead,website:e.target.value})}/></div>
        <p className="text-xs text-slate-500">Ao solicitar contato, você envia seus dados à GouveClima para atendimento e orçamento.</p>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy || !leadsEnabled()} className="w-full rounded-xl bg-sky-600 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? 'Enviando…' : 'Solicitar contato'}</button>
        {!leadsEnabled() && <p className="text-xs text-slate-600">Cadastro em preparação. Entre em contato pelos botões abaixo.</p>}
      </form>}
    <div className="grid grid-cols-2 gap-3 text-center text-xs font-bold">
      <a href={`https://wa.me/5561981108374?text=${message}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-600 p-3 text-white">WhatsApp</a>
      <a href={`mailto:gouveiafrio@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20contato&body=${message}`} className="rounded-xl bg-slate-800 p-3 text-white">E-mail</a>
    </div>
    <button type="button" onClick={onClose} disabled={busy} className="w-full text-sm text-slate-600">Fechar</button>
  </div>;
}
