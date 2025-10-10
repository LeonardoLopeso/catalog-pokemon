'use client';

import { useSearchHistory } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/lib/utils/debounce';
import { Filter, History, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
// Removed framer-motion import

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSearchClick?: () => void;
  placeholder?: string;
  className?: string;
  showHistory?: boolean;
  showFilters?: boolean;
  showSearchButton?: boolean;
}

export function SearchBar({
  onSearch,
  onSearchClick,
  placeholder = 'Buscar cartas Pokémon...',
  className = '',
  showHistory = true,
  showFilters = false,
  showSearchButton = true,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, _setIsFocused] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { history, addToHistory, removeFromHistory } = useSearchHistory();
  const debouncedSearch = useDebounce(onSearch, 300);

  // Garantir que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Não fazer busca automática, apenas quando o botão for clicado
  // useEffect(() => {
  //   if (query.trim()) {
  //     debouncedSearch(query);
  //   }
  // }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query);
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    onSearch(historyQuery);
    setShowHistoryDropdown(false);
  };

  const handleRemoveHistory = (e: React.MouseEvent, historyQuery: string) => {
    e.stopPropagation();
    removeFromHistory(historyQuery);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => _setIsFocused(true)}
            onBlur={() => {
              _setIsFocused(false);
              // Delay para permitir cliques nos itens do histórico
              setTimeout(() => setShowHistoryDropdown(false), 150);
            }}
            placeholder={placeholder}
            className="w-full pl-8 sm:pl-10 pr-16 sm:pr-20 py-2.5 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-pokemon-blue focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm text-sm sm:text-base"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-10 sm:right-12 flex items-center pr-2 sm:pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 space-x-0.5 sm:space-x-1">
            {isClient && showHistory && history.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                className="p-0.5 sm:p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Histórico de buscas"
              >
                <History className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
            
            {isClient && showFilters && (
              <button
                type="button"
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
                className="p-0.5 sm:p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Filtros"
              >
                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}

            {showSearchButton && (
              <button
                type="button"
                onClick={onSearchClick}
                className="px-2 sm:px-3 py-1 bg-pokemon-blue text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1"
                title="Buscar cartas"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Buscar</span>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Dropdown do histórico */}
      {isClient && showHistoryDropdown && history.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto animate-fade-in"
        >
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
              Histórico de buscas
            </div>
            {history.map((historyQuery, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(historyQuery)}
                className="w-full flex items-center justify-between px-2 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <span className="text-sm text-gray-700 truncate">{historyQuery}</span>
                <button
                  onClick={(e) => handleRemoveHistory(e, historyQuery)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                >
                  <X className="h-3 w-3" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown de filtros */}
      {isClient && showFiltersDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 animate-fade-in"
        >
          <div className="text-sm font-medium text-gray-700 mb-3">
            Filtros (Em breve)
          </div>
          <div className="text-xs text-gray-500">
            Funcionalidade de filtros será implementada em breve.
          </div>
        </div>
      )}
    </div>
  );
}
