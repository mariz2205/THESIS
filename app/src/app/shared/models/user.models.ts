export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Dispatcher' | 'Medical' | 'Police' | 'Fire';
  status: 'Active' | 'Inactive';
}