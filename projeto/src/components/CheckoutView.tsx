import React, { useState } from 'react';
import { MessageSquare, Mail, CheckCircle2, ShieldCheck, ArrowLeft, Trash2, FileText, Building, MapPin, Phone, User, Send } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  onBackToShopping: () => void;
  onClearCart: () => void;
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemoveItem?: (id: string) => void;
}

export default function CheckoutView({
  cart,
  onBackToShopping,
  onClearCart,
  onUpdateQuantity,
  onRemoveItem,
}: CheckoutViewProps) {
  // Form state
  const [personType, setPersonType] = useState<'PF' | 'PJ'>('PF');
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('DF');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [observacoes, setObservacoes] = useState('');

  // Tipo de Atendimento state
  const serviceOptions = [
    'Venda de equipamentos',
    'Projeto de climatização',
    'VRF',
    'Multi Split',
    'Comercial',
    'Residencial',
  ];
  const [selectedServices, setSelectedServices] = useState<string[]>(['Venda de equipamentos']);

  const toggleService = (option: string) => {
    setSelectedServices((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const [orderSent, setOrderSent] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [generatedEmailUrl, setGeneratedEmailUrl] = useState('');

  // Generate formatted WhatsApp message strictly as requested
  const buildWhatsAppMessage = () => {
    const productsText = cart
      .map(
        (item) =>
          `• ${item.product.name}\n  Marca: ${item.product.brand}\n  BTUs: ${item.product.capacityBTU.toLocaleString()} BTUs (${item.voltage})\n  Quantidade: ${item.quantity}`
      )
      .join('\n\n');

    const serviceText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Não informado';

    let clientInfo = `Perfil: ${personType === 'PJ' ? 'Pessoa Jurídica (PJ)' : 'Pessoa Física (PF)'}\nNome: ${nome || 'Não informado'}`;
    if (personType === 'PJ') {
      if (empresa) clientInfo += `\nEmpresa: ${empresa}`;
      if (cnpj) clientInfo += `\nCNPJ: ${cnpj}`;
    }

    return `Olá!

Gostaria de solicitar um orçamento.

Produtos escolhidos:

${productsText}

Tipo de Atendimento: ${serviceText}

${clientInfo}
Cidade/UF: ${cidade || 'Não informada'} - ${estado}
Telefone: ${telefone || 'Não informado'}
Observações: ${observacoes || 'Nenhuma'}`;
  };

  // Generate organized Email message
  const buildEmailMessage = () => {
    const productsText = cart
      .map(
        (item, idx) =>
          `ITEM ${idx + 1}:\n- Produto: ${item.product.name}\n- Marca: ${item.product.brand}\n- Capacidade: ${item.product.capacityBTU.toLocaleString()} BTUs\n- Tecnologia: ${item.product.technology} (${item.voltage})\n- Quantidade: ${item.quantity} unidade(s)\n`
      )
      .join('\n');

    const serviceText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Não informado';

    return `====================================================
SOLICITAÇÃO DE ORÇAMENTO - GOUVECLIMA — SOLUÇÕES EM CLIMATIZAÇÃO
====================================================

TIPO DE ATENDIMENTO SOLICITADO:
----------------------------------------------------
${serviceText}

DADOS DO CLIENTE:
----------------------------------------------------
• Perfil: ${personType === 'PJ' ? 'Pessoa Jurídica (PJ)' : 'Pessoa Física (PF)'}
• Nome: ${nome || 'Não informado'}
${personType === 'PJ' ? `• Empresa: ${empresa || 'Não informada'}\n• CNPJ: ${cnpj || 'Não informado'}\n` : ''}• Cidade / Estado: ${cidade || 'Não informada'} / ${estado}
• Telefone: ${telefone || 'Não informado'}
• WhatsApp: ${whatsapp || telefone || 'Não informado'}
• E-mail: ${email || 'Não informado'}

RELAÇÃO DE PRODUTOS SELECIONADOS:
----------------------------------------------------
${productsText}

OBSERVAÇÕES DO CLIENTE:
----------------------------------------------------
${observacoes || 'Nenhuma observação informada.'}

====================================================
Solicitação enviada através do Catálogo GouveClima
Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
====================================================`;
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!nome.trim() || !cidade.trim() || !telefone.trim() || !email.trim()) {
      alert('Por favor, preencha os campos obrigatórios: Nome, Cidade, Telefone e E-mail.');
      return;
    }

    if (cart.length === 0) {
      alert('Seu pedido está vazio! Escolha produtos no catálogo antes de solicitar um orçamento.');
      return;
    }

    const waMessage = buildWhatsAppMessage();
    const emailMessage = buildEmailMessage();
    
    const targetNumber = '5561981108374';
    const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(waMessage)}`;

    const mailSubject = encodeURIComponent('Solicitação de Orçamento - Site GouveClima — Soluções em Climatização');
    const mailUrl = `mailto:gouveiafrio@gmail.com?subject=${mailSubject}&body=${encodeURIComponent(emailMessage)}`;

    setGeneratedWhatsAppUrl(waUrl);
    setGeneratedEmailUrl(mailUrl);
    setOrderSent(true);

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!nome.trim() || !cidade.trim() || !telefone.trim() || !email.trim()) {
      alert('Por favor, preencha os campos obrigatórios: Nome, Cidade, Telefone e E-mail.');
      return;
    }

    if (cart.length === 0) {
      alert('Seu pedido está vazio! Escolha produtos no catálogo antes de solicitar um orçamento.');
      return;
    }

    const waMessage = buildWhatsAppMessage();
    const emailMessage = buildEmailMessage();

    const targetNumber = '5561981108374';
    const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(waMessage)}`;

    const mailSubject = encodeURIComponent('Solicitação de Orçamento - Site GouveClima — Soluções em Climatização');
    const mailUrl = `mailto:gouveiafrio@gmail.com?subject=${mailSubject}&body=${encodeURIComponent(emailMessage)}`;

    setGeneratedWhatsAppUrl(waUrl);
    setGeneratedEmailUrl(mailUrl);
    setOrderSent(true);

    window.location.href = mailUrl;
  };

  if (orderSent) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in" id="quote-success">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-50 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div className="space-y-3">
          <span className="px-3.5 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full uppercase tracking-wider border border-emerald-100">
            Solicitação Enviada
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Recebemos sua solicitação!
          </h2>
          <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base font-semibold leading-relaxed bg-sky-50 p-4 rounded-2xl border border-sky-100">
            Recebemos sua solicitação! Em breve um especialista da GouveClima — Soluções em Climatização entrará em contato com a melhor condição comercial para sua região.
          </p>
        </div>

        {/* Resumo da mensagem */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 text-left space-y-4 max-w-xl mx-auto text-xs text-slate-700 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="font-extrabold text-slate-900 uppercase font-mono">GouveClima — Soluções em Climatização</span>
            <span className="text-[10px] text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full font-bold">WhatsApp: +55 61 98110-8374</span>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-900 block">Itens Solicitados ({cart.length}):</span>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <li key={idx} className="bg-white p-2.5 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-slate-800 block">{item.product.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.product.brand} • {item.product.capacityBTU.toLocaleString()} BTUs • {item.voltage}
                    </span>
                  </div>
                  <span className="font-black text-sky-700 bg-sky-50 px-2 py-1 rounded-lg">
                    Qtd: {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200/80 pt-3 space-y-1 text-slate-600">
            <p><strong>Perfil:</strong> {personType === 'PJ' ? 'Pessoa Jurídica (PJ)' : 'Pessoa Física (PF)'}</p>
            <p><strong>Nome:</strong> {nome}</p>
            {personType === 'PJ' && empresa && <p><strong>Empresa:</strong> {empresa}</p>}
            {personType === 'PJ' && cnpj && <p><strong>CNPJ:</strong> {cnpj}</p>}
            <p><strong>Tipo de Atendimento:</strong> {selectedServices.join(', ')}</p>
            <p><strong>Cidade/UF:</strong> {cidade} - {estado}</p>
            <p><strong>Telefone / WhatsApp:</strong> {telefone} {whatsapp ? `/ ${whatsapp}` : ''}</p>
            <p><strong>E-mail:</strong> {email}</p>
            {observacoes && <p><strong>Observações:</strong> {observacoes}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xl mx-auto pt-2">
          <a
            href={generatedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl transition-all shadow-lg hover:shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <MessageSquare className="w-4 h-4" />
            Enviar pelo WhatsApp
          </a>

          <a
            href={generatedEmailUrl}
            className="w-full sm:flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Mail className="w-4 h-4" />
            Enviar por E-mail
          </a>
        </div>

        <div>
          <button
            onClick={() => {
              onClearCart();
              onBackToShopping();
            }}
            className="text-xs text-slate-500 hover:text-slate-800 font-bold underline transition-colors"
          >
            Limpar Pedido e Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="quote-request-view">
      
      {/* Header back button & title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={onBackToShopping}
          className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-500 hover:text-sky-600 transition-colors uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Catálogo
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          Atendimento Direto: +55 (61) 98110-8374 | gouveiafrio@gmail.com
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 block font-mono">
              Solicitação de Orçamento
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Preencha seus dados para receber a proposta
            </h1>
            <p className="text-xs text-slate-500">
              Sem compromisso. Nossa equipe enviará os valores e condições especiais de faturamento.
            </p>
          </div>

          <form className="space-y-4">
            
            {/* Tipo de Pessoa (PF / PJ) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Tipo de Perfil <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setPersonType('PF')}
                  className={`py-2 px-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    personType === 'PF'
                      ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pessoa Física (PF)
                </button>
                <button
                  type="button"
                  onClick={() => setPersonType('PJ')}
                  className={`py-2 px-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    personType === 'PJ'
                      ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pessoa Jurídica (PJ)
                </button>
              </div>
            </div>

            {/* Tipo de Atendimento */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700 block">
                Tipo de Atendimento <span className="text-slate-400 font-normal">(Selecione um ou mais)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((option) => {
                  const isSelected = selectedServices.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleService(option)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50 text-sky-800 border-sky-300 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nome */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nome Completo <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Campos exclusivos PJ */}
            {personType === 'PJ' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Empresa / Razão Social <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Nome da empresa"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium"
                    />
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    CNPJ <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 font-mono transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* Cidade & Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cidade <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Sua cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Estado <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  placeholder="DF, SP, etc."
                  value={estado}
                  onChange={(e) => setEstado(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 text-center font-bold uppercase transition-all"
                />
              </div>
            </div>

            {/* Telefone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Telefone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="(61) 98110-8374"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  WhatsApp <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="(61) 98110-8374"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium"
                  />
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                E-mail <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Observações <span className="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Descreva se precisa de instalação, preferências de faturamento, prazos, etc."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-800 transition-all font-medium resize-none"
              />
            </div>

            {/* ENVIO BUTTONS */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                disabled={cart.length === 0}
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-sky-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Send className="w-4 h-4" />
                Enviar Solicitação de Orçamento
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  disabled={cart.length === 0}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Enviar pelo WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={cart.length === 0}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl shadow-xs disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Enviar por E-mail
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center font-medium">
                Envio direto para WhatsApp (+55 61 98110-8374) ou E-mail (gouveiafrio@gmail.com)
              </p>
            </div>

          </form>
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">
              Produtos Selecionados ({cart.length})
            </h3>
            <button
              onClick={onBackToShopping}
              className="text-[10px] text-sky-600 font-extrabold hover:underline"
            >
              + Adicionar mais itens
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <FileText className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-xs font-bold">Nenhum produto no pedido</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-2xl flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain bg-white rounded-xl border border-slate-100 p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0 leading-tight">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2">{item.product.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {item.product.brand} • {item.product.capacityBTU.toLocaleString()} BTUs • {item.voltage}
                    </span>
                    <span className="text-[10px] text-sky-700 font-extrabold block mt-0.5">
                      Qtd: {item.quantity}
                    </span>
                  </div>
                  {onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-all cursor-pointer"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
            <span className="font-extrabold text-sky-800 block">✓ Atendimento Consultivo</span>
            <p className="leading-relaxed text-[11px]">
              Sua lista de produtos será encaminhada para a consultora Gildene Gomes para verificação de estoques, descontos por volume e cálculo logístico.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
