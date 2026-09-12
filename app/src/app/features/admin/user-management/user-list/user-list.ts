import { Component, OnInit } from '@angular/core';
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
export class UserList implements OnInit {
  users: User[] = [];
  showConfirm = false;
  userIdToDelete: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  onDelete(id: number): void {
    this.userIdToDelete = id;
    this.showConfirm = true;
  }

  onConfirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete);
      this.loadUsers();
    }
    this.showConfirm = false;
    this.userIdToDelete = null;
  }

  onCancelDelete(): void {
    this.showConfirm = false;
    this.userIdToDelete = null;
  }
}