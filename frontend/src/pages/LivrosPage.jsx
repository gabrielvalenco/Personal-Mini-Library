import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { livrosService, categoriasService } from '../services/api';
import LivroCard from '../components/LivroCard';

const LivrosPage = () => {
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [livrosResponse, categoriasResponse] = await Promise.all([
          livrosService.getAll(),
          categoriasService.getAll()
        ]);

        setLivros(livrosResponse.results || []);
        setCategorias(categoriasResponse.results || []);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const filtrarLivros = () => {
    return livros.filter(livro => {
      const matchTitulo = livro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
      const matchCategoria = !filtroCategoria || livro.categoria === parseInt(filtroCategoria);
      return matchTitulo && matchCategoria;
    });
  };

  const handleLimparFiltros = () => {
    setFiltroTitulo('');
    setFiltroCategoria('');
  };

  const livrosFiltrados = filtrarLivros();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Livros</h2>
        <Link to="/livros/adicionar" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> Adicionar Livro
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filtros</h5>
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título..."
                value={filtroTitulo}
                onChange={(e) => setFiltroTitulo(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <select
                className="form-select"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100" 
                onClick={handleLimparFiltros}
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

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
        <>
          {livrosFiltrados.length > 0 ? (
            <div className="row">
              {livrosFiltrados.map(livro => (
                <div key={livro.id} className="col-md-6 col-lg-3 mb-4">
                  <LivroCard livro={livro} />
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              Nenhum livro encontrado com os filtros selecionados.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LivrosPage;
