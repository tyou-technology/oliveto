import { AxiosError } from "axios";

export const getFriendlyErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as { message?: string } | undefined;

    // Prioritize backend specific messages for 400 errors as they often contain validation details
    if (status === 400 && data?.message) {
      return data.message;
    }

    switch (status) {
      case 400:
        return "Dados inválidos. Verifique as informações preenchidas.";
      case 401:
        return "Sessão expirada. Por favor, faça login novamente.";
      case 403:
        return "Você não tem permissão para realizar esta ação.";
      case 404:
        return "O recurso solicitado não foi encontrado.";
      case 429:
        return "Muitas requisições. Aguarde um momento e tente novamente.";
      case 500:
        return "Erro interno do servidor. Tente novamente mais tarde.";
      case 502:
      case 503:
      case 504:
        return "Serviço indisponível temporariamente. Tente novamente mais tarde.";
    }

    if (error.code === 'ERR_NETWORK') {
      return "Erro de conexão. Verifique sua internet e tente novamente.";
    }

    // Fallback to backend message if available
    if (data?.message) {
      return data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
};
