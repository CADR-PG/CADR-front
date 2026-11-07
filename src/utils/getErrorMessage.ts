import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';

export function getErrorMessage(err: unknown, fallback: string): string {
  const data = (err as AxiosError<ServerError>).response?.data;
  return data?.message || data?.detail || data?.title || fallback;
}
