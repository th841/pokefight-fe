import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Pokemon } from './model/Pokemon';


@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  fight(pokemons: Pokemon[]): Observable<any> {
    const names = pokemons.map(p => p.name);
    const body = { names: names };
    return this.postJson(`${environment.apiUrl}/fight`, body);
  }

  loadPokemons(): Observable<any> {
    return this.getJson(`${environment.apiUrl}/pokemons/random`);
  }

  loadFights(): Observable<any> {
    return this.getJson(`${environment.apiUrl}/fight`);
  }

  private getJson<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  private postJson(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(url, body, { headers });
  }
}
