'use client';

import { DeckModal, PokemonCard, SearchBar } from '@/components';
import { QueryProvider } from '@/components/providers/query-provider';
import { usePokemonSearch } from '@/hooks';
import { useDeckStore, useListStore } from '@/stores';
import { Flame, Shield, Sparkles, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

function PokemonSearchContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { addCard, getTotalCards, toggleModal } = useDeckStore();
  const { addCard: addToList, cards: listCards } = useListStore();
  
  const {
    cards,
    isLoading,
    isError,
    error,
    hasMore,
    search,
    loadMore,
  } = usePokemonSearch({
    query: searchQuery,
    pageSize: 20,
    enabled: isClient && searchQuery.length > 0,
  });

  const deckCount = getTotalCards();

  // Garantir que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debug logs (temporário - remover em produção)
  useEffect(() => {
    console.log('🔍 Debug - isClient:', isClient);
    console.log('🔍 Debug - searchQuery:', searchQuery);
    console.log('🔍 Debug - cards:', cards);
    console.log('🔍 Debug - cards.length:', cards.length);
    console.log('🔍 Debug - isLoading:', isLoading);
    console.log('🔍 Debug - isError:', isError);
    console.log('🔍 Debug - error:', error);
  }, [isClient, searchQuery, cards, isLoading, isError, error]);

  const handleSearch = useCallback((query: string) => {
    console.log('🔍 handleSearch called with:', query);
    setSearchQuery(query);
    // Não fazer busca automática, apenas atualizar o estado
  }, []);

  const handleSearchClick = useCallback(() => {
    console.log('🔍 handleSearchClick called with query:', searchQuery);
    if (searchQuery.trim().length > 0) {
      console.log('🔍 handleSearchClick: Valid query, calling search');
      search(searchQuery);
    } else {
      console.log('🔍 handleSearchClick: Empty query, not calling search');
    }
  }, [searchQuery, search]);

  const handleAddToDeck = useCallback((card: any) => {
    addCard(card);
  }, [addCard]);

  const handleAddToList = useCallback((card: any) => {
    addToList(card);
  }, [addToList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 pokemon-gradient rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient font-orbitron">
                  Catálogo Pokémon TCG
                </h1>
                <p className="text-sm text-gray-600">
                  Explore e monte seu deck
                </p>
              </div>
            </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {/* List Button */}
                      <Link
                        href="/minha-lista"
                        className="relative px-4 py-2 bg-pokemon-purple text-white rounded-xl font-medium hover:bg-purple-600 transition-colors flex items-center space-x-2"
                      >
                        <Star className="w-5 h-5" />
                        <span>Minha Lista</span>
                        {listCards.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                            {listCards.length}
                          </span>
                        )}
                      </Link>

                      {/* Deck Button */}
                      <button
                        onClick={toggleModal}
                        className="relative px-4 py-2 bg-pokemon-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <Shield className="w-5 h-5" />
                        <span>Meu Deck</span>
                        {deckCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                            {deckCount}
                          </span>
                        )}
                      </button>
                    </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <div className="max-w-2xl mx-auto">
                    <SearchBar
                      onSearch={handleSearch}
                      onSearchClick={handleSearchClick}
                      placeholder="Buscar cartas Pokémon..."
                      showSearchButton={true}
                    />
          </div>
        </section>

        {/* Cards Grid */}
        <section className="mb-8">
          {!isClient ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Inicializando...</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando cartas...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Erro ao carregar cartas
                </h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : (
            <>
              {cards.length === 0 ? (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Flame className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nenhuma carta encontrada
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tente buscar por um nome diferente ou explore as cartas disponíveis.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {cards.map((card, index) => (
                      <div
                        key={card.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                                <PokemonCard
                                  card={card}
                                  onAddToDeck={handleAddToDeck}
                                  onAddToList={handleAddToList}
                                  isInList={listCards.some(listCard => listCard.card.id === card.id)}
                                  showAddButton={true}
                                  showAddToListButton={true}
                                />
                      </div>
                    ))}
                  </div>

                  {/* Load More Trigger */}
                  {hasMore && (
                    <div className="flex justify-center py-8">
                      {isLoading ? (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-pokemon-blue rounded-full animate-spin" />
                          <span>Carregando mais cartas...</span>
                        </div>
                      ) : (
                        <button
                          onClick={loadMore}
                          className="px-6 py-3 pokemon-gradient text-white rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                          Carregar mais cartas
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </main>

      {/* Deck Modal */}
      <DeckModal />
      </div>
  );
}

export default function HomePage() {
  return (
    <QueryProvider>
      <PokemonSearchContent />
    </QueryProvider>
  );
}