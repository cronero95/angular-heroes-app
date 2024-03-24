import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: ``
})
export class NewHeroPageComponent {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'DC Comics'},
    {id: 'Marvel Comics', desc: 'Marvel Comics'}
  ]

  constructor(
    private heroService: HeroesService
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if(this.heroForm.invalid) return;

    if(this.currentHero.id) {
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero =>{
        // TODO: Add snackbar
        })

      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero =>{
      // TODO: Add snackbar and go to /heroes/edit/hero.id
      })
  }

}
