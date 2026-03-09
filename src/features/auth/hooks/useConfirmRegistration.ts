// The /auth/confirm-register endpoint is not part of the current API contract.
// This hook is kept as a placeholder — the verify page will show a not-supported message.
export const useConfirmRegistration = () => {
  return {
    mutate: () => {},
    isPending: false,
    isSuccess: false,
    isError: true,
  };
};
