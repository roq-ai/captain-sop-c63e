import axios from 'axios';
import queryString from 'query-string';
import { SopInterface, SopGetQueryInterface } from 'interfaces/sop';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSops = async (query?: SopGetQueryInterface): Promise<PaginatedInterface<SopInterface>> => {
  const response = await axios.get('/api/sops', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSop = async (sop: SopInterface) => {
  const response = await axios.post('/api/sops', sop);
  return response.data;
};

export const updateSopById = async (id: string, sop: SopInterface) => {
  const response = await axios.put(`/api/sops/${id}`, sop);
  return response.data;
};

export const getSopById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sops/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSopById = async (id: string) => {
  const response = await axios.delete(`/api/sops/${id}`);
  return response.data;
};
