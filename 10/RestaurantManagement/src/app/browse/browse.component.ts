import { Component, OnInit, ElementRef } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/models/recipe';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  table: HTMLElement | undefined;
  typeSelector: HTMLSelectElement | undefined;
  selectContainer: HTMLElement | undefined;

  recipes: Recipe[] = [];
  recipeTypes: string[] = [];

  displayedFilter: string = 'none';
  previousFilter: string = this.displayedFilter;

  constructor(
    private recipeService: RecipeService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.table = this.elementRef.nativeElement.querySelector('#entities');
    this.typeSelector =
      this.elementRef.nativeElement.querySelector('#select-type');
    this.selectContainer =
      this.elementRef.nativeElement.querySelector('#select-container');

    this.fetchRecipes();
    this.fetchRecipeTypes();
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

  fetchRecipeTypes(): void {
    this.recipeService.fetchRecipeTypes().subscribe({
      next: (recipeTypes) => {
        if (!this.selectContainer)
          throw new Error('Select container not found');

        this.recipeTypes = recipeTypes;
        this.selectContainer.style.visibility = 'visible';
      },
      error: (reason) => {
        const message = reason.error.message;

        console.error(message);
        alert(message);
      },
    });
  }

  filterByType(): void {
    if (!this.typeSelector) throw new Error('Type selector not found');
    const selectedType = this.typeSelector.value;

    this.recipeService.fetchRecipesByType(selectedType).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (reason) => {
        const message = reason.error.message;

        console.error(message);
        alert(message);
      },
    });

    this.displayedFilter = this.previousFilter;
    this.previousFilter = selectedType;
  }
}
