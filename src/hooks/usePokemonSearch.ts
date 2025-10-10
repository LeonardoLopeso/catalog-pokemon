import { pokemonTCGApi } from '@/lib/utils';
import { useSearchStore } from '@/stores';
import { SearchFilters, SearchParams } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';

interface UsePokemonSearchOptions {
  query?: string;
  filters?: SearchFilters;
  pageSize?: number;
  enabled?: boolean;
}

/**
 * Hook para busca de cartas Pokémon com React Query
 */
export function usePokemonSearch({
  query = '',
  filters = {},
  pageSize = 20,
  enabled = true,
}: UsePokemonSearchOptions = {}) {
  const { results, setResults, setLoading, setError, setHasMore, setCurrentPage } = useSearchStore();

  const searchParams: SearchParams & SearchFilters = useMemo(() => ({
    query,
    pageSize,
    ...filters,
  }), [query, pageSize, filters]);

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['pokemon-cards', searchParams],
    queryFn: () => pokemonTCGApi.searchCards(searchParams),
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  // Efeito para processar dados quando a query é bem-sucedida
  useEffect(() => {
    console.log('🎯 Hook Debug - data:', data);
    console.log('🎯 Hook Debug - enabled:', enabled);
    console.log('🎯 Hook Debug - query:', query);
    console.log('🎯 Hook Debug - results from store:', results);
    if (data) {
      console.log('🎯 Hook Debug - setting results:', data.data);
      setResults(data.data);
      setHasMore(data.data.length === pageSize);
      setCurrentPage(1);
      setError(null);
    }
  }, [data, pageSize, setResults, setHasMore, setCurrentPage, setError, enabled, query]);

  // Efeito para processar erros
  useEffect(() => {
    if (isError && error) {
      setError(error.message || 'Erro ao buscar cartas');
      setResults([]);
      setHasMore(false);
    }
  }, [isError, error, setError, setResults, setHasMore]);

  // Atualizar estado de loading
  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isLoading, isFetching, setLoading]);

  const search = useCallback(
    (_newQuery: string, _newFilters?: SearchFilters) => {
      console.log('🔍 Search called with query:', _newQuery);
      if (_newQuery.trim().length === 0) {
        console.log('🔍 Search: Empty query, not clearing results');
        // Não limpar os resultados quando a query está vazia
        // setResults([]);
        setError(null);
        setHasMore(false);
        return;
      }

      console.log('🔍 Search: Valid query, proceeding with search');
      setCurrentPage(1);
      refetch();
    },
    [refetch, setError, setHasMore, setCurrentPage]
  );

  const loadMore = useCallback(() => {
    if (!data || !data.data.length || isFetching) return;

    const nextPage = data.page + 1;
    const nextPageData = pokemonTCGApi.searchCards({
      ...searchParams,
      page: nextPage,
    });

    nextPageData.then((newData) => {
      if (newData.data.length > 0) {
        setResults([...data.data, ...newData.data]);
        setHasMore(newData.data.length === pageSize);
        setCurrentPage(nextPage);
      } else {
        setHasMore(false);
      }
    });
  }, [data, searchParams, pageSize, isFetching, setResults, setHasMore, setCurrentPage]);

  console.log('🎯 Hook Return - results:', results);
  console.log('🎯 Hook Return - results.length:', results.length);
  console.log('🎯 Hook Return - isLoading:', isLoading);
  console.log('🎯 Hook Return - isError:', isError);

  return {
    cards: results,
    isLoading,
    isError,
    error: error?.message,
    hasMore: data ? data.data.length === pageSize : false,
    totalCount: data?.totalCount || 0,
    search,
    loadMore,
    refetch,
  };
}
