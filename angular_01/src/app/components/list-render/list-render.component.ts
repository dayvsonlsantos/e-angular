import { Component } from '@angular/core';
import { Animal } from 'src/app/Animal';
import { FavoriteTableService } from 'src/app/services/favorite-table.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent {


  constructor(
    private listService: ListService,
    private favoriteService: FavoriteTableService
  ) { this.getAnimals() }


  // Forma muito vasta, tipando como objeto
  // animals: object[] = [
  //   {name: "Kyara", type: "Dog"},
  //   {name: "Lion", type: "Cat"},
  //   {name: "Thunder", type: "Dog"},
  //   {name: "Bob", type: "Horse"}
  // ]

  // Então tipamos com a interface
  animals: Animal[] = []

  favoriteAnimals: Animal[] = []

  animalDetails = ''

  showAge(animal: Animal): void {
    this.animalDetails = `O pet ${animal.name} tem ${animal.age} anos!`
  }

  removeAnimal(animal: Animal): void {
    console.log('Removendo animal')
    console.log(this.animals)
    this.animals = this.animals.filter((a) => animal.name !== a.name);
    this.listService.remove(animal.id).subscribe()
    console.log(this.animals)
  }

  AdicionarAnimal(animal: Animal): void {
    console.log(this.favoriteAnimals)
    this.favoriteService.adicionar(animal)

    // Atualiza a lista
    this.favoriteAnimals = this.favoriteService.getFavorites();
    console.log(this.favoriteAnimals)
  }

  getAnimals(): void {
    this.listService.getAll().subscribe((animals) => (this.animals = animals))
  }

}
