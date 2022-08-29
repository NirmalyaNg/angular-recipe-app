import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup | undefined;
  imageUrl: string | null = null;
  constructor(
    private recipesService: RecipesService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAddRecipeForm();
  }

  handleImageUrl(event: Event) {
    this.imageUrl = (event.target as HTMLInputElement).value;
  }

  get f() {
    return this.addRecipeForm;
  }

  public onAddIngredient() {
    const control = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
    });
    (this.f!.get('ingredients') as FormArray).push(control);
  }

  public getControls() {
    return (this.f!.get('ingredients') as FormArray).controls;
  }

  public handleSubmit() {
    if (this.f!.invalid) {
      return;
    }
    const recipe: Recipe = {
      title: this.f!.value.title,
      description: this.f!.value.description,
      imageUrl: this.f!.value.imageUrl,
      ingredients: this.f!.value.ingredients,
    };
    this.sharedService.startLoading();
    this.recipesService.saveRecipe(recipe).subscribe({
      next: (data) => {
        this.sharedService.stopLoading();
        this.f!.reset();
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.sharedService.stopLoading();
      },
    });
  }

  public onIngredientDelete(index: number) {
    (this.f!.get('ingredients') as FormArray).removeAt(index);
  }

  private createAddRecipeForm() {
    this.addRecipeForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      imageUrl: new FormControl('', [Validators.required]),
      ingredients: new FormArray([]),
    });
  }
}
