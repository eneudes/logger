# Logger 📝

Um aplicativo web moderno para gerenciar e buscar logs de servidores e pastas. Desenvolvido com React, TypeScript e Firebase.

---

## 🎯 Sobre o Projeto

Logger é uma aplicação full-stack que permite você:
- ✅ **Registrar logs** com informações de servidor, pasta, palavra-chave e caminho
- 🔍 **Buscar logs** por palavra-chave em tempo real
- 📋 **Visualizar** todos os registros salvos
- 📋 **Copiar** facilmente informações dos logs
- 🎨 **Interface intuitiva** com design moderno

O projeto utiliza Firebase Firestore como banco de dados em nuvem, garantindo sincronização em tempo real e escalabilidade.

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server ultrarrápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento de páginas
- **Lucide React** - Ícones SVG

### Backend
- **Firebase Firestore** - Banco de dados em tempo real na nuvem
- **Firebase** - Plataforma completa do Google

### Desenvolvimento
- **ESLint** - Linter para código JavaScript/TypeScript
- **TypeScript** - Compilador e verificador de tipos

---

## 📁 Estrutura do Projeto

```
logger/
├── src/
│   ├── App.tsx              # Página principal - listagem e busca
│   ├── Create.tsx           # Página de criação de novos logs
│   ├── List.tsx             # Componente de listagem (se usado)
│   ├── firebaseConfig.ts    # Configuração do Firebase
│   ├── main.tsx             # Entry point da aplicação
│   ├── index.css            # Estilos globais
│   ├── components/
│   │   ├── Navbar.tsx       # Barra de navegação
│   │   └── CopyButton.tsx   # Botão para copiar conteúdo
│   └── public/              # Arquivos estáticos
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração do TypeScript
├── tailwind.config.ts       # Configuração do Tailwind CSS
├── eslint.config.js         # Configuração do ESLint
├── package.json             # Dependências do projeto
└── README.md                # Este arquivo
```

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Conta no Firebase

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/logger.git
cd logger
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as Variáveis de Ambiente:**
   - Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`)
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Copie as credenciais do seu projeto e preencha no `.env`:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

   - **Importante:** O arquivo `.env` está no `.gitignore` e não será versionado no Git

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Compila o projeto para produção |
| `npm run lint` | Verifica o código com ESLint |
| `npm run preview` | Visualiza a build de produção localmente |

---

## 💾 Estrutura do Banco de Dados

### Coleção: `banco`

Cada documento contém:

```json
{
  "servidor": "string",      // Nome do servidor
  "pasta": "string",         // Caminho da pasta
  "palavraChave": "string",  // Palavra-chave para busca
  "caminho": "string"        // Caminho completo do arquivo/log
}
```

---

## 🎨 Funcionalidades

### 1. **Página Principal (App.tsx)**
- Busca dinâmica por palavra-chave
- Listagem de todos os logs cadastrados
- Filtro em tempo real
- Botão de cópia rápida

### 2. **Criar Novo Log (Create.tsx)**
- Formulário para adicionar novos registros
- Validação de campos
- Salvamento no Firebase Firestore
- Feedback visual de sucesso

### 3. **Navegação (Navbar.tsx)**
- Links para principais páginas
- Navegação intuitiva

### 4. **Botão de Cópia (CopyButton.tsx)**
- Copia informações rapidamente
- Feedback visual ao usuário

---

## 🔐 Segurança e Variáveis de Ambiente

### Configuração de Variáveis

O projeto utiliza variáveis de ambiente para proteger credenciais do Firebase:

1. **O arquivo `.env` é privado** - Não é versionado no Git
2. **Use `.env.example` como template** - Compartilhe com a equipe para referência
3. **Prefixo `VITE_`** - Necessário para que o Vite exponha as variáveis no frontend

### Como Usar em Novo Ambiente

```bash
# 1. Clonar o projeto
git clone https://github.com/seu-usuario/logger.git

# 2. Copiar template
cp .env.example .env

# 3. Adicionar suas credenciais do Firebase no .env
```

### Firestore Security Rules

Configure regras de segurança no Firebase Console para controlar acesso:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /banco/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🌐 Deploy

### Opção 1: Vercel
1. Push seu código para GitHub
2. Conecte seu repositório no Vercel
3. Configure variáveis de ambiente
4. Deploy automático

### Opção 2: Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### Opção 3: Netlify
1. Conecte seu GitHub ao Netlify
2. Configure build: `npm run build`
3. Publish directory: `dist`
4. Configure variáveis de ambiente

---

## 📦 Dependências Principais

- **react** ^19.1.1 - UI library
- **firebase** ^12.3.0 - Backend e banco de dados
- **react-router-dom** ^7.9.3 - Roteamento
- **tailwindcss** ^4.1.14 - Styling
- **lucide-react** ^0.546.0 - Ícones
- **typescript** ~5.8.3 - Tipagem estática

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

---

## 📞 Suporte

Se tiver dúvidas ou encontrar problemas:
- Abra uma [issue](https://github.com/seu-usuario/logger/issues)
- Entre em contato através do email ou redes sociais

---

## 🎉 Agradecimentos

- React team por criar um ótimo framework
- Firebase pela infraestrutura em nuvem
- Tailwind CSS pelos estilos incríveis
- Comunidade open source

---

**Desenvolvido com ❤️ por eneudes matos **
