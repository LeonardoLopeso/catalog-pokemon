import { PokemonCard } from './pokemon.interface';

/**
 * Interface para representar uma carta no deck
 */
export interface DeckCard {
  card: PokemonCard;
  quantity: number;
  addedAt: string;
}

/**
 * Interface para o deck do usuário
 */
export interface UserDeck {
  cards: DeckCard[];
  totalCards: number;
  lastUpdated: string;
}

/**
 * Interface para estatísticas do deck
 */
export interface DeckStats {
  totalCards: number;
  uniqueCards: number;
  byRarity: Record<string, number>;
  byType: Record<string, number>;
  bySet: Record<string, number>;
}

/**
 * Interface para operações do deck
 */
export interface DeckOperations {
  addCard: (_card: PokemonCard) => void;
  removeCard: (_cardId: string) => void;
  updateQuantity: (_cardId: string, _quantity: number) => void;
  clearDeck: () => void;
  getCardQuantity: (_cardId: string) => number;
  getDeckStats: () => DeckStats;
}
