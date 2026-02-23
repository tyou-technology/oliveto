import { describe, it, expect } from 'vitest';
import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { getFriendlyErrorMessage } from './error-handler';

describe('getFriendlyErrorMessage', () => {
  const createAxiosError = (status?: number, data?: any, code?: string): AxiosError => {
    const error = new AxiosError('Axios Error');
    if (status !== undefined || data !== undefined) {
      error.response = {
        status,
        data,
        statusText: '',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      } as AxiosResponse;
    }
    if (code) {
      error.code = code;
    }
    return error;
  };

  it('should return custom message for 400 error if provided', () => {
    const error = createAxiosError(400, { message: 'Custom validation error' });
    expect(getFriendlyErrorMessage(error)).toBe('Custom validation error');
  });

  it('should return default message for 400 error if no custom message provided', () => {
    const error = createAxiosError(400);
    expect(getFriendlyErrorMessage(error)).toBe('Dados inválidos. Verifique as informações preenchidas.');
  });

  it('should return friendly message for 401 status', () => {
    const error = createAxiosError(401);
    expect(getFriendlyErrorMessage(error)).toBe('Sessão expirada. Por favor, faça login novamente.');
  });

  it('should return friendly message for 403 status', () => {
    const error = createAxiosError(403);
    expect(getFriendlyErrorMessage(error)).toBe('Você não tem permissão para realizar esta ação.');
  });

  it('should return friendly message for 404 status', () => {
    const error = createAxiosError(404);
    expect(getFriendlyErrorMessage(error)).toBe('O recurso solicitado não foi encontrado.');
  });

  it('should return friendly message for 429 status', () => {
    const error = createAxiosError(429);
    expect(getFriendlyErrorMessage(error)).toBe('Muitas requisições. Aguarde um momento e tente novamente.');
  });

  it('should return friendly message for 500 status', () => {
    const error = createAxiosError(500);
    expect(getFriendlyErrorMessage(error)).toBe('Erro interno do servidor. Tente novamente mais tarde.');
  });

  it('should return friendly message for 502, 503, 504 statuses', () => {
    expect(getFriendlyErrorMessage(createAxiosError(502))).toBe('Serviço indisponível temporariamente. Tente novamente mais tarde.');
    expect(getFriendlyErrorMessage(createAxiosError(503))).toBe('Serviço indisponível temporariamente. Tente novamente mais tarde.');
    expect(getFriendlyErrorMessage(createAxiosError(504))).toBe('Serviço indisponível temporariamente. Tente novamente mais tarde.');
  });

  it('should return network error message for ERR_NETWORK code', () => {
    const error = createAxiosError(undefined, undefined, 'ERR_NETWORK');
    expect(getFriendlyErrorMessage(error)).toBe('Erro de conexão. Verifique sua internet e tente novamente.');
  });

  it('should fallback to backend message for other status codes', () => {
    const error = createAxiosError(418, { message: "I'm a teapot" });
    expect(getFriendlyErrorMessage(error)).toBe("I'm a teapot");
  });

  it('should return Axios error message for AxiosError with no status and no backend message', () => {
    const error = createAxiosError();
    expect(getFriendlyErrorMessage(error)).toBe('Axios Error');
  });

  it('should return error message for generic Error object', () => {
    const error = new Error('Generic error');
    expect(getFriendlyErrorMessage(error)).toBe('Generic error');
  });

  it('should return default message for unknown error types', () => {
    expect(getFriendlyErrorMessage('Something went wrong')).toBe('Ocorreu um erro inesperado. Tente novamente.');
    expect(getFriendlyErrorMessage(null)).toBe('Ocorreu um erro inesperado. Tente novamente.');
    expect(getFriendlyErrorMessage({})).toBe('Ocorreu um erro inesperado. Tente novamente.');
  });
});
