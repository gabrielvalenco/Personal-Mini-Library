import axios from 'axios';

// URL base da API
const API_URL = 'http://localhost:8000/api';

// Instância do axios com configurações básicas
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
axiosInstance.interceptors.request.use(
  (config) => {
    // Você pode adicionar lógica de autenticação aqui, como tokens JWT
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respostas
axiosInstance.interceptors.response.use(
  (response) => {
    // Qualquer código de status que esteja dentro do intervalo 2xx faz com que esta função seja acionada
    return response;
  },
  (error) => {
    // Qualquer código de status fora do intervalo 2xx faz com que esta função seja acionada
    if (error.response) {
      // A requisição foi feita e o servidor respondeu com um código de status
      // que não está no intervalo 2xx
      console.error('Erro na resposta da API:', error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error('Sem resposta da API:', error.request);
    } else {
      // Algo aconteceu na configuração da requisição que gerou um erro
      console.error('Erro na configuração da requisição:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
