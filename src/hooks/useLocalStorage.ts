import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para gerenciar localStorage com sincronização
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // console.error(`Erro ao salvar no localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Função para remover o valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      // console.error(`Erro ao remover localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sincronizar com mudanças no localStorage de outras abas
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          // console.error(`Erro ao sincronizar localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook para gerenciar configurações da aplicação
 */
export function useAppSettings() {
  const [settings, setSettings, clearSettings] = useLocalStorage('pokemon-app-settings', {
    theme: 'light' as 'light' | 'dark',
    cardsPerPage: 20,
    enableAnimations: true,
    enableSounds: false,
  });

  const updateSetting = useCallback(
    <K extends keyof typeof settings>(
      key: K,
      value: typeof settings[K]
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [setSettings]
  );

  return {
    settings,
    updateSetting,
    clearSettings,
  };
}

/**
 * Hook para gerenciar histórico de buscas
 */
export function useSearchHistory() {
  const [history, setHistory, clearHistory] = useLocalStorage<string[]>('pokemon-search-history', []);

  const addToHistory = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      setHistory((prev) => {
        const filtered = prev.filter((item) => item !== query);
        return [query, ...filtered].slice(0, 10); // Manter apenas 10 itens
      });
    },
    [setHistory]
  );

  const removeFromHistory = useCallback(
    (query: string) => {
      setHistory((prev) => prev.filter((item) => item !== query));
    },
    [setHistory]
  );

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
