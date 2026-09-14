import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { User } from '../../../shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<{ success: boolean; data: User[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<{ success: boolean; data: User }>(
      `${this.apiUrl}/${id}`
    ).pipe(
      map(response => response.data)
    );
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<{ success: boolean; data: User }>(
      this.apiUrl,
      user
    ).pipe(
      map(response => response.data)
    );
  }

  updateUser(id: number, updated: Omit<User, 'id'>): Observable<User> {
    return this.http.put<{ success: boolean; data: User }>(
      `${this.apiUrl}/${id}`,
      updated
    ).pipe(
      map(response => response.data)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}