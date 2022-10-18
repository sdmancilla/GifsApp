import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  search() {
    const value = this.txtSearch.nativeElement.value;
    this.gifsService.searhGifs(value);
    this.txtSearch.nativeElement.value = '';
  }

}
