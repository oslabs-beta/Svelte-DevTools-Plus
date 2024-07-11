export interface HttpError {
  status: number;
  message: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Item extends User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
