# 🎴 Catálogo Pokémon TCG

Uma aplicação moderna para explorar e montar decks de cartas Pokémon TCG, construída com Next.js, TypeScript, TailwindCSS e Framer Motion.

## ✨ Funcionalidades

- 🔍 **Busca Inteligente**: Pesquise cartas por nome com debounce e histórico
- 🎯 **Deck Pessoal**: Adicione cartas ao seu deck com controle de quantidade
- 📱 **Design Responsivo**: Interface adaptável para mobile, tablet e desktop
- 🎨 **Animações Suaves**: Transições fluidas com Framer Motion
- 💾 **Persistência**: Deck salvo no localStorage
- ⚡ **Performance**: Virtualização e cache inteligente
- 🎮 **UX Gamer**: Interface inspirada em card games digitais

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização utilitária
- **Framer Motion** - Animações
- **Zustand** - Gerenciamento de estado
- **React Query** - Cache e sincronização de dados
- **Zod** - Validação de schemas
- **Lucide React** - Ícones

## 🚀 Como executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Abrir no navegador**:
   ```
   http://localhost:3000
   ```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
├── components/            # Componentes reutilizáveis
│   ├── pokemon-card/      # Componente de carta
│   ├── search-bar/        # Barra de busca
│   ├── deck-modal/        # Modal do deck
│   └── loading-skeleton/  # Estados de loading
├── hooks/                 # Hooks customizados
├── lib/                  # Utilitários
│   └── utils/            # Funções auxiliares
├── schemas/              # Schemas Zod
├── stores/               # Stores Zustand
└── types/                # Interfaces TypeScript
```

## 🎨 Design System

### Cores
- **Pokemon Blue**: `#3B82F6`
- **Pokemon Purple**: `#8B5CF6`
- **Pokemon Pink**: `#EC4899`
- **Pokemon Green**: `#10B981`
- **Pokemon Red**: `#EF4444`
- **Pokemon Yellow**: `#F59E0B`

### Tipografia
- **Inter**: Texto principal
- **Orbitron**: Títulos e elementos especiais
- **Poppins**: Elementos de destaque

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=https://api.pokemontcg.io/v2
```

### Personalização
- Edite `tailwind.config.js` para customizar cores e animações
- Modifique `src/lib/utils/format.ts` para ajustar formatações
- Configure `src/stores/` para gerenciar estado global

## 📱 Responsividade

- **Mobile**: 1 coluna
- **Tablet**: 2 colunas
- **Desktop**: 3-4 colunas
- **Large Desktop**: 4+ colunas

## 🎯 Próximas Funcionalidades

- [ ] Filtros avançados (raridade, tipo, set)
- [ ] Tema claro/escuro
- [ ] Exportação de deck em PDF
- [ ] Compartilhamento de deck
- [ ] Análise de deck (estatísticas)
- [ ] Modo offline
- [ ] PWA

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- [Pokémon TCG API](https://pokemontcg.io/) pela API gratuita
- [Lucide](https://lucide.dev/) pelos ícones
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS
- [Framer Motion](https://www.framer.com/motion/) pelas animações
# catalog-pokemon
