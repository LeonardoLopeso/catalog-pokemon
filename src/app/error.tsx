'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        {/* Error Icon */}
        <div 
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-fade-in" 
          style={{ animationDelay: '0.2s' }}
        >
          <AlertTriangle className="w-16 h-16 text-white" />
        </div>

        {/* Error Message */}
        <div 
          className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in" 
          style={{ animationDelay: '0.3s' }}
        >
          Ops! Algo deu errado
        </div>

        <div 
          className="text-gray-600 mb-8 animate-fade-in" 
          style={{ animationDelay: '0.4s' }}
        >
          Ocorreu um erro inesperado. Tente novamente ou volte à página inicial.
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div 
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left animate-fade-in" 
            style={{ animationDelay: '0.5s' }}
          >
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Detalhes do erro:
            </h3>
            <pre className="text-xs text-red-700 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" 
          style={{ animationDelay: '0.6s' }}
        >
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-pokemon-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Tentar novamente
          </button>

          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Página inicial
          </a>
        </div>

        {/* Additional Help */}
        <div 
          className="mt-8 text-sm text-gray-500 animate-fade-in" 
          style={{ animationDelay: '0.7s' }}
        >
          <p>
            Se o problema persistir, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
}