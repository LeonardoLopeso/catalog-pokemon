'use client';

import { CardFullscreenModal, PokemonCard } from '@/components';
import { formatNumber } from '@/lib/utils';
import { useDeckStore, useListStore } from '@/stores';
import { PokemonCard as PokemonCardType } from '@/types';
import { ArrowLeft, Download, Share2, Star, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function MinhaListaPage() {
  const { cards, clearList, getListStats, removeCard, addCard } = useListStore();
  const { addCard: addToDeck } = useDeckStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [fullscreenCard, setFullscreenCard] = useState<PokemonCardType | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stats = getListStats();

  const handleRemoveFromList = (cardId: string) => {
    if (confirm('Tem certeza que deseja remover esta carta da sua lista?')) {
      removeCard(cardId);
    }
  };

  const handleAddToDeck = (card: any) => {
    addToDeck(card);
  };

  const handleFullscreen = (card: PokemonCardType) => {
    setFullscreenCard(card);
    setIsFullscreenOpen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreenOpen(false);
    setFullscreenCard(null);
  };

  const handleExportList = () => {
    const listData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      exportedBy: 'Pokemon TCG Catalog',
      cards: cards,
      totalCards: cards.length,
      stats: stats,
    };

    const blob = new Blob([JSON.stringify(listData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemon-list-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareList = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Lista Pokémon',
          text: `Lista com ${cards.length} cartas`,
          url: window.location.href,
        });
      } catch (error) {
        // console.error('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(
        `Minha Lista Pokémon - ${cards.length} cartas\n\n${cards
          .map(listCard => listCard.card.name)
          .join('\n')}`
      );
    }
  };

  const handleClearList = () => {
    if (confirm('Tem certeza que deseja limpar toda a sua lista?')) {
      clearList();
    }
  };

  const handleImportList = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);

      // Validar formato do arquivo
      if (!importedData.cards || !Array.isArray(importedData.cards)) {
        throw new Error('Formato de arquivo inválido. O arquivo deve conter uma lista de cartas.');
      }

      // Verificar se é um arquivo do nosso sistema
      if (importedData.exportedBy !== 'Pokemon TCG Catalog') {
        if (!confirm('Este arquivo não foi exportado pelo nosso sistema. Deseja continuar mesmo assim?')) {
          return;
        }
      }

      // Perguntar se deve substituir ou adicionar
      const shouldReplace = cards.length > 0 && 
        confirm(`Você tem ${cards.length} cartas na sua lista atual. Deseja substituir pela lista importada ou adicionar as cartas?`);
      
      if (shouldReplace) {
        clearList();
      }

      // Adicionar cartas importadas
      let addedCount = 0;
      let skippedCount = 0;

      for (const listCard of importedData.cards) {
        if (listCard.card && listCard.card.id) {
          // Verificar se a carta já existe (se não for substituição)
          const exists = cards.some(existingCard => existingCard.card.id === listCard.card.id);
          
          if (!exists || shouldReplace) {
            addCard(listCard.card, listCard.notes);
            addedCount++;
          } else {
            skippedCount++;
          }
        }
      }

      // Mostrar resultado
      alert(`Importação concluída!\n\n✅ ${addedCount} cartas adicionadas${skippedCount > 0 ? `\n⏭️ ${skippedCount} cartas já existiam e foram puladas` : ''}`);

    } catch (error) {
      console.error('Erro ao importar lista:', error);
      alert(`Erro ao importar lista: ${error instanceof Error ? error.message : 'Formato de arquivo inválido'}`);
    } finally {
      setIsImporting(false);
      // Limpar o input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Filtrar cartas baseado na busca
  const filteredCards = cards.filter(listCard =>
    listCard.card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Voltar</span>
            </Link>

            {/* Title */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 pokemon-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1 text-center">
                <h1 className="text-base sm:text-xl font-bold text-gradient font-orbitron truncate">
                  Minha Lista
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {formatNumber(cards.length)} cartas salvas
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              <button
                onClick={handleImportList}
                disabled={isImporting}
                className="p-1.5 rounded-full bg-green-100 hover:bg-green-200 transition-colors disabled:opacity-50"
                title="Importar lista"
              >
                <Upload className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleExportList}
                className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                title="Exportar lista"
              >
                <Download className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleShareList}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Compartilhar lista"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        {cards.length === 0 ? (
          /* Empty state */
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Sua lista está vazia
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Adicione cartas à sua lista para começar a organizar sua coleção.
              </p>
              <Link
                href="/"
                className="px-4 sm:px-6 py-2.5 sm:py-3 pokemon-gradient text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Explorar cartas
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6 sm:mb-8">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-pokemon-purple">
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
                    <div className="text-lg sm:text-2xl font-bold text-pokemon-blue">
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
            </div>

            {/* Import/Export Instructions */}
            <div className="mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      Compartilhe sua lista com outros usuários!
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                      Use os botões de <strong>Exportar</strong> e <strong>Importar</strong> para compartilhar sua lista com outros jogadores.
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        📤 Exportar: Salva sua lista em um arquivo
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        📥 Importar: Carrega uma lista de outro usuário
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6 sm:mb-8">
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Buscar na sua lista..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pokemon-purple focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {filteredCards.map((listCard, index) => (
                <div
                  key={listCard.card.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <PokemonCard
                      card={listCard.card}
                      onAddToDeck={handleAddToDeck}
                      onFullscreen={handleFullscreen}
                      showAddButton={true}
                      showAddToListButton={false}
                      showFullscreenButton={true}
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromList(listCard.card.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                      title="Remover da lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear List Button */}
            {cards.length > 0 && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={handleClearList}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center space-x-2 mx-auto text-sm sm:text-base"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Limpar lista</span>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Card Fullscreen Modal */}
      <CardFullscreenModal
        card={fullscreenCard}
        isOpen={isFullscreenOpen}
        onClose={handleCloseFullscreen}
      />
    </div>
  );
}
