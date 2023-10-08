import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from 'src/models/recipe';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<string> {
    return this.http
      .post('http://localhost:5017/api/Users/login', user, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>('http://localhost:5017/api/Recipes')
      .pipe(catchError(this.handleError));
  }

  fetchRecipeTypes(): Observable<string[]> {
    return this.http
      .get<string[]>('http://localhost:5017/api/Recipes/types')
      .pipe(catchError(this.handleError));
  }

  fetchRecipesByType(type: string): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`http://localhost:5017/api/Recipes/types/${type}`)
      .pipe(catchError(this.handleError));
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http
      .post<Recipe>('http://localhost:5017/api/Recipes', recipe)
      .pipe(catchError(this.handleError));
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:5017/api/Recipes/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateRecipe(recipe: Recipe): Observable<void> {
    return this.http
      .put<void>(`http://localhost:5017/api/Recipes/${recipe.id}`, recipe)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    if (error.status === 400) {
      alert(`Back end validation error!\n${error.error}`);
    } else if (error.status === 401) {
      alert('You are not logged in!');
    } else if (error.status === 0) {
      alert('Server is not running!');
    }

    return throwError(() => error);
  }

  validateAuthor(author: string) {
    if (author.length < 3)
      return '\nAuthor name must be at least 3 characters long!';

    return '';
  }

  validateName(name: string) {
    if (name.length < 3)
      return '\nRecipe name must be at least 3 characters long!';

    return '';
  }

  validateType(type: string) {
    if (type.length < 3)
      return '\nRecipe type must be at least 3 characters long!';

    return '';
  }

  validateRecipe(recipe: string) {
    if (recipe.length < 10)
      return '\nThe actual recipe must be at least 10 characters long!';

    return '';
  }

  validateEntity(entity: Recipe) {
    let errors = '';

    errors += this.validateAuthor(entity.author);
    errors += this.validateName(entity.name);
    errors += this.validateType(entity.type);
    errors += this.validateRecipe(entity.recipe);

    if (errors.length > 0) {
      alert(`Front end validation error!${errors}`);
    }

    return errors.length === 0;
  }
}
