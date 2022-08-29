import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  recipes: Recipe[] = [];
  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (!this.recipesService.isLoaded) {
      this.recipesService.fetchRecipes().subscribe((recipes) => {
        this.recipes = recipes;
      });
    } else {
      this.recipes = this.recipesService.recipes;
    }

    this.subscriptions.add(
      this.recipesService.recipesChanged.subscribe((recipes) => {
        this.recipes = recipes;
      })
    );
  }

  public handleAddRecipe() {
    this.router.navigate(['/recipes', 'add']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
