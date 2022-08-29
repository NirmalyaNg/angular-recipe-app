import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (!data['recipe']) {
        this.router.navigate(['/recipes']);
      } else {
        this.recipe = data['recipe'];
      }
    });
  }

  public handleRecipeDelete() {
    if (confirm('Are you sure you want to delete this recipe ?')) {
      this.recipesService.deleteRecipe(this.recipe!.id!).subscribe({
        next: () => {
          this.router.navigate(['/recipes']);
        },
      });
    }
  }
}
