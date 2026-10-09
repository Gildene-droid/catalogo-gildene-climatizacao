import React from 'react';
import { Filter, RotateCcw, Wifi, Zap, Maximize2 } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  availableBrands: string[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableBrands,
}: FilterSidebarProps) {
  
  const handleCapacityToggle = (capacity: number) => {
    const isChecked = filters.capacities.includes(capacity);
    const newCapacities = isChecked
      ? filters.capacities.filter((c) => c !== capacity)
      : [...filters.capacities, capacity];
    
    onFilterChange({ ...filters, capacities: newCapacities });
  };

  const handleBrandToggle = (brand: string) => {
    const brandLower = brand.toLowerCase();
    const isChecked = filters.brands.includes(brandLower);
    const newBrands = isChecked
      ? filters.brands.filter((b) => b !== brandLower)
      : [...filters.brands, brandLower];
    
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleTechChange = (tech: string) => {
    const newTech = filters.technologies.includes(tech)
      ? filters.technologies.filter((t) => t !== tech)
      : [...filters.technologies, tech];
    
    onFilterChange({ ...filters, technologies: newTech });
  };

  const handleCycleToggle = (cycle: string) => {
    const newCycles = filters.cycles.includes(cycle)
      ? filters.cycles.filter((c) => c !== cycle)
      : [...filters.cycles, cycle];
    
    onFilterChange({ ...filters, cycles: newCycles });
  };

  const handleCategorySelect = (category: string) => {
    const newCategory = filters.category === category ? '' : category;
    onFilterChange({ ...filters, category: newCategory });
  };

  const resetFilters = () => {
    onFilterChange({
      capacities: [],
      brands: [],
      technologies: [],
      cycles: [],
      category: '',
      hasWifi: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      energyRating: undefined,
      areaRange: undefined,
    });
  };

  const activeFiltersCount = 
    filters.capacities.length + 
    filters.brands.length + 
    filters.technologies.length + 
    filters.cycles.length + 
    (filters.category ? 1 : 0) +
    (filters.hasWifi !== undefined ? 1 : 0) +
    (filters.energyRating ? 1 : 0) +
    (filters.areaRange ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0);

  const allBrandNames = Array.from(
    new Set([
      'Midea',
      'Springer Carrier',
      'Carrier',
      'LG',
      'Samsung',
      'Daikin',
      'Fujitsu',
      'Gree',
      'Elgin',
      'Hisense',
      'TCL',
      'Agratto',
      'Philco',
      'Electrolux',
      ...availableBrands,
    ])
  );

  return (
    <aside className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6" id="filter-sidebar">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 font-black text-slate-800 text-base">
          <Filter className="w-5 h-5 text-sky-600" />
          Filtros Avançados
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-all bg-sky-50 px-2.5 py-1 rounded-lg cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Limpar ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Categoria */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Categorias</h4>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Split Hi Wall',
            'Piso Teto',
            'Cassete',
            'Multi Split',
            'VRF',
            'Janela',
            'Portátil',
          ].map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Marca (14 Oficiais) */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Marcas (14 Oficiais)</h4>
        <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {allBrandNames.map((brand) => {
            const brandLower = brand.toLowerCase();
            const isChecked = filters.brands.includes(brandLower);
            return (
              <label key={brand} className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className={isChecked ? 'font-black text-sky-700' : 'font-medium'}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Capacidade BTUs */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Capacidade (BTUs)</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '7.500 BTUs', value: 7500 },
            { label: '9.000 BTUs', value: 9000 },
            { label: '12.000 BTUs', value: 12000 },
            { label: '18.000 BTUs', value: 18000 },
            { label: '24.000 BTUs', value: 24000 },
            { label: '30.000 BTUs', value: 30000 },
            { label: '36.000 BTUs', value: 36000 },
            { label: '48.000+ BTUs', value: 48000 },
          ].map((item) => {
            const isChecked = filters.capacities.includes(item.value);
            return (
              <label key={item.value} className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCapacityToggle(item.value)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className={isChecked ? 'font-black text-sky-700' : 'font-medium'}>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Tecnologia */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Tecnologia</h4>
        <div className="space-y-2">
          {[
            { label: 'Inverter', value: 'Inverter' },
            { label: 'Dual Inverter', value: 'Dual Inverter' },
            { label: 'Convencional (On/Off)', value: 'Convencional' },
            { label: 'Compact Inverter', value: 'Compact Inverter' },
          ].map((item) => {
            const isChecked = filters.technologies.includes(item.value);
            return (
              <label key={item.value} className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTechChange(item.value)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className={isChecked ? 'font-black text-sky-700' : 'font-medium'}>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Ciclo */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Ciclo</h4>
        <div className="space-y-2">
          {['Frio', 'Quente e Frio'].map((cycle) => {
            const isChecked = filters.cycles.includes(cycle);
            return (
              <label key={cycle} className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCycleToggle(cycle)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className={isChecked ? 'font-black text-sky-700' : 'font-medium'}>{cycle}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Wi-Fi & Conectividade */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-sky-600" />
          Conectividade Wi-Fi
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onFilterChange({ ...filters, hasWifi: filters.hasWifi === true ? undefined : true })}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              filters.hasWifi === true
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Com Wi-Fi
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, hasWifi: filters.hasWifi === false ? undefined : false })}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              filters.hasWifi === false
                ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Sem Wi-Fi
          </button>
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Faixa de Preço (R$)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">Mínimo</label>
            <input
              type="number"
              placeholder="Ex: 1500"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">Máximo</label>
            <input
              type="number"
              placeholder="Ex: 8000"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Classificação Energética */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Eficiência Energética
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {['Selo Procel A', 'Classificação B'].map((rating) => {
            const isSelected = filters.energyRating === rating;
            return (
              <button
                key={rating}
                onClick={() => onFilterChange({ ...filters, energyRating: isSelected ? undefined : rating })}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                {rating}
              </button>
            );
          })}
        </div>
      </div>

      {/* Área Recomendada */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
          Área de Aplicação
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {['Até 10 m²', 'Até 15 m²', 'Até 20 m²', 'Até 30 m²', 'Até 36 m²', 'Até 45 m²', 'Até 60 m²', 'Até 70 m²', 'Até 80 m²'].map((area) => {
            const isSelected = filters.areaRange === area;
            return (
              <button
                key={area}
                onClick={() => onFilterChange({ ...filters, areaRange: isSelected ? undefined : area })}
                className={`px-2.5 py-1.5 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-sky-50/60 rounded-2xl p-4 border border-sky-100">
        <span className="text-xs font-black text-sky-700 uppercase block mb-1">GouveClima Oficial</span>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Mais de 200 modelos originais das 14 maiores fabricantes com suporte e consultoria especializada.
        </p>
      </div>
    </aside>
  );
}
