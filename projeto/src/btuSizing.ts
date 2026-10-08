export const capacityGuide = [
  { btu: 7500, area: 'Até 10 m²', application: 'Ambientes pequenos' },
  { btu: 9000, area: '11 a 15 m²', application: 'Quartos e escritórios pequenos' },
  { btu: 12000, area: '16 a 20 m²', application: 'Quartos e salas pequenas' },
  { btu: 18000, area: '21 a 30 m²', application: 'Salas e ambientes médios' },
  { btu: 24000, area: '31 a 36 m²', application: 'Salas grandes e integradas' },
  { btu: 30000, area: '37 a 45 m²', application: 'Salas comerciais' },
  { btu: 36000, area: '46 a 60 m²', application: 'Ambientes maiores; piso-teto ou cassete' },
  { btu: 48000, area: '61 a 70 m²', application: 'Áreas corporativas e ambientes abertos' },
  { btu: 60000, area: 'Até 80 m²', application: 'Ambientes comerciais maiores' },
];

export function estimateBtu(area: number, people: number, electronics: number, afternoonSun: boolean) {
  const areaFactor = afternoonSun ? 800 : 750;
  return area * areaFactor + Math.max(0, people - 1) * 600 + electronics * 600;
}

export function recommendCapacity(load: number) {
  return capacityGuide.find(({ btu }) => btu >= load) ?? null;
}

export function recommendByArea(area: number) {
  const limits = [10, 15, 20, 30, 36, 45, 60, 70, 80];
  const index = limits.findIndex(limit => area <= limit);
  return index < 0 ? null : capacityGuide[index];
}
