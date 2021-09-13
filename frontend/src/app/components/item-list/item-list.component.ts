import { Component, OnInit } from '@angular/core';
import { ITractor } from 'src/app/interfaces/ITractor';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  tractors  : ITractor[] = []

  constructor(public apiService : ApiService) {

  }

  ngOnInit(): void {
    this.getTractors()
  }

  public getTractors(){
    this.apiService.getTractors().subscribe(tractors => {
      this.tractors = tractors
      console.log(tractors)
    })
  }

}
