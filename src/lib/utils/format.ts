/**
 * Formata uma string para capitalizar a primeira letra de cada palavra
 * @param str - String a ser formatada
 * @returns String formatada
 */
export function capitalize(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formata o nome de uma carta Pokémon
 * @param name - Nome da carta
 * @returns Nome formatado
 */
export function formatCardName(name: string): string {
  return capitalize(name);
}

/**
 * Formata a raridade de uma carta
 * @param rarity - Raridade da carta
 * @returns Raridade formatada
 */
export function formatRarity(rarity: string): string {
  return capitalize(rarity);
}

/**
 * Formata o tipo de uma carta
 * @param type - Tipo da carta
 * @returns Tipo formatado
 */
export function formatType(type: string): string {
  return capitalize(type);
}

/**
 * Formata o nome do set
 * @param setName - Nome do set
 * @returns Nome do set formatado
 */
export function formatSetName(setName: string): string {
  return capitalize(setName);
}

/**
 * Formata um número para exibição com separadores de milhares
 * @param num - Número a ser formatado
 * @returns Número formatado
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num);
}

/**
 * Formata um preço para exibição em reais
 * @param price - Preço a ser formatado
 * @returns Preço formatado
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * Trunca uma string para um tamanho específico
 * @param str - String a ser truncada
 * @param length - Tamanho máximo
 * @returns String truncada
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Gera uma cor baseada na raridade da carta
 * @param rarity - Raridade da carta
 * @returns Classe CSS para cor
 */
export function getRarityColor(rarity: string): string {
  const rarityColors: Record<string, string> = {
    'common': 'text-gray-600',
    'uncommon': 'text-green-600',
    'rare': 'text-blue-600',
    'rare holo': 'text-purple-600',
    'rare holo ex': 'text-pink-600',
    'rare holo gx': 'text-red-600',
    'rare holo v': 'text-indigo-600',
    'rare holo vmax': 'text-yellow-600',
    'rare holo vstar': 'text-orange-600',
    'rare ultra': 'text-amber-600',
    'rare secret': 'text-rose-600',
    'rare rainbow': 'text-cyan-600',
    'rare shiny': 'text-emerald-600',
  };

  return rarityColors[rarity.toLowerCase()] || 'text-gray-600';
}

/**
 * Gera uma cor baseada no tipo da carta
 * @param type - Tipo da carta
 * @returns Classe CSS para cor
 */
export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    'grass': 'text-green-600 bg-green-100',
    'fire': 'text-red-600 bg-red-100',
    'water': 'text-blue-600 bg-blue-100',
    'lightning': 'text-yellow-600 bg-yellow-100',
    'psychic': 'text-purple-600 bg-purple-100',
    'fighting': 'text-orange-600 bg-orange-100',
    'darkness': 'text-gray-800 bg-gray-100',
    'metal': 'text-gray-600 bg-gray-100',
    'fairy': 'text-pink-600 bg-pink-100',
    'dragon': 'text-indigo-600 bg-indigo-100',
    'colorless': 'text-gray-600 bg-gray-100',
  };

  return typeColors[type.toLowerCase()] || 'text-gray-600 bg-gray-100';
}
