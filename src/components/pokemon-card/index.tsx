'use client';

import { PokemonCard as PokemonCardType } from '@/types';
import { Plus, Star, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface PokemonCardProps {
  card: PokemonCardType;
  onAddToDeck?: (card: PokemonCardType) => void;
  onAddToList?: (card: PokemonCardType) => void;
  onFullscreen?: (card: PokemonCardType) => void;
  isInDeck?: boolean;
  isInList?: boolean;
  deckQuantity?: number;
  showAddButton?: boolean;
  showAddToListButton?: boolean;
  showFullscreenButton?: boolean;
}

export function PokemonCard({
  card,
  onAddToDeck,
  onAddToList,
  onFullscreen,
  isInDeck = false,
  isInList = false,
  deckQuantity = 0,
  showAddButton = true,
  showAddToListButton = true,
  showFullscreenButton = true,
}: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToDeck = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToDeck?.(card);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToList?.(card);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFullscreen?.(card);
  };

  const getRarityColor = (rarity: string) => {
    const rarityLower = rarity.toLowerCase();
    if (rarityLower.includes('rare')) return 'text-purple-600 bg-purple-100';
    if (rarityLower.includes('uncommon')) return 'text-blue-600 bg-blue-100';
    if (rarityLower.includes('common')) return 'text-green-600 bg-green-100';
    if (rarityLower.includes('holo')) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      'Fire': 'bg-red-500',
      'Water': 'bg-blue-500',
      'Grass': 'bg-green-500',
      'Electric': 'bg-yellow-500',
      'Psychic': 'bg-purple-500',
      'Fighting': 'bg-orange-500',
      'Darkness': 'bg-gray-800',
      'Metal': 'bg-gray-400',
      'Fairy': 'bg-pink-500',
      'Dragon': 'bg-indigo-500',
      'Colorless': 'bg-gray-300',
    };
    return typeColors[type] || 'bg-gray-300';
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative aspect-[488/680] bg-gray-100">
        {!imageError ? (
          <Image
            src={card.images.large}
            alt={card.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <p className="text-sm">Imagem não disponível</p>
            </div>
          </div>
        )}

        {/* Botão de tela cheia */}
        {showFullscreenButton && (
          <button
            onClick={handleFullscreen}
            className="absolute top-2 left-2 p-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-all duration-200 opacity-0 group-hover:opacity-100 z-30 shadow-lg hover:shadow-xl"
            title="Ver em tela cheia"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Overlay com botões de adicionar */}
        {(showAddButton || showAddToListButton) && (
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-1 sm:space-y-2 p-2">
              {showAddButton && (
                <button
                  onClick={handleAddToDeck}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 rounded-lg sm:rounded-xl font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">
                    {isInDeck ? `Adicionar (${deckQuantity})` : 'Adicionar ao Deck'}
                  </span>
                  <span className="sm:hidden">
                    {isInDeck ? `+${deckQuantity}` : 'Deck'}
                  </span>
                </button>
              )}
              
              {showAddToListButton && (
                <button
                  onClick={handleAddToList}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium transition-colors text-xs sm:text-sm ${
                    isInList 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">
                    {isInList ? 'Na Lista' : 'Adicionar à Lista'}
                  </span>
                  <span className="sm:hidden">
                    {isInList ? 'Lista' : 'Lista'}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Indicador de quantidade no deck */}
        {isInDeck && deckQuantity > 0 && (
          <div className="absolute top-2 right-2 bg-pokemon-blue text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {deckQuantity}
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-2 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight flex-1 min-w-0">
            <span className="truncate block">{card.name}</span>
          </h3>
          <div className="flex-shrink-0 ml-1 sm:ml-2">
            <span
              className={`inline-block px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getRarityColor(
                card.rarity
              )}`}
            >
              <span className="hidden sm:inline">{card.rarity}</span>
              <span className="sm:hidden">{card.rarity.split(' ')[0]}</span>
            </span>
          </div>
        </div>

        {/* Types */}
        {card.types && card.types.length > 0 && (
          <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-2">
            {card.types.slice(0, 2).map((type, index) => (
              <span
                key={index}
                className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-white ${getTypeColor(
                  type
                )}`}
              >
                <span className="hidden sm:inline">{type}</span>
                <span className="sm:hidden">{type.substring(0, 3)}</span>
              </span>
            ))}
            {card.types.length > 2 && (
              <span className="px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-200">
                +{card.types.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Set Info */}
        <div className="text-xs text-gray-600">
          <p className="font-medium truncate">{card.set.name}</p>
          <p className="text-gray-500 truncate">{card.set.series}</p>
        </div>

        {/* Price Info (se disponível) */}
        {/* {card.tcgplayer?.prices?.normal?.market && (
          <div className="mt-2 text-xs text-green-600 font-medium">
            ${card.tcgplayer.prices.normal.market.toFixed(2)}
          </div>
        )} */}
      </div>
    </div>
  );
}