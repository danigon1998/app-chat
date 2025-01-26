# Chat Inteligente 🤖💬

[![Next.js](https://img.shields.io/badge/Next.js-13.5+-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

Interface simples para um chat inteligente com funcionalidades completas de mensagens e gestão de conversas.

## ✨ Funcionalidades Principais

- 🆕 Criação de novas conversas  
- ✏️ Edição em tempo real dos títulos das conversas  
- 💾 Persistência local de mensagens e conversas  
- 🎨 Interface responsiva com temas claro/escuro  
- ⚡ Mensagens em tempo real  
- 🗑️ Exclusão de conversas  
- 📱 Compatível com dispositivos móveis  

## 🛠️ Arquitetura Técnica

### Stack Principal
- **Frontend**: Next.js 15 (App Router)  
- **Estilos**: Tailwind CSS + Shadcn/ui  
- **Gerenciamento de Estado**: Zustand  
- **Tipagem**: TypeScript  

### Diagrama de Componentes
```mermaid
graph TD
    A[Página Principal] --> B[Sidebar]
    A --> C[ChatWindow]
    B --> D[ConversationList]
    C --> E[MessageList]
    C --> F[MessageInput]
    D --> G[ConversationItem]
```

## 🚀 Passos para Execução

1. Clonar o repositório:

    ```bash
    git clone https://github.com/seu-usuario/chat-inteligente.git

2. Instalar as dependências:

    ```bash
    npm install

3. Iniciar o servidor de desenvolvimento:

    ```bash
    npm run dev

4. Abrir no navegador:

    ```bash
    http://localhost:3000

### 📦 Dependências Principais

- next: Framework principal
- zustand: Gerenciamento de estado
- lucide-react: Ícones
- tailwindcss: Estilização
- shadcn/ui: Componentes UI

### 🤝 Boas Práticas Implementadas

- Tipagem rigorosa com TypeScript
- Componentes reutilizáveis
- Hooks personalizados
- Estrutura atômica de componentes
- Interface totalmente responsiva

### 🚧 Próximas Melhoras

- Integração com API de IA
- Sistema de autenticação