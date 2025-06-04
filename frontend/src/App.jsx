import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LivrosPage from './pages/LivrosPage'
import LivroDetalhePage from './pages/LivroDetalhePage'
import AutoresPage from './pages/AutoresPage'
import CategoriasPage from './pages/CategoriasPage'
import AvaliacoesPage from './pages/AvaliacoesPage'
import AdicionarLivroPage from './pages/AdicionarLivroPage'
import AdicionarAutorPage from './pages/AdicionarAutorPage'
import AdicionarCategoriaPage from './pages/AdicionarCategoriaPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/livros/:id" element={<LivroDetalhePage />} />
          <Route path="/livros/adicionar" element={<AdicionarLivroPage />} />
          <Route path="/autores" element={<AutoresPage />} />
          <Route path="/autores/adicionar" element={<AdicionarAutorPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/categorias/adicionar" element={<AdicionarCategoriaPage />} />
          <Route path="/avaliacoes" element={<AvaliacoesPage />} />
        </Routes>
      </main>
      <footer className="bg-dark text-light py-3 text-center">
        <div className="container">
          <p className="mb-0">Mini Biblioteca Pessoal &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
