import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ListCard {
  card: any;
  addedAt: string;
  notes?: string;
}

interface ListState {
  cards: ListCard[];
  totalCards: number;
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

interface ListActions {
  addCard: (card: any, notes?: string) => void;
  removeCard: (cardId: string) => void;
  updateCardNotes: (cardId: string, notes: string) => void;
  clearList: () => void;
  getListStats: () => {
    totalCards: number;
    uniqueCards: number;
    byRarity: Record<string, number>;
    byType: Record<string, number>;
  };
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState: ListState = {
  cards: [],
  totalCards: 0,
  lastUpdated: new Date().toISOString(),
  isLoading: false,
  error: null,
};

export const useListStore = create<ListState & ListActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      addCard: (card: any, notes?: string) => {
        const { cards } = get();
        const existingCardIndex = cards.findIndex(
          (listCard) => listCard.card.id === card.id
        );

        if (existingCardIndex >= 0) {
          // Atualizar carta existente
          const updatedCards = [...cards];
          updatedCards[existingCardIndex] = {
            ...updatedCards[existingCardIndex],
            notes: notes || updatedCards[existingCardIndex].notes,
            addedAt: new Date().toISOString(),
          };
          set({
            cards: updatedCards,
            lastUpdated: new Date().toISOString(),
          });
        } else {
          // Adicionar nova carta
          const newCard: ListCard = {
            card,
            addedAt: new Date().toISOString(),
            notes,
          };
          set({
            cards: [...cards, newCard],
            totalCards: cards.length + 1,
            lastUpdated: new Date().toISOString(),
          });
        }
      },

      removeCard: (cardId: string) => {
        const { cards } = get();
        const updatedCards = cards.filter(
          (listCard) => listCard.card.id !== cardId
        );
        set({
          cards: updatedCards,
          totalCards: updatedCards.length,
          lastUpdated: new Date().toISOString(),
        });
      },

      updateCardNotes: (cardId: string, notes: string) => {
        const { cards } = get();
        const updatedCards = cards.map((listCard) =>
          listCard.card.id === cardId
            ? { ...listCard, notes }
            : listCard
        );
        set({
          cards: updatedCards,
          lastUpdated: new Date().toISOString(),
        });
      },

      clearList: () => {
        set({
          cards: [],
          totalCards: 0,
          lastUpdated: new Date().toISOString(),
        });
      },

      getListStats: () => {
        const { cards } = get();
        const stats = {
          totalCards: cards.length,
          uniqueCards: cards.length,
          byRarity: {} as Record<string, number>,
          byType: {} as Record<string, number>,
        };

        cards.forEach((listCard) => {
          const card = listCard.card;
          
          // Contar por raridade
          if (card.rarity) {
            stats.byRarity[card.rarity] = (stats.byRarity[card.rarity] || 0) + 1;
          }

          // Contar por tipo
          if (card.types && card.types.length > 0) {
            card.types.forEach((type: string) => {
              stats.byType[type] = (stats.byType[type] || 0) + 1;
            });
          }
        });

        return stats;
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'pokemon-list-storage',
      version: 1,
    }
  )
);
