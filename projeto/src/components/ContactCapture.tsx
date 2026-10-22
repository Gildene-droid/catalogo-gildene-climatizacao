import React from 'react';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScR7cGHYFtRxW9egHne7_C88RB740T_o2v6UnFp2znARso31Q/viewform';

export default function ContactCapture({onClose}: {onClose: () => void}) {
  return <div className="space-y-4">
    <p className="text-xs text-slate-600">Preencha o cadastro abaixo para solicitar atendimento e orçamento. Os dados serão recebidos pela GouveClima e não serão exibidos a outros visitantes.</p>
    <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-sky-600 p-3 text-center text-sm font-bold text-white">Abrir cadastro em outra janela</a>
    <iframe src={FORM_URL + '?embedded=true'} title="Cadastro de clientes GouveClima" style={{width:'100%',height:'680px',border:0}} referrerPolicy="strict-origin-when-cross-origin">Carregando cadastro…</iframe>
    <div className="grid grid-cols-2 gap-3 text-center text-xs font-bold">
      <a href="https://wa.me/5561981108374?text=Ol%C3%A1!%20Quero%20atendimento%20da%20GouveClima." target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-600 p-3 text-white">WhatsApp</a>
      <a href="mailto:gouveiafrio@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20contato" className="rounded-xl bg-slate-800 p-3 text-white">E-mail</a>
    </div>
    <button type="button" onClick={onClose} className="w-full text-sm text-slate-600">Fechar</button>
  </div>;
}
