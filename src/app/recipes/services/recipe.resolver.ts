import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe> {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe | Observable<Recipe> | Promise<Recipe> {
    const id = route.params['id'];
    return this.recipesService.fetchSpecificRecipe(id);
  }
}
