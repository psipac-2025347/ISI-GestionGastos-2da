export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  token: string;
  user: User;
}