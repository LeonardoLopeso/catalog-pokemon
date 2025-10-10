import { Shield, Sparkles, Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Loading Animation */}
        <div 
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-pokemon-blue to-pokemon-purple rounded-full flex items-center justify-center animate-spin" 
          style={{ animationDuration: '2s' }}
        >
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Loading Text */}
        <div 
          className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in" 
          style={{ animationDelay: '0.2s' }}
        >
          Carregando catálogo...
        </div>

        <div 
          className="text-gray-600 mb-8 animate-fade-in" 
          style={{ animationDelay: '0.3s' }}
        >
          Preparando suas cartas favoritas
        </div>

        {/* Loading Dots */}
        <div 
          className="flex justify-center space-x-2 animate-fade-in" 
          style={{ animationDelay: '0.4s' }}
        >
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-pokemon-blue rounded-full animate-pulse"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Feature Icons */}
        <div 
          className="mt-12 flex justify-center space-x-8 text-gray-400 animate-fade-in" 
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm">Busca rápida</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Deck pessoal</span>
          </div>
        </div>
      </div>
    </div>
  );
}