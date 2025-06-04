import axiosInstance from './axios-config';

// Usando a instância configurada do axios

// Serviços para os Livros
export const livrosService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/livros/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/livros/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar livro ${id}:`, error);
      throw error;
    }
  },
  
  create: async (livroData) => {
    try {
      const response = await axiosInstance.post('/livros/', livroData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  },
  
  update: async (id, livroData) => {
    try {
      const response = await axiosInstance.put(`/livros/${id}/`, livroData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar livro ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/livros/${id}/`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar livro ${id}:`, error);
      throw error;
    }
  },
  
  getAvaliacoes: async (id) => {
    try {
      const response = await axiosInstance.get(`/livros/${id}/avaliacoes/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar avaliações do livro ${id}:`, error);
      throw error;
    }
  }
};

// Serviços para Categorias
export const categoriasService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/categorias/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/categorias/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar categoria ${id}:`, error);
      throw error;
    }
  },
  
  create: async (categoriaData) => {
    try {
      const response = await axiosInstance.post('/categorias/', categoriaData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/categorias/${id}/`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar categoria ${id}:`, error);
      throw error;
    }
  }
};

// Serviços para Autores
export const autoresService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/autores/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar autores:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/autores/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar autor ${id}:`, error);
      throw error;
    }
  },
  
  create: async (autorData) => {
    try {
      const response = await axiosInstance.post('/autores/', autorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar autor:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/autores/${id}/`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar autor ${id}:`, error);
      throw error;
    }
  }
};

// Serviços para Avaliações
export const avaliacoesService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/avaliacoes/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/avaliacoes/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar avaliação ${id}:`, error);
      throw error;
    }
  },
  
  create: async (avaliacaoData) => {
    try {
      const response = await axiosInstance.post('/avaliacoes/', avaliacaoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/avaliacoes/${id}/`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar avaliação ${id}:`, error);
      throw error;
    }
  }
};

// Serviços para Usuários
export const usuariosService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/usuarios/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/usuarios/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },
  
  create: async (usuarioData) => {
    try {
      const response = await axiosInstance.post('/usuarios/', usuarioData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }
};
