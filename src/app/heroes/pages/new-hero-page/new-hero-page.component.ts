import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: ``
})
export class NewHeroPageComponent implements OnInit {

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
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroService.getHeroById(id))
      )
      .subscribe( hero => {
        if(!hero) return this.router.navigateByUrl('/heroes/list');

        this.heroForm.reset(hero);
        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if(this.heroForm.invalid) return;

    if(this.currentHero.id) {
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero =>{
          this.showSnackBar(`${hero.superhero} Updated!`);
        })

      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero =>{
      // TODO: Add snackbar and go to /heroes/edit/hero.id
        this.showSnackBar(`${hero.superhero} Created!`);
        this.router.navigateByUrl(`/heroes/list/${hero.id}`);
      })
  }

  onDeleteHero(): void {
    if(!this.currentHero.id) throw Error('Hero ID is Required.');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true),
        switchMap(() => this.heroService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/heroes/list');
      })

    /* dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.heroService.deleteHeroById(this.currentHero.id)
        .subscribe(wasDeleted => {
          if(wasDeleted) this.router.navigateByUrl('/heroes/list');
        })
    }); */

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 2500
    });
  }

}
