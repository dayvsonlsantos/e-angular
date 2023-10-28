import { Injectable } from '@angular/core';
import { Animal } from '../Animal';

@Injectable({
  providedIn: 'root'
})
export class FavoriteTableService {

  constructor() { }

  favoriteAnimals: Animal[] = []
  
  adicionar(animal: Animal): void {
    this.favoriteAnimals.push(animal);
  }

  getFavorites(): Animal[] {
    return this.favoriteAnimals;
}
}
