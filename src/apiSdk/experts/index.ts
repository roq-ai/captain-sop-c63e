import axios from 'axios';
import queryString from 'query-string';
import { ExpertInterface, ExpertGetQueryInterface } from 'interfaces/expert';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getExperts = async (query?: ExpertGetQueryInterface): Promise<PaginatedInterface<ExpertInterface>> => {
  const response = await axios.get('/api/experts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createExpert = async (expert: ExpertInterface) => {
  const response = await axios.post('/api/experts', expert);
  return response.data;
};

export const updateExpertById = async (id: string, expert: ExpertInterface) => {
  const response = await axios.put(`/api/experts/${id}`, expert);
  return response.data;
};

export const getExpertById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/experts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExpertById = async (id: string) => {
  const response = await axios.delete(`/api/experts/${id}`);
  return response.data;
};
