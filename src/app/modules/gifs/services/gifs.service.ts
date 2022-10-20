import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "CCrEAKwI7ICN5f0Z5sx7wnOx1RRgfb3p";
  private UrlService: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public results: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searhGifs(query: string = '') {
    if (query.trim().length === 0) return;
    if (this._historial.includes(query.trim().toLowerCase())) {
      this.reorderItem(query.trim().toLowerCase());
    } else {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 9);
    };

    localStorage.setItem('historial', JSON.stringify(this._historial));
  
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.UrlService}/search`, { params })
      .subscribe(( resp ) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      })

    
  }

  private reorderItem(query: string = '') {
    this._historial = this._historial.filter(item => item !== query);
    this._historial.unshift(query);
  }
}
