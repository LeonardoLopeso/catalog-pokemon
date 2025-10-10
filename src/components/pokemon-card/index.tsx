'use client';

import { PokemonCard as PokemonCardType } from '@/types';
import { Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface PokemonCardProps {
  card: PokemonCardType;
  onAddToDeck?: (card: PokemonCardType) => void;
  onAddToList?: (card: PokemonCardType) => void;
  isInDeck?: boolean;
  isInList?: boolean;
  deckQuantity?: number;
  showAddButton?: boolean;
  showAddToListButton?: boolean;
}

export function PokemonCard({
  card,
  onAddToDeck,
  onAddToList,
  isInDeck = false,
  isInList = false,
  deckQuantity = 0,
  showAddButton = true,
  showAddToListButton = true,
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

        {/* Overlay com botões de adicionar */}
        {(showAddButton || showAddToListButton) && (
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-2">
              {showAddButton && (
                <button
                  onClick={handleAddToDeck}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {isInDeck ? `Adicionar (${deckQuantity})` : 'Adicionar ao Deck'}
                  </span>
                </button>
              )}
              
              {showAddToListButton && (
                <button
                  onClick={handleAddToList}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    isInList 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>
                    {isInList ? 'Na Lista' : 'Adicionar à Lista'}
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
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {card.name}
          </h3>
          <div className="flex-shrink-0 ml-2">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                card.rarity
              )}`}
            >
              {card.rarity}
            </span>
          </div>
        </div>

        {/* Types */}
        {card.types && card.types.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.types.slice(0, 2).map((type, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(
                  type
                )}`}
              >
                {type}
              </span>
            ))}
            {card.types.length > 2 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-200">
                +{card.types.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Set Info */}
        <div className="text-xs text-gray-600">
          <p className="font-medium">{card.set.name}</p>
          <p className="text-gray-500">{card.set.series}</p>
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