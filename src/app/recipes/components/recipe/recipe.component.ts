import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe$!: Observable<Data>;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipe$ = this.route.data;
  }
}
