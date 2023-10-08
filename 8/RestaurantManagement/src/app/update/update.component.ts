import { Component, OnInit, ElementRef } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe, getEmptyRecipe } from 'src/models/recipe';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  table: HTMLElement | undefined;
  updateForm: HTMLElement | undefined;

  recipes: Recipe[] = [];
  updatedRecipe: Recipe = getEmptyRecipe();

  constructor(
    private recipeService: RecipeService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.table = this.elementRef.nativeElement.querySelector('#entities');
    this.updateForm =
      this.elementRef.nativeElement.querySelector('#update-form');

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

  populateForm(recipe: Recipe): void {
    if (!this.updateForm) throw new Error('Update form not found');

    if (recipe.id === this.updatedRecipe.id) {
      this.updateForm.style.visibility = 'hidden';
      this.updatedRecipe = getEmptyRecipe();

      return;
    }

    this.updatedRecipe = { ...recipe };
    if (this.updateForm.style.visibility !== 'visible') {
      this.updateForm.style.visibility = 'visible';
    }
  }

  updateRecipe(): void {
    if (!this.recipeService.validateEntity(this.updatedRecipe)) return;

    this.recipeService.updateRecipe(this.updatedRecipe).subscribe({
      next: () => {
        if (!this.updateForm) throw new Error('Update form not found');

        this.updateForm.style.visibility = 'hidden';
        this.fetchRecipes();
      },
      error: (reason) => {
        const message = `${reason.error.message}\n${reason.error.data.join(
          '\n'
        )}`;

        console.error(message);
        alert(message);
      },
    });

    this.updatedRecipe = getEmptyRecipe();
  }
}
