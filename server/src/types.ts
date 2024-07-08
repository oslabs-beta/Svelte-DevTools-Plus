export interface HttpError {
  status: number;
  message: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}