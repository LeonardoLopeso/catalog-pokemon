import { PokemonCard, SearchFilters } from '@/types';
import { create } from 'zustand';

interface SearchStore {
  query: string;
  results: PokemonCard[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filters: SearchFilters;
  
  // Actions
  setQuery: (_query: string) => void;
  setResults: (_results: PokemonCard[]) => void;
  addResults: (_results: PokemonCard[]) => void;
  setLoading: (_isLoading: boolean) => void;
  setError: (_error: string | null) => void;
  setHasMore: (_hasMore: boolean) => void;
  setCurrentPage: (_page: number) => void;
  setFilters: (_filters: Partial<SearchFilters>) => void;
  clearResults: () => void;
  reset: () => void;
}

const initialFilters: SearchFilters = {
  name: '',
  rarity: '',
  type: '',
  set: '',
  supertype: '',
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  results: [],
  isLoading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  filters: initialFilters,

  setQuery: (_query: string) => {
    set({ query: _query });
  },

  setResults: (_results: PokemonCard[]) => {
    console.log('🏪 Store - setResults called with:', _results);
    console.log('🏪 Store - setResults length:', _results.length);
    set({ results: _results, currentPage: 1 });
  },

  addResults: (_results: PokemonCard[]) => {
    set((state) => ({
      results: [...state.results, ..._results],
      currentPage: state.currentPage + 1,
    }));
  },

  setLoading: (_isLoading: boolean) => {
    set({ isLoading: _isLoading });
  },

  setError: (_error: string | null) => {
    set({ error: _error });
  },

  setHasMore: (_hasMore: boolean) => {
    set({ hasMore: _hasMore });
  },

  setCurrentPage: (_currentPage: number) => {
    set({ currentPage: _currentPage });
  },

  setFilters: (_newFilters: Partial<SearchFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ..._newFilters },
    }));
  },

  clearResults: () => {
    console.log('🏪 Store - clearResults called');
    set({
      results: [],
      currentPage: 1,
      hasMore: true,
      error: null,
    });
  },

  reset: () => {
    console.log('🏪 Store - reset called');
    set({
      query: '',
      results: [],
      isLoading: false,
      error: null,
      hasMore: true,
      currentPage: 1,
      filters: initialFilters,
    });
  },
}));
