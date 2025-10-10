import { PokemonApiResponseSchema } from '@/schemas';
import { PokemonApiResponse, SearchFilters, SearchParams } from '@/types';

const API_BASE_URL = 'https://api.pokemontcg.io/v2';

/**
 * Constrói query string para a API
 * @param params - Parâmetros de busca
 * @returns Query string formatada
 */
function buildQueryString(params: SearchParams & SearchFilters): string {
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

  if (params.rarity) {
    searchParams.append('rarity', params.rarity);
  }

  if (params.type) {
    searchParams.append('type', params.type);
  }

  if (params.set) {
    searchParams.append('set', params.set);
  }

  if (params.supertype) {
    searchParams.append('supertype', params.supertype);
  }

  return searchParams.toString();
}

/**
 * Busca cartas na API Pokémon TCG
 * @param params - Parâmetros de busca
 * @returns Promise com resposta da API
 */
export async function searchCards(
  params: SearchParams & SearchFilters = {}
): Promise<PokemonApiResponse> {
  try {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/cards?${queryString}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validar dados com Zod
    const validatedData = PokemonApiResponseSchema.parse(data);
    
    return validatedData;
  } catch (error) {
    // console.error('Erro ao buscar cartas:', error);
    throw new Error('Falha ao carregar cartas. Tente novamente.');
  }
}

/**
 * Busca uma carta específica por ID
 * @param cardId - ID da carta
 * @returns Promise com dados da carta
 */
export async function getCardById(cardId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    // console.error('Erro ao buscar carta:', error);
    throw new Error('Falha ao carregar carta. Tente novamente.');
  }
}

/**
 * Busca sets disponíveis
 * @returns Promise com lista de sets
 */
export async function getSets() {
  try {
    const response = await fetch(`${API_BASE_URL}/sets`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    // console.error('Erro ao buscar sets:', error);
    throw new Error('Falha ao carregar sets. Tente novamente.');
  }
}

/**
 * Busca tipos disponíveis
 * @returns Promise com lista de tipos
 */
export async function getTypes() {
  try {
    const response = await fetch(`${API_BASE_URL}/types`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    // console.error('Erro ao buscar tipos:', error);
    throw new Error('Falha ao carregar tipos. Tente novamente.');
  }
}

/**
 * Busca raridades disponíveis
 * @returns Promise com lista de raridades
 */
export async function getRarities() {
  try {
    const response = await fetch(`${API_BASE_URL}/rarities`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    // console.error('Erro ao buscar raridades:', error);
    throw new Error('Falha ao carregar raridades. Tente novamente.');
  }
}
