import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { User, getEmptyUser } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = getEmptyUser();

  constructor(private router: Router, private recipeService: RecipeService) {}

  onSubmit(): void {
    this.recipeService.login(this.user).subscribe({
      next: (token) => {
        this.user = getEmptyUser();

        console.log('token:', token);
        localStorage.setItem('token', token);

        alert('Logged in successfully!');
        this.router.navigate(['']);
      },
      error: (reason) => {
        const message = `${reason.error.message}\n${reason.error.data.join(
          '\n'
        )}`;

        console.error(message);
        alert(message);
      },
    });
  }
}
