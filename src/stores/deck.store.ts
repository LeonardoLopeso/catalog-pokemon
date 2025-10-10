import { DeckCard, DeckStats, PokemonCard, UserDeck } from '@/types';
import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

interface DeckStore {
  deck: UserDeck;
  isModalOpen: boolean;
  
  // Actions
  addCard: (_card: PokemonCard) => void;
  removeCard: (_cardId: string) => void;
  updateQuantity: (_cardId: string, _quantity: number) => void;
  clearDeck: () => void;
  toggleModal: () => void;
  openModal: () => void;
  closeModal: () => void;
  
  // Getters
  getCardQuantity: (_cardId: string) => number;
  getDeckStats: () => DeckStats;
  getTotalCards: () => number;
  getUniqueCards: () => number;
}

const initialDeck: UserDeck = {
  cards: [],
  totalCards: 0,
  lastUpdated: new Date().toISOString(),
};

export const useDeckStore = create<DeckStore>()((set, get) => ({
      deck: initialDeck,
      isModalOpen: false,

      addCard: (card: PokemonCard) => {
        set((state) => {
          const existingCardIndex = state.deck.cards.findIndex(
            (deckCard) => deckCard.card.id === card.id
          );

          let newCards: DeckCard[];

          if (existingCardIndex >= 0) {
            // Card already exists, increment quantity
            newCards = state.deck.cards.map((deckCard, index) =>
              index === existingCardIndex
                ? {
                    ...deckCard,
                    quantity: Math.min(deckCard.quantity + 1, 99),
                  }
                : deckCard
            );
          } else {
            // New card, add to deck
            const newDeckCard: DeckCard = {
              card,
              quantity: 1,
              addedAt: new Date().toISOString(),
            };
            newCards = [...state.deck.cards, newDeckCard];
          }

          const totalCards = newCards.reduce(
            (sum, deckCard) => sum + deckCard.quantity,
            0
          );

          return {
            deck: {
              cards: newCards,
              totalCards,
              lastUpdated: new Date().toISOString(),
            },
          };
        });
      },

      removeCard: (cardId: string) => {
        set((state) => {
          const newCards = state.deck.cards.filter(
            (deckCard) => deckCard.card.id !== cardId
          );

          const totalCards = newCards.reduce(
            (sum, deckCard) => sum + deckCard.quantity,
            0
          );

          return {
            deck: {
              cards: newCards,
              totalCards,
              lastUpdated: new Date().toISOString(),
            },
          };
        });
      },

      updateQuantity: (cardId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeCard(cardId);
          return;
        }

        set((state) => {
          const newCards = state.deck.cards.map((deckCard) =>
            deckCard.card.id === cardId
              ? { ...deckCard, quantity: Math.min(quantity, 99) }
              : deckCard
          );

          const totalCards = newCards.reduce(
            (sum, deckCard) => sum + deckCard.quantity,
            0
          );

          return {
            deck: {
              cards: newCards,
              totalCards,
              lastUpdated: new Date().toISOString(),
            },
          };
        });
      },

      clearDeck: () => {
        set({
          deck: {
            cards: [],
            totalCards: 0,
            lastUpdated: new Date().toISOString(),
          },
        });
      },

      toggleModal: () => {
        set((state) => ({ isModalOpen: !state.isModalOpen }));
      },

      openModal: () => {
        set({ isModalOpen: true });
      },

      closeModal: () => {
        set({ isModalOpen: false });
      },

      getCardQuantity: (cardId: string) => {
        const deckCard = get().deck.cards.find(
          (deckCard) => deckCard.card.id === cardId
        );
        return deckCard?.quantity || 0;
      },

      getDeckStats: (): DeckStats => {
        const { deck } = get();
        const byRarity: Record<string, number> = {};
        const byType: Record<string, number> = {};
        const bySet: Record<string, number> = {};

        deck.cards.forEach((deckCard) => {
          const { card, quantity } = deckCard;
          
          // Count by rarity
          byRarity[card.rarity] = (byRarity[card.rarity] || 0) + quantity;
          
          // Count by type
          card.types?.forEach((type: string) => {
            byType[type] = (byType[type] || 0) + quantity;
          });
          
          // Count by set
          bySet[card.set.name] = (bySet[card.set.name] || 0) + quantity;
        });

        return {
          totalCards: deck.totalCards,
          uniqueCards: deck.cards.length,
          byRarity,
          byType,
          bySet,
        };
      },

      getTotalCards: () => {
        return get().deck.totalCards;
      },

      getUniqueCards: () => {
        return get().deck.cards.length;
      },
    })
);
