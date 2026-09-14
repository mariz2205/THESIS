import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If already logged in, don't allow the user
    // to stay on the login page.
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  onLogin(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.isLoading = true;

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.auth.saveSession(response);

        // replaceUrl prevents the login page from remaining
        // as the previous browser history entry.
        this.router.navigate(['/'], { replaceUrl: true });
      },

      error: (error) => {
        this.isLoading = false;

        this.errorMessage =
          error.error?.message ||
          'Login failed. Please check your email and password.';
      }
    });
  }
}