import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/auth.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User | undefined {
    if(!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(user: string, password: string): Observable<User> {

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'edshja.jerhfds.jw432ew'))
      )
  }

  checkAuthentication(): Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user ),
        catchError( () => of(false) )
      )
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

}
