import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        {/* 404 Icon */}
        <div 
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-pokemon-blue to-pokemon-purple rounded-full flex items-center justify-center animate-fade-in" 
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-4xl font-bold text-white">404</span>
        </div>

        {/* Error Message */}
        <div 
          className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in" 
          style={{ animationDelay: '0.3s' }}
        >
          Página não encontrada
        </div>

        <div 
          className="text-gray-600 mb-8 animate-fade-in" 
          style={{ animationDelay: '0.4s' }}
        >
          A página que você está procurando não existe ou foi movida.
        </div>

        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" 
          style={{ animationDelay: '0.5s' }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-pokemon-blue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao início
          </Link>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar cartas
          </Link>
        </div>

        {/* Additional Help */}
        <div 
          className="mt-8 text-sm text-gray-500 animate-fade-in" 
          style={{ animationDelay: '0.6s' }}
        >
          <p>Se você acredita que isso é um erro, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  );
}