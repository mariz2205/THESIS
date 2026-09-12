import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    { id: 1, name: 'Juan Dela Cruz', email: 'juan@example.com', role: 'Dispatcher', status: 'Active' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'Medical', status: 'Active' },
  ];

  getUsers(): User[] {
    return this.mockUsers;
  }

  getUserById(id: number): User | undefined {
    return this.mockUsers.find(u => u.id === id);
  }

  addUser(user: Omit<User, 'id'>): void {
    const newId = this.mockUsers.length
      ? Math.max(...this.mockUsers.map(u => u.id)) + 1
      : 1;
    this.mockUsers.push({ id: newId, ...user });
  }

  updateUser(id: number, updated: Omit<User, 'id'>): void {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.mockUsers[index] = { id, ...updated };
    }
  }

  deleteUser(id: number): void {
    this.mockUsers = this.mockUsers.filter(u => u.id !== id);
  }
}