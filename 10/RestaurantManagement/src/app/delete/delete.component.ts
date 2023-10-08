import { Component, OnInit, ElementRef } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/models/recipe';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  table: HTMLElement | undefined;
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.table = this.elementRef.nativeElement.querySelector('#entities');
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.recipeService.fetchRecipes().subscribe({
      next: (recipes) => {
        if (!this.table) throw new Error('Table not found');

        this.recipes = recipes;
        this.table.style.visibility = 'visible';
      },
      error: (reason) => {
        const message = reason.error.message;

        console.error(message);
        alert(message);
      },
    });
  }

  deleteRecipe(id: number, recipe: string): void {
    if (confirm(`The '${recipe}' recipe will be deleted.`)) {
      this.recipeService.deleteRecipe(id).subscribe({
        next: () => {
          this.fetchRecipes();
        },
        error: (reason) => {
          const message = reason.error.message;

          console.error(message);
          alert(message);
        },
      });
    }
  }
}
