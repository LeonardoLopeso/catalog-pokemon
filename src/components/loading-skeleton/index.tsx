'use client';

// Removed framer-motion import

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ count = 6, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md border border-card-border overflow-hidden animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Skeleton da imagem */}
          <div className="aspect-[488/680] bg-gray-200 animate-pulse" />
          
          {/* Skeleton do conteúdo */}
          <div className="p-4 space-y-3">
            {/* Nome */}
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            
            {/* Raridade */}
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            
            {/* Tipos */}
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
            </div>
            
            {/* Set */}
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            
            {/* Botão */}
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className = '' }: CardSkeletonProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-card-border overflow-hidden animate-fade-in ${className}`}
    >
      {/* Skeleton da imagem */}
      <div className="aspect-[488/680] bg-gray-200 animate-pulse" />
      
      {/* Skeleton do conteúdo */}
      <div className="p-4 space-y-3">
        {/* Nome */}
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        
        {/* Raridade */}
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        
        {/* Tipos */}
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
        </div>
        
        {/* Set */}
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        
        {/* Botão */}
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

interface GridSkeletonProps {
  count?: number;
  className?: string;
}

export function GridSkeleton({ count = 8, className = '' }: GridSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}
