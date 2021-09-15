import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITractor } from 'src/app/interfaces/ITractor';
import { ApiService } from 'src/app/services/apiService';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  tractors  : ITractor[] = []

  constructor(public apiService : ApiService, public dialog: MatDialog ) {

  }

  ngOnInit(): void {
    this.getTractors()
  }

  openDialog(tractor: ITractor): void {
    const dialogRef = this.dialog.open(ModalComponent,{
      data: {type :'update', tractor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public getTractors(){
    this.apiService.getTractors().subscribe(tractors => {
      this.tractors = tractors
    })
  }

}
