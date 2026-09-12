import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  roles = ['Admin', 'Dispatcher', 'Medical', 'Police', 'Fire'];
  statuses = ['Active', 'Inactive'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['Active', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.userId = +idParam;
      const existingUser = this.userService.getUserById(this.userId);
      if (existingUser) {
        this.form.patchValue(existingUser);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.isEditMode && this.userId !== null) {
      this.userService.updateUser(this.userId, this.form.value);
    } else {
      this.userService.addUser(this.form.value);
    }

    this.router.navigate(['/users']);
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}