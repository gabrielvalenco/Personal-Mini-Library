import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { livrosService, categoriasService, autoresService } from '../services/api';

const AdicionarLivroPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    ano_publicacao: '',
    categoria: '',
    autores: []
  });
  
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse, autoresResponse] = await Promise.all([
          categoriasService.getAll(),
          autoresService.getAll()
        ]);
        
        setCategorias(categoriasResponse.results || []);
        setAutores(autoresResponse.results || []);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados necessários.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAutoresChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => parseInt(option.value)
    );
    
    setFormData({
      ...formData,
      autores: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const livroData = {
        ...formData,
        ano_publicacao: formData.ano_publicacao ? parseInt(formData.ano_publicacao) : null,
        categoria: parseInt(formData.categoria)
      };
      
      await livrosService.create(livroData);
      navigate('/livros');
    } catch (err) {
      setError('Erro ao adicionar livro. Verifique os dados e tente novamente.');
      setSubmitting(false);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/livros">Livros</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Adicionar Livro</li>
        </ol>
      </nav>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Adicionar Novo Livro</h2>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ano_publicacao" className="form-label">Ano de Publicação</label>
              <input
                type="number"
                className="form-control"
                id="ano_publicacao"
                name="ano_publicacao"
                value={formData.ano_publicacao}
                onChange={handleInputChange}
                min="1000"
                max={new Date().getFullYear()}
              />
              <div className="form-text">Opcional</div>
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoria</label>
              <select
                className="form-select"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                <Link to="/categorias/adicionar" className="btn btn-sm btn-outline-secondary">
                  + Nova Categoria
                </Link>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="autores" className="form-label">Autores</label>
              <select
                className="form-select"
                id="autores"
                name="autores"
                multiple
                value={formData.autores}
                onChange={handleAutoresChange}
                size={Math.min(5, autores.length || 1)}
                required
              >
                {autores.map(autor => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
              <div className="form-text">
                Segure Ctrl para selecionar múltiplos autores.
              </div>
              <div className="mt-2">
                <Link to="/autores/adicionar" className="btn btn-sm btn-outline-secondary">
                  + Novo Autor
                </Link>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Link to="/livros" className="btn btn-outline-secondary">Cancelar</Link>
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
                ) : 'Salvar Livro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdicionarLivroPage;
