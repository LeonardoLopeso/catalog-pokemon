import { z } from 'zod';

/**
 * Schema Zod para validação de cartas Pokémon
 */
export const PokemonCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.object({
    small: z.string().url(),
    large: z.string().url(),
  }),
  rarity: z.string(),
  types: z.array(z.string()).optional(),
  supertype: z.string(),
  subtypes: z.array(z.string()).optional(),
  set: z.object({
    id: z.string(),
    name: z.string(),
    series: z.string(),
    printedTotal: z.number(),
    total: z.number(),
    legalities: z.object({
      unlimited: z.string(),
      standard: z.string().optional(),
      expanded: z.string().optional(),
    }),
    ptcgoCode: z.string().optional(),
    releaseDate: z.string(),
    updatedAt: z.string(),
    images: z.object({
      symbol: z.string().url(),
      logo: z.string().url(),
    }),
  }),
  number: z.string(),
  artist: z.string().optional(),
  nationalPokedexNumbers: z.array(z.number()).optional(),
  legalities: z.object({
    unlimited: z.string(),
    standard: z.string().optional(),
    expanded: z.string().optional(),
  }),
  tcgplayer: z.object({
    url: z.string().url(),
    updatedAt: z.string(),
    prices: z.object({
      holofoil: z.object({
        low: z.number(),
        mid: z.number(),
        high: z.number(),
        market: z.number(),
        directLow: z.number(),
      }).optional(),
      normal: z.object({
        low: z.number(),
        mid: z.number(),
        high: z.number(),
        market: z.number(),
        directLow: z.number(),
      }).optional(),
      reverseHolofoil: z.object({
        low: z.number(),
        mid: z.number(),
        high: z.number(),
        market: z.number(),
        directLow: z.number(),
      }).optional(),
    }),
  }).optional(),
  cardmarket: z.object({
    url: z.string().url(),
    updatedAt: z.string(),
    prices: z.object({
      averageSellPrice: z.number(),
      lowPrice: z.number(),
      trendPrice: z.number(),
      germanProLow: z.number(),
      suggestedPrice: z.number(),
      reverseHoloSell: z.number(),
      reverseHoloLow: z.number(),
      reverseHoloTrend: z.number(),
      lowPriceExPlus: z.number(),
      avg1: z.number(),
      avg7: z.number(),
      avg30: z.number(),
      reverseHoloAvg1: z.number(),
      reverseHoloAvg7: z.number(),
      reverseHoloAvg30: z.number(),
    }),
  }).optional(),
});

/**
 * Schema para resposta da API
 */
export const PokemonApiResponseSchema = z.object({
  data: z.array(PokemonCardSchema),
  page: z.number(),
  pageSize: z.number(),
  count: z.number(),
  totalCount: z.number(),
});

/**
 * Schema para parâmetros de busca
 */
export const SearchParamsSchema = z.object({
  query: z.string().optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(250).default(20),
  orderBy: z.string().optional(),
});

/**
 * Schema para filtros de busca
 */
export const SearchFiltersSchema = z.object({
  name: z.string().optional(),
  rarity: z.string().optional(),
  type: z.string().optional(),
  set: z.string().optional(),
  supertype: z.string().optional(),
});

/**
 * Tipos inferidos dos schemas
 */
export type PokemonCard = z.infer<typeof PokemonCardSchema>;
export type PokemonApiResponse = z.infer<typeof PokemonApiResponseSchema>;
export type SearchParams = z.infer<typeof SearchParamsSchema>;
export type SearchFilters = z.infer<typeof SearchFiltersSchema>;
