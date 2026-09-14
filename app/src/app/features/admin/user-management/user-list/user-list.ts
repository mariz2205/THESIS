import { Component, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User } from '../../../../shared/models/user.models';
import { UserService } from '../user';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  users: User[] = [];

  showConfirm = false;
  userIdToDelete: number | null = null;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('Users received from backend:', users);

        this.users = users;

        // Force Angular to update the displayed table.
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load users:', error);

        this.users = [];

        this.cdr.detectChanges();
      }
    });
  }

  onDelete(id: number): void {
    this.userIdToDelete = id;
    this.showConfirm = true;
  }

  onConfirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Failed to delete user:', error);
        }
      });
    }

    this.showConfirm = false;
    this.userIdToDelete = null;
  }

  onCancelDelete(): void {
    this.showConfirm = false;
    this.userIdToDelete = null;
  }
}