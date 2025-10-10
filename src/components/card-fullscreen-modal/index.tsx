'use client';

import { PokemonCard as PokemonCardType } from '@/types';
import { Download, Share2, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CardFullscreenModalProps {
  card: PokemonCardType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CardFullscreenModal({ card, isOpen, onClose }: CardFullscreenModalProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Bloquear scroll do body quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quando componente desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownloadImage = async () => {
    if (!card) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(card.images.large);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${card.name.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareCard = async () => {
    if (!card) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: card.name,
          text: `Confira esta carta Pokémon: ${card.name}`,
          url: window.location.href,
        });
      } catch (error) {
        // Usuário cancelou ou erro no compartilhamento
      }
    } else {
      // Fallback para copiar link
      try {
        await navigator.clipboard.writeText(
          `Confira esta carta Pokémon: ${card.name} - ${card.images.large}`
        );
        // Aqui você poderia mostrar uma notificação de sucesso
      } catch (error) {
        console.error('Erro ao copiar para clipboard:', error);
      }
    }
  };


  if (!card || !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fade-in"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
        <div className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-pokemon-blue to-pokemon-purple text-white">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold truncate">{card.name}</h2>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleDownloadImage}
                disabled={isLoading}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
                title="Baixar imagem"
              >
                <Download size={18} />
              </button>
              
              <button
                onClick={handleShareCard}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                title="Compartilhar carta"
              >
                <Share2 size={18} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                title="Fechar"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Content - Only Image */}
          <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-0">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative aspect-[488/680] bg-white rounded-xl shadow-lg overflow-hidden">
                {!imageError ? (
                  <Image
                    src={card.images.large}
                    alt={card.name}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <div className="text-center text-gray-500">
                      <ZoomIn className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm">Imagem não disponível</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
