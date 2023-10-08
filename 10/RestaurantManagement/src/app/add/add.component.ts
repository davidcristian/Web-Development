import { Component, OnInit, ElementRef } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe, getEmptyRecipe } from 'src/models/recipe';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  table: HTMLElement | undefined;

  recipes: Recipe[] = [];
  entity: Recipe = getEmptyRecipe();

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

  onSubmit(): void {
    if (!this.recipeService.validateEntity(this.entity)) return;

    this.recipeService.addRecipe(this.entity).subscribe({
      next: () => {
        this.entity = getEmptyRecipe();
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
  }
}
