import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { categoriasService } from '../services/api';

function AdicionarCategoriaPage() {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!nome.trim()) {
      setError('O nome da categoria é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Enviar dados para a API
      await categoriasService.create({
        nome
      });

      // Redirecionar para a página de categorias após sucesso
      navigate('/categorias');
    } catch (err) {
      console.error('Erro ao adicionar categoria:', err);
      setError('Ocorreu um erro ao adicionar a categoria. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="page-title">Adicionar Nova Categoria</h1>

      <div className="row mb-4">
        <div className="col">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Início</Link></li>
              <li className="breadcrumb-item"><Link to="/categorias">Categorias</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Adicionar</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome da Categoria</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Salvando...
                  </>
                ) : 'Salvar'}
              </button>
              <Link to="/categorias" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdicionarCategoriaPage;
