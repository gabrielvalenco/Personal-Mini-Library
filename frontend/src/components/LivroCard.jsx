import React from 'react';
import { Link } from 'react-router-dom';

const LivroCard = ({ livro }) => {
  return (
    <div className="card book-card h-100">
      <div className="card-body">
        <h5 className="card-title">{livro.titulo}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {livro.ano_publicacao ? `Publicado em ${livro.ano_publicacao}` : 'Ano não informado'}
        </h6>
        <div className="mb-2">
          <span className="badge bg-primary category-badge">{livro.categoria_nome}</span>
        </div>
        <div className="mb-3">
          {livro.autores_info && livro.autores_info.map(autor => (
            <span key={autor.id} className="badge bg-secondary author-badge">{autor.nome}</span>
          ))}
        </div>
        {livro.nota_media && (
          <div className="mb-2">
            <div className="star-rating">
              {Array.from({ length: Math.round(livro.nota_media) }, (_, i) => (
                <span key={i}>★</span>
              ))}
              {Array.from({ length: 5 - Math.round(livro.nota_media) }, (_, i) => (
                <span key={i} style={{ color: '#ccc' }}>★</span>
              ))}
              <small className="ms-1 text-muted">({livro.nota_media.toFixed(1)})</small>
            </div>
          </div>
        )}
      </div>
      <div className="card-footer bg-transparent border-top-0">
        <Link to={`/livros/${livro.id}`} className="btn btn-primary w-100">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default LivroCard;
