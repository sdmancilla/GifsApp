import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  searhGifs(query: string = '') {
    if (query.trim().length === 0) return;
    if (this._historial.includes(query.trim().toLowerCase())) {
      this.reorderItem(query.trim().toLowerCase());
    } else {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 9);
    };
  }

  private reorderItem(query: string = '') {
    this._historial = this._historial.filter(item => item !== query);
    this._historial.unshift(query);
  }
}
