import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { livrosService, usuariosService, avaliacoesService } from '../services/api';

const LivroDetalhePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [novaAvaliacao, setNovaAvaliacao] = useState({
    nota: 5,
    comentario: '',
    usuario: 1, // Definindo usuário padrão com ID 1
    livro: id
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Não precisamos mais buscar usuários, já que definimos um padrão
        const livroData = await livrosService.getById(id);
        
        setLivro(livroData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do livro.');
        setLoading(false);
        console.error(err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await livrosService.delete(id);
        navigate('/livros');
      } catch (err) {
        setError('Erro ao excluir o livro.');
        console.error(err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaAvaliacao({
      ...novaAvaliacao,
      [name]: name === 'nota' || name === 'usuario' ? parseInt(value) : value
    });
  };

  const handleAvaliacaoSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando avaliação:', { ...novaAvaliacao });
      
      // Formatar os dados conforme a expectativa da API
      const dadosFormatados = {
        nota: parseInt(novaAvaliacao.nota),
        comentario: novaAvaliacao.comentario,
        livro: parseInt(id),
        usuario: 1 // Agora temos certeza que existe um usuário com ID 1
      };
      
      console.log('Dados formatados:', dadosFormatados);
      
      // Usar o serviço apropriado para criar uma avaliação
      await avaliacoesService.create(dadosFormatados);
      
      // Recarregar os dados do livro para mostrar a nova avaliação
      const livroAtualizado = await livrosService.getById(id);
      setLivro(livroAtualizado);
      
      // Fechar o modal
      setShowModal(false);
      
      // Resetar o formulário (mantendo usuário padrão ID 1)
      setNovaAvaliacao({
        nota: 5,
        comentario: '',
        usuario: 1,
        livro: parseInt(id)
      });
    } catch (err) {
      console.error('Erro ao adicionar avaliação:', err);
      
      // Exibir detalhes da resposta de erro para depuração
      if (err.response && err.response.data) {
        console.error('Detalhes do erro da API:', err.response.data);
        alert(`Erro ao adicionar avaliação: ${JSON.stringify(err.response.data)}`);
      } else {
        alert('Erro ao adicionar avaliação. Confira o console para mais detalhes.');
      }
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

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
        <Link to="/livros" className="btn btn-primary">Voltar para Lista</Link>
      </div>
    );
  }

  if (!livro) {
    return (
      <div className="container">
        <div className="alert alert-warning mt-3" role="alert">
          Livro não encontrado.
        </div>
        <Link to="/livros" className="btn btn-primary">Voltar para Lista</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/livros">Livros</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{livro.titulo}</li>
        </ol>
      </nav>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h1 className="card-title">{livro.titulo}</h1>
            <div>
              <button className="btn btn-outline-danger me-2" onClick={handleDelete}>
                Excluir
              </button>
              <Link to={`/livros/editar/${livro.id}`} className="btn btn-outline-primary">
                Editar
              </Link>
            </div>
          </div>
          
          {livro.ano_publicacao && (
            <h6 className="card-subtitle mb-3 text-muted">Publicado em {livro.ano_publicacao}</h6>
          )}

          <div className="mb-3">
            <span className="badge fs-6 category-badge">{livro.categoria_nome}</span>
          </div>

          <div className="mb-4">
            <h5>Autores:</h5>
            <div>
              {livro.autores_info && livro.autores_info.map(autor => (
                <span key={autor.id} className="badge fs-6 me-2 author-badge">{autor.nome}</span>
              ))}
            </div>
          </div>

          {livro.nota_media && (
            <div className="mb-4">
              <h5>Nota média:</h5>
              <div className="star-rating fs-3">
                {Array.from({ length: Math.round(livro.nota_media) }, (_, i) => (
                  <span key={i}>★</span>
                ))}
                {Array.from({ length: 5 - Math.round(livro.nota_media) }, (_, i) => (
                  <span key={i} style={{ color: '#ccc' }}>★</span>
                ))}
                <span className="ms-2 fs-5">({livro.nota_media.toFixed(1)})</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h2>Avaliações</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Adicionar Avaliação
            </button>
          </div>
          {livro.avaliacoes && livro.avaliacoes.length > 0 ? (
            livro.avaliacoes.map((avaliacao) => (
              <div key={avaliacao.id} className="card mb-3 review-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{avaliacao.usuario_nome}</h5>
                    <div className="star-rating">
                      {Array.from({ length: avaliacao.nota }, (_, i) => (
                        <span key={i}>★</span>
                      ))}
                      {Array.from({ length: 5 - avaliacao.nota }, (_, i) => (
                        <span key={i} style={{ color: '#ccc' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="card-text">{avaliacao.comentario}</p>
                  <div className="review-date">
                    {new Date(avaliacao.data_criacao).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">
              Este livro ainda não possui avaliações.
            </div>
          )}
        </div>
      </div>

      {/* Modal para Adicionar Avaliação (usando React para controlar a exibição) */}
      {showModal && (
        <>
          <div 
            className="custom-modal-backdrop" 
            onClick={() => setShowModal(false)}
          ></div>
          <div className="custom-modal">
            <div className="custom-modal-dialog">
              <div className="custom-modal-content">
                <div className="custom-modal-header">
                  <h5 className="modal-title">Adicionar Avaliação</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowModal(false)} 
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleAvaliacaoSubmit}>
                  <div className="custom-modal-body">
                    {/* Campo de usuário removido - usando valor fixo ID 1 */}
                    <div className="mb-3">
                      <label htmlFor="nota" className="form-label">Nota</label>
                      <select
                        id="nota"
                        name="nota"
                        className="form-select"
                        value={novaAvaliacao.nota}
                        onChange={handleInputChange}
                        required
                      >
                        <option value={5}>5 - Excelente</option>
                        <option value={4}>4 - Muito bom</option>
                        <option value={3}>3 - Bom</option>
                        <option value={2}>2 - Regular</option>
                        <option value={1}>1 - Ruim</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="comentario" className="form-label">Comentário</label>
                      <textarea
                        id="comentario"
                        name="comentario"
                        className="form-control"
                        rows="4"
                        value={novaAvaliacao.comentario}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="custom-modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">Salvar Avaliação</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LivroDetalhePage;
