/**
 * Formata uma data para o formato local (pt-BR)
 * @param {string} dateString - A string da data no formato ISO
 * @returns {string} A data formatada no formato local
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formata uma data para um formato resumido
 * @param {string} dateString - A string da data no formato ISO
 * @returns {string} A data formatada no formato resumido
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};
