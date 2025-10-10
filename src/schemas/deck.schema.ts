import { z } from 'zod';
import { PokemonCardSchema } from './pokemon.schema';

/**
 * Schema para carta no deck
 */
export const DeckCardSchema = z.object({
  card: PokemonCardSchema,
  quantity: z.number().min(1).max(99),
  addedAt: z.string(),
});

/**
 * Schema para o deck do usuário
 */
export const UserDeckSchema = z.object({
  cards: z.array(DeckCardSchema),
  totalCards: z.number().min(0),
  lastUpdated: z.string(),
});

/**
 * Schema para estatísticas do deck
 */
export const DeckStatsSchema = z.object({
  totalCards: z.number().min(0),
  uniqueCards: z.number().min(0),
  byRarity: z.record(z.string(), z.number().min(0)),
  byType: z.record(z.string(), z.number().min(0)),
  bySet: z.record(z.string(), z.number().min(0)),
});

/**
 * Tipos inferidos dos schemas
 */
export type DeckCard = z.infer<typeof DeckCardSchema>;
export type UserDeck = z.infer<typeof UserDeckSchema>;
export type DeckStats = z.infer<typeof DeckStatsSchema>;
