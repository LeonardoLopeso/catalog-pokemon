import { PokemonApiResponse, PokemonCard, SearchParams } from '@/types';

const API_BASE_URL = 'https://api.pokemontcg.io/v2';

/**
 * Classe para gerenciar chamadas à API do Pokemon TCG
 */
export class PokemonTCGApi {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Busca cartas Pokémon por nome
   */
  async searchCards(params: SearchParams): Promise<PokemonApiResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.query) {
      searchParams.append('q', `name:${params.query}`);
    }
    
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }
    
    if (params.pageSize) {
      searchParams.append('pageSize', params.pageSize.toString());
    }
    
    if (params.orderBy) {
      searchParams.append('orderBy', params.orderBy);
    }

    const url = `${this.baseUrl}/cards?${searchParams.toString()}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      throw new Error('Falha ao conectar com a API do Pokemon TCG');
    }
  }

  /**
   * Busca uma carta específica por ID
   */
  async getCardById(id: string): Promise<PokemonCard> {
    try {
      const response = await fetch(`${this.baseUrl}/cards/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao buscar carta:', error);
      throw new Error('Falha ao buscar a carta');
    }
  }

  /**
   * Busca cartas com filtros avançados
   */
  async searchCardsWithFilters(filters: {
    name?: string;
    rarity?: string;
    type?: string;
    set?: string;
    supertype?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PokemonApiResponse> {
    const searchParams = new URLSearchParams();
    
    if (filters.name) {
      searchParams.append('q', `name:${filters.name}`);
    }
    
    if (filters.rarity) {
      searchParams.append('q', `${searchParams.get('q') || ''} rarity:${filters.rarity}`);
    }
    
    if (filters.type) {
      searchParams.append('q', `${searchParams.get('q') || ''} types:${filters.type}`);
    }
    
    if (filters.set) {
      searchParams.append('q', `${searchParams.get('q') || ''} set.name:${filters.set}`);
    }
    
    if (filters.supertype) {
      searchParams.append('q', `${searchParams.get('q') || ''} supertype:${filters.supertype}`);
    }
    
    if (filters.page) {
      searchParams.append('page', filters.page.toString());
    }
    
    if (filters.pageSize) {
      searchParams.append('pageSize', filters.pageSize.toString());
    }

    const url = `${this.baseUrl}/cards?${searchParams.toString()}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar cartas com filtros:', error);
      throw new Error('Falha ao conectar com a API do Pokemon TCG');
    }
  }
}

// Instância singleton da API
export const pokemonTCGApi = new PokemonTCGApi();
