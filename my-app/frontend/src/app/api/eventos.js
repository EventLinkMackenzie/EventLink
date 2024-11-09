import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const criarEvento = async (evento) => {
  try {
    const response = await axios.post(`${API_URL}/eventos`, evento);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    throw error;
  }
};

export const listarEventos = async () => {
  try {
    const response = await axios.get(`${API_URL}/eventos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    throw error;
  }
};

export const obterEvento = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/eventos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter evento:', error);
    throw error;
  }
};

export const atualizarEvento = async (id, evento) => {
  try {
    const response = await axios.put(`${API_URL}/eventos/${id}`, evento);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    throw error;
  }
};

export const excluirEvento = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eventos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    throw error;
  }
};
