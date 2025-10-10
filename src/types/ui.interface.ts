import { PokemonCard } from './pokemon.interface';

/**
 * Interface para estado de loading
 */
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

/**
 * Interface para estado de busca
 */
export interface SearchState {
  query: string;
  isSearching: boolean;
  results: PokemonCard[];
  hasMore: boolean;
  currentPage: number;
}

/**
 * Interface para estado do modal
 */
export interface ModalState {
  isOpen: boolean;
  type?: 'deck' | 'card-detail' | 'settings';
  data?: any;
}

/**
 * Interface para configurações da aplicação
 */
export interface AppSettings {
  theme: 'light' | 'dark';
  cardsPerPage: number;
  enableAnimations: boolean;
  enableSounds: boolean;
}

/**
 * Interface para notificações
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  isVisible: boolean;
}
