'use client';

import { PokemonCard } from '@/components/pokemon-card';
import { formatNumber } from '@/lib/utils';
import { useDeckStore } from '@/stores';
import { Download, Share2, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';

export function DeckModal() {
  const { deck, clearDeck, getDeckStats, isModalOpen, closeModal } = useDeckStore();
  const stats = getDeckStats();

  // Bloquear scroll do body quando modal estiver aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quando componente desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleClearDeck = () => {
    if (confirm('Tem certeza que deseja limpar todo o deck?')) {
      clearDeck();
    }
  };

  const handleExportDeck = () => {
    const deckData = {
      cards: deck.cards,
      totalCards: deck.totalCards,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(deckData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemon-deck-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareDeck = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Deck Pokémon',
          text: `Deck com ${deck.totalCards} cartas`,
          url: window.location.href,
        });
      } catch (error) {
        // console.error('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(
        `Meu Deck Pokémon - ${deck.totalCards} cartas\n\n${deck.cards
          .map(card => `${card.quantity}x ${card.card.name}`)
          .join('\n')}`
      );
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          />

          {/* Modal */}
          <div
            className="fixed inset-2 sm:inset-4 z-50 bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-pokemon-blue to-pokemon-purple text-white">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold truncate">Meu Deck</h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  {formatNumber(deck.totalCards)} cartas • {formatNumber(deck.cards.length)} únicas
                </p>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <button
                  onClick={handleShareDeck}
                  className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Compartilhar deck"
                >
                  <Share2 size={16} className="sm:w-5 sm:h-5" />
                </button>
                
                <button
                  onClick={handleExportDeck}
                  className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Exportar deck"
                >
                  <Download size={16} className="sm:w-5 sm:h-5" />
                </button>
                
                <button
                  onClick={closeModal}
                  className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Fechar"
                >
                  <X size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              {deck.cards.length === 0 ? (
                /* Empty state */
                <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                  <div
                    className="text-center animate-fade-in"
                  >
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Trash2 className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      Deck vazio
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                      Adicione cartas ao seu deck para começar a montar sua coleção.
                    </p>
                    <button
                      onClick={closeModal}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-pokemon-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors text-sm sm:text-base"
                    >
                      Explorar cartas
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Stats */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-bold text-pokemon-blue">
                          {formatNumber(stats.totalCards)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-bold text-pokemon-green">
                          {formatNumber(stats.uniqueCards)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Únicas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-bold text-pokemon-purple">
                          {Object.keys(stats.byRarity).length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Raridades</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-bold text-pokemon-yellow">
                          {Object.keys(stats.byType).length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Tipos</div>
                      </div>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                      {deck.cards.map((deckCard) => (
                        <div
                          key={deckCard.card.id}
                          className="animate-fade-in"
                          style={{ animationDelay: '0.1s' }}
                        >
                          <PokemonCard
                            card={deckCard.card}
                            isInDeck={true}
                            deckQuantity={deckCard.quantity}
                            showAddButton={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                      <button
                        onClick={handleClearDeck}
                        className="px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2 text-sm"
                      >
                        <Trash2 size={16} />
                        <span>Limpar deck</span>
                      </button>
                      
                      <div className="text-xs sm:text-sm text-gray-600">
                        Última atualização: {new Date(deck.lastUpdated).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
