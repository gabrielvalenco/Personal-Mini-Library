import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { avaliacoesService, livrosService } from '../services/api';
import { formatShortDate } from '../utils/formatDate';

function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [livros, setLivros] = useState({});

  // Carregar todas as avaliações
  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        setLoading(true);
        const response = await avaliacoesService.getAll();
        // Verificar formato do retorno e extrair dados corretamente
        const avaliacoesData = response.results || response;
        setAvaliacoes(avaliacoesData);

        // Buscar informações dos livros para cada avaliação
        const livrosMap = {};
        if (Array.isArray(avaliacoesData)) {
          for (const avaliacao of avaliacoesData) {
            if (!livrosMap[avaliacao.livro]) {
              try {
                const livroData = await livrosService.getById(avaliacao.livro);
                livrosMap[avaliacao.livro] = livroData;
              } catch (err) {
                console.error(`Erro ao buscar livro ${avaliacao.livro}:`, err);
                livrosMap[avaliacao.livro] = { titulo: 'Livro não encontrado' };
              }
            }
          }
        }
        setLivros(livrosMap);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar avaliações:', err);
        setError('Erro ao carregar avaliações. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, []);

  const handleExcluirAvaliacao = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      try {
        await avaliacoesService.delete(id);
        setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== id));
      } catch (err) {
        console.error(`Erro ao excluir avaliação ${id}:`, err);
        alert('Erro ao excluir avaliação. Por favor, tente novamente.');
      }
    }
  };

  // Renderiza estrelas baseadas na nota
  const renderEstrelas = (nota) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <span key={i} className="star-rating">
          {i <= nota ? '★' : '☆'}
        </span>
      );
    }
    return estrelas;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h1 className="page-title">Avaliações</h1>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1 className="page-title">Avaliações</h1>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="page-title">Avaliações</h1>
      
      <div className="row mb-4">
        <div className="col">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Início</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Avaliações</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {avaliacoes.length === 0 ? (
        <div className="alert alert-info">Nenhuma avaliação encontrada.</div>
      ) : (
        <div className="row">
          {avaliacoes.map(avaliacao => (
            <div className="col-md-6 mb-4" key={avaliacao.id}>
              <div className="card review-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <Link to={`/livros/${avaliacao.livro}`} className="text-decoration-none">
                      <strong>{livros[avaliacao.livro]?.titulo || 'Carregando...'}</strong>
                    </Link>
                  </div>
                  <div>
                    {renderEstrelas(avaliacao.nota)}
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{avaliacao.comentario}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Por: {avaliacao.usuario} | Data: {formatShortDate(avaliacao.data_publicacao)}
                    </small>
                  </p>
                </div>
                <div className="card-footer text-end">
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleExcluirAvaliacao(avaliacao.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvaliacoesPage;
