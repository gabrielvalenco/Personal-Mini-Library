# Personal Mini Library - Django + React Project

## Description

A simple web application designed to help users catalog and review their personal book collections. This project is built using Django and Django REST Framework for the backend API, and React.js for the frontend user interface. It serves as a practical example demonstrating the implementation of various database relationships (N:N, 1:N, N:1) within a full-stack application.

## Features

*   **Backend (Django):**
    *   RESTful API endpoints for CRUD operations on Users, Categories, Authors, Books, and Reviews.
    *   Database models representing the core entities.
    *   Admin interface for basic data management.
    *   Serialization of data for API responses.
*   **Frontend (React):**
    *   Display a list of all books with details (title, category, authors).
    *   View detailed information for a single book, including user reviews.
    *   Forms to add/edit books, including selecting categories and multiple authors.
    *   Management interfaces for authors and categories.
    *   Functionality to add reviews (rating and comments) to books.
    *   Routing for navigating between different application views.

## Data Model

The application utilizes the following 5 database tables (Django models):

1.  **User:** Represents a user who submits a review.
    *   Fields: `id` (PK), `username` (CharField).
2.  **Category:** Represents the genre or category of a book (e.g., Science Fiction, Romance, Technical).
    *   Fields: `id` (PK), `name` (CharField).
3.  **Author:** Represents the author of a book.
    *   Fields: `id` (PK), `name` (CharField).
4.  **Book:** Represents a book in the library.
    *   Fields: `id` (PK), `title` (CharField), `publication_year` (IntegerField, optional).
    *   Relationships:
        *   `category` (ForeignKey to Category): A book belongs to one category; a category can have many books. **(N:1 Relationship)**
        *   `authors` (ManyToManyField to Author): A book can have multiple authors; an author can write multiple books. **(N:N Relationship)**
5.  **Review:** Represents a review (rating and comment) for a book.
    *   Fields: `id` (PK), `rating` (IntegerField, e.g., 1-5), `comment` (TextField).
    *   Relationships:
        *   `book` (ForeignKey to Book): A review belongs to one book; a book can have many reviews. **(1:N Relationship from Book's perspective)**
        *   `user` (ForeignKey to User): A review is submitted by one user; a user can submit many reviews.

## Setup and Running (Placeholder)

**Backend (Django):**

```bash
# 1. Clone the repository (replace with actual repo URL)
# git clone <repository_url>
# cd backend_directory

# 2. Create and activate a virtual environment
# python -m venv venv
# source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# 3. Install dependencies
# pip install -r requirements.txt

# 4. Apply database migrations
# python manage.py migrate

# 5. Create a superuser for the admin interface (optional)
# python manage.py createsuperuser

# 6. Start the Django development server
# python manage.py runserver
```

**Frontend (React):**

```bash
# 1. Navigate to the frontend directory
# cd ../frontend_directory

# 2. Install dependencies
# npm install  # or yarn install

# 3. Start the React development server
# npm start    # or yarn start
```

Access the application in your browser, typically at `http://localhost:3000` for React and the API at `http://localhost:8000/api/`.

# Relatório Técnico

## Arquitetura do Sistema

O sistema Personal Mini Library foi desenvolvido seguindo uma arquitetura cliente-servidor moderna, com separação clara entre frontend e backend:

- **Backend**: Implementado com Django e Django REST Framework, fornecendo uma API RESTful
- **Frontend**: Desenvolvido com React.js, consumindo a API e fornecendo uma interface de usuário responsiva

## API Backend (Django REST Framework)

### Modelos de Dados

O backend utiliza os seguintes modelos Django:

1. **Usuario**: Representa usuários que fazem avaliações de livros
   - Campos: `nome_usuario`

2. **Categoria**: Representa categorias/gêneros de livros
   - Campos: `nome`

3. **Autor**: Representa autores de livros
   - Campos: `nome`

4. **Livro**: Representa os livros na biblioteca
   - Campos: `titulo`, `ano_publicacao`
   - Relacionamentos:
     - `categoria`: ForeignKey para Categoria (N:1)
     - `autores`: ManyToManyField para Autor (N:N)

5. **Avaliacao**: Representa avaliações de livros feitas por usuários
   - Campos: `nota`, `comentario`, `data_criacao`
   - Relacionamentos:
     - `livro`: ForeignKey para Livro (N:1)
     - `usuario`: ForeignKey para Usuario (N:1)

### Serializers

Os serializers transformam os modelos Django em formatos JSON para a API:

- **UsuarioSerializer**: Serializa dados de usuários
- **CategoriaSerializer**: Serializa dados de categorias
- **AutorSerializer**: Serializa dados de autores
- **AvaliacaoSerializer**: Serializa dados de avaliações com campos adicionais como `usuario_nome`
- **LivroSerializer**: Serializa dados de livros com campos calculados e relacionamentos aninhados, incluindo `nota_media`

### Endpoints da API

A API fornece os seguintes endpoints RESTful:

| Endpoint | Método | Descrição |
|----------|--------|------------|
| `/api/usuarios/` | GET, POST | Listar todos os usuários ou criar um novo |
| `/api/usuarios/:id/` | GET, PUT, DELETE | Obter, atualizar ou excluir um usuário específico |
| `/api/categorias/` | GET, POST | Listar todas as categorias ou criar uma nova |
| `/api/categorias/:id/` | GET, PUT, DELETE | Obter, atualizar ou excluir uma categoria específica |
| `/api/autores/` | GET, POST | Listar todos os autores ou criar um novo |
| `/api/autores/:id/` | GET, PUT, DELETE | Obter, atualizar ou excluir um autor específico |
| `/api/livros/` | GET, POST | Listar todos os livros ou criar um novo |
| `/api/livros/:id/` | GET, PUT, DELETE | Obter, atualizar ou excluir um livro específico |
| `/api/livros/:id/avaliacoes/` | GET | Obter todas as avaliações de um livro específico |
| `/api/avaliacoes/` | GET, POST | Listar todas as avaliações ou criar uma nova |
| `/api/avaliacoes/:id/` | GET, PUT, DELETE | Obter, atualizar ou excluir uma avaliação específica |

## Frontend (React)

### Estrutura de Componentes

O frontend é organizado em componentes React reutilizáveis:

- **App**: Componente principal que gerencia o roteamento
- **Navbar**: Barra de navegação com links para as principais seções
- **LivroCard**: Card para exibir informações resumidas de um livro
- **LivroForm**: Formulário para criar ou editar livros
- **LivroDetalhePage**: Página de detalhes de um livro específico
- **LivrosListPage**: Página que lista todos os livros
- **AutoresPage**: Página para gerenciar autores
- **CategoriasPage**: Página para gerenciar categorias

### Gerenciamento de Estado

O estado da aplicação é gerenciado usando hooks do React:

- **useState**: Para gerenciar estados locais dos componentes
- **useEffect**: Para efeitos colaterais como chamadas à API
- **useParams**: Para acessar parâmetros da URL
- **useNavigate**: Para navegação programática

### Tema e Acessibilidade

O projeto implementa um sistema de tema claro/escuro usando Context API:

- **ThemeContext**: Contexto que armazena o tema atual
- **ThemeProvider**: Provedor que disponibiliza o tema para toda a aplicação
- Persistência do tema escolhido pelo usuário no localStorage

## Problemas Resolvidos

### 1. Modal de Avaliações Acessível

**Problema**: O modal padrão do Bootstrap para adicionar avaliações apresentava problemas de acessibilidade e z-index.

**Solução**: Implementação de um modal personalizado em React com:
- Controle adequado de foco
- Gerenciamento correto de z-index
- Estilização CSS consistente com o tema da aplicação

### 2. Simplificação do Formulário de Avaliação

**Problema**: O formulário de avaliação exigia que o usuário selecionasse um usuário, complicando a experiência.

**Solução**: 
- Definição automática de um ID de usuário padrão (ID 1)
- Remoção do campo de seleção de usuário do formulário
- Simplificação da interface para focar na nota e comentário

### 3. Formatação de Dados para a API

**Problema**: Os dados enviados à API de avaliações não estavam no formato esperado pelo backend.

**Solução**:
- Conversão adequada de strings para números inteiros
- Formatação correta dos dados antes do envio
- Tratamento adequado de erros da API

### 4. Estilização das Badges

**Problema**: As badges de autor e categoria apresentavam cores inconsistentes devido a conflitos de estilo.

**Solução**:
- Remoção das classes `bg-primary` e `bg-secondary` do Bootstrap que conflitavam com os estilos personalizados
- Uso exclusivo das classes personalizadas `author-badge` e `category-badge`
- Manutenção da consistência visual em toda a aplicação

## Tecnologias Utilizadas

### Backend
- Django
- Django REST Framework
- SQLite (desenvolvimento) / PostgreSQL (produção)

### Frontend
- React
- React Router
- Bootstrap (com customizações)
- Axios para requisições HTTP

### Ferramentas de Desenvolvimento
- npm/yarn para gerenciamento de pacotes
- Git para controle de versão
- Laragon como ambiente de desenvolvimento local
