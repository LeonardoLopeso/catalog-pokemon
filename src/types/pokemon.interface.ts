/**
 * Interface para representar uma carta Pokémon TCG
 */
export interface PokemonCard {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  rarity: string;
  types?: string[];
  supertype: string;
  subtypes?: string[];
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited: string;
      standard?: string;
      expanded?: string;
    };
    ptcgoCode?: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
  number: string;
  artist?: string;
  nationalPokedexNumbers?: number[];
  legalities: {
    unlimited: string;
    standard?: string;
    expanded?: string;
  };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices: {
      holofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
      normal?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
      reverseHolofoil?: {
        low: number;
        mid: number;
        high: number;
        market: number;
        directLow: number;
      };
    };
  };
  cardmarket?: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      germanProLow: number;
      suggestedPrice: number;
      reverseHoloSell: number;
      reverseHoloLow: number;
      reverseHoloTrend: number;
      lowPriceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    };
  };
}

/**
 * Interface para a resposta da API Pokémon TCG
 */
export interface PokemonApiResponse {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

/**
 * Interface para parâmetros de busca
 */
export interface SearchParams {
  query?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

/**
 * Interface para filtros de busca
 */
export interface SearchFilters {
  name?: string;
  rarity?: string;
  type?: string;
  set?: string;
  supertype?: string;
}
