import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private baseUrl =
    'https://angular-recipe-app-5f3aa-default-rtdb.firebaseio.com/';
  public _recipes: Recipe[] = [];
  public recipesChanged = new Subject<Recipe[]>();
  public isLoaded = false;

  constructor(private http: HttpClient) {}

  public get recipes() {
    return this._recipes;
  }

  public saveRecipe(recipe: Recipe): Observable<{ name: string }> {
    return this.http
      .post<{ name: string }>(this.baseUrl + 'recipes.json', {
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        ingredients: recipe.ingredients,
      })
      .pipe(
        tap((data) => {
          this._recipes.push({
            id: data.name,
            ...recipe,
          });
          this.recipesChanged.next(this._recipes.slice());
        })
      );
  }

  public fetchSpecificRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.baseUrl + `recipes/${id}.json`);
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<{ [key: string]: Recipe }>(this.baseUrl + 'recipes.json')
      .pipe(
        map((data) => this.transformRecipesData(data)),
        tap((recipes) => {
          this.isLoaded = true;
          this._recipes = recipes;
        })
      );
  }

  private transformRecipesData(data: { [key: string]: Recipe }): Recipe[] {
    const recipes: Recipe[] = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        recipes.push({
          id: key,
          ...data[key],
        });
      }
    }
    return recipes;
  }
}
