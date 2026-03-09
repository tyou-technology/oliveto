export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  phone: string;
  company: string;
  confirmPassword: string;
}

export type ToastType = "success" | "error" | "loading";

export interface Toast {
  show: boolean;
  type: ToastType;
  title: string;
  message: string;
}
