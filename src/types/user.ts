
export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name?: string;
}

export interface SessionUser {
  user?: User;
  isLoggedIn: boolean;
}
