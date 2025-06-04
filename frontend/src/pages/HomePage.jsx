import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { livrosService } from '../services/api';
import LivroCard from '../components/LivroCard';

const HomePage = () => {
  const [livrosRecentes, setLivrosRecentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivrosRecentes = async () => {
      try {
        const response = await livrosService.getAll();
        // Ordenar por ID decrescente para simular os mais recentes
        const sorted = response.results ? 
          [...response.results].sort((a, b) => b.id - a.id).slice(0, 4) : 
          [];
        setLivrosRecentes(sorted);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar livros recentes.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLivrosRecentes();
  }, []);

  return (
    <div className="container">
      <div className="jumbotron bg-light p-5 mb-4 rounded">
        <h1 className="display-4">Mini Biblioteca Pessoal</h1>
        <p className="lead">
          Gerencie seus livros, autores, categorias e avaliações em um só lugar.
        </p>
        <hr className="my-4" />
        <p>
          Utilize esta aplicação para catalogar os livros que você já leu ou pretende ler,
          adicionar avaliações e manter sua biblioteca pessoal organizada.
        </p>
        <div className="mt-4">
          <Link to="/livros" className="btn btn-primary btn-lg me-2">
            Ver Todos os Livros
          </Link>
          <Link to="/livros/adicionar" className="btn btn-outline-primary btn-lg">
            Adicionar Novo Livro
          </Link>
        </div>
      </div>

      <h2 className="page-title">Livros Recentes</h2>
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="row">
          {livrosRecentes.length > 0 ? (
            livrosRecentes.map(livro => (
              <div key={livro.id} className="col-md-6 col-lg-3 mb-4">
                <LivroCard livro={livro} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info">
                Nenhum livro cadastrado ainda. <Link to="/livros/adicionar">Adicione seu primeiro livro!</Link>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Gerencie Autores</h5>
              <p className="card-text">
                Adicione e organize informações sobre seus autores favoritos.
              </p>
              <Link to="/autores" className="btn btn-outline-primary">
                Ver Autores
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Organize por Categorias</h5>
              <p className="card-text">
                Categorize seus livros por gênero, facilitando a organização.
              </p>
              <Link to="/categorias" className="btn btn-outline-primary">
                Ver Categorias
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Avaliações</h5>
              <p className="card-text">
                Registre suas impressões sobre os livros que você leu.
              </p>
              <Link to="/avaliacoes" className="btn btn-outline-primary">
                Ver Avaliações
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
