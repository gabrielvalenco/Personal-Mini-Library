import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { autoresService } from '../services/api';

const AutoresPage = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoAutor, setNovoAutor] = useState({ nome: '', nacionalidade: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchAutores = async () => {
    try {
      const response = await autoresService.getAll();
      setAutores(response.results || []);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar autores.');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoAutor({
      ...novoAutor,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novoAutor.nome.trim()) return;
    
    setSubmitting(true);
    try {
      await autoresService.create(novoAutor);
      setNovoAutor({ nome: '', nacionalidade: '' });
      await fetchAutores();
    } catch (err) {
      setError('Erro ao criar autor.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este autor? Isso pode afetar livros relacionados.')) {
      try {
        await autoresService.delete(id);
        await fetchAutores();
      } catch (err) {
        setError('Erro ao excluir autor. Pode haver livros associados a ele.');
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="page-title mb-4">Gerenciar Autores</h2>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">Adicionar Novo Autor</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome do Autor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    placeholder="Ex: Gabriel García Márquez"
                    value={novoAutor.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nacionalidade" className="form-label">Nacionalidade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nacionalidade"
                    name="nacionalidade"
                    placeholder="Ex: Colombiano"
                    value={novoAutor.nacionalidade}
                    onChange={handleInputChange}
                  />
                  <div className="form-text">Opcional</div>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : 'Adicionar Autor'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h3 className="card-title mb-0">Lista de Autores</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : (
                <>
                  {autores.length > 0 ? (
                    <div className="list-group">
                      {autores.map(autor => (
                        <div key={autor.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{autor.nome}</strong>
                            {autor.nacionalidade && <span className="text-muted ms-2">({autor.nacionalidade})</span>}
                          </div>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(autor.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      Nenhum autor cadastrado ainda.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default AutoresPage;
