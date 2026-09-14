import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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

  isLoading = false;
  errorMessage = '';

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
      password: ['', Validators.required],
      role: ['', Validators.required],
      status: ['Active', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.userId = +idParam;

      // Password is not returned by the backend.
      // It is only required when creating a new user.
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();

      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.form.patchValue({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
          });
        },

        error: (error) => {
          console.error('Failed to load user:', error);
          this.errorMessage = 'Failed to load user.';
        }
      });
    }
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = this.form.value;

    if (this.isEditMode && this.userId !== null) {

      this.userService.updateUser(
        this.userId,
        formData
      ).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },

        error: (error) => {
          console.error('Failed to update user:', error);

          this.errorMessage =
            error.error?.message ||
            'Failed to update user.';

          this.isLoading = false;
        }
      });

    } else {

      this.userService.addUser(formData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },

        error: (error) => {
          console.error('Failed to create user:', error);

          this.errorMessage =
            error.error?.message ||
            'Failed to create user.';

          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}