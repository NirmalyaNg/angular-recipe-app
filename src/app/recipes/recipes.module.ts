import { NgModule } from '@angular/core';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SharedModule } from '../shared/shared.module';
import { RecipesStartComponent } from './components/recipes-start/recipes-start.component';
import { RecipeResolverService } from './services/recipe.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', pathMatch: 'full', component: RecipesStartComponent },
      { path: 'add', component: AddRecipeComponent },
      {
        path: ':id',
        component: RecipeComponent,
        resolve: { recipe: RecipeResolverService },
      },
      { path: ':id/edit', component: EditRecipeComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipeItemComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    RecipeComponent,
    RecipesComponent,
    RecipesStartComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class RecipesModule {}
