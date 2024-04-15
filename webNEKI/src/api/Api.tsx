import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export function login(email: string, password: string): Promise<any> {
    return api.post('/auth/login', { email, password });
}

export function cadastrar(nome: string, email: string, password: string): Promise<any> {
    return api.post('/auth/register', { nome,email, password });
}

export function listar(id: number, page: number): Promise<any> {
    return api.get(`/usuarioskills/${id}`, { params: { page } });
  }

export function associar(usuarioId: number, skillId: number, level: number): Promise<any> {
    const data = {
        usuarioId: usuarioId,
        skillId: skillId,
        level: level,
    };
    return api.post('/usuarioskills/associar', data);
}

export function deletarAssocia(id: number): Promise<any> {
    return api.delete(`/usuarioskills/excluir/${id}`);
}

export function atualizarHabilidade(id: number, usuarioId: number, skillId: number, level: number): Promise<any> {
    const data = {
        id: id,
        usuarioId: usuarioId,
        skillId: skillId,
        level: level,
    };
    return api.put(`/usuarioskills/atualizar/${id}`, data);
}

export function listarTodasSkills(page: number, searchTerm?: string): Promise<any> {
    let url = `/skills/listar?page=${page}`;
    if (searchTerm) {
      url += `&searchTerm=${searchTerm}`;
    }
    return api.get(url);
  }