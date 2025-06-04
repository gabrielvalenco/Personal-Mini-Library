import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriasService } from '../services/api';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novaCategoria, setNovaCategoria] = useState({ nome: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchCategorias = async () => {
    try {
      const response = await categoriasService.getAll();
      setCategorias(response.results || []);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar categorias.');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    setNovaCategoria({ nome: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novaCategoria.nome.trim()) return;
    
    setSubmitting(true);
    try {
      await categoriasService.create(novaCategoria);
      setNovaCategoria({ nome: '' });
      await fetchCategorias();
    } catch (err) {
      setError('Erro ao criar categoria.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria? Isso pode afetar livros relacionados.')) {
      try {
        await categoriasService.delete(id);
        await fetchCategorias();
      } catch (err) {
        setError('Erro ao excluir categoria. Pode haver livros associados a ela.');
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="page-title mb-4">Gerenciar Categorias</h2>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">Adicionar Nova Categoria</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome da Categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    placeholder="Ex: Ficção Científica, Romance, etc."
                    value={novaCategoria.nome}
                    onChange={handleInputChange}
                    required
                  />
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
                  ) : 'Adicionar Categoria'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h3 className="card-title mb-0">Lista de Categorias</h3>
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
                  {categorias.length > 0 ? (
                    <div className="list-group">
                      {categorias.map(categoria => (
                        <div key={categoria.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                          <div>{categoria.nome}</div>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(categoria.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      Nenhuma categoria cadastrada ainda.
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

export default CategoriasPage;
