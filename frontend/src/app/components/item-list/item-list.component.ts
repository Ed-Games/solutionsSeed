import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITractor } from 'src/app/interfaces/ITractor';
import { ApiService } from 'src/app/services/apiService';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  tractors  : ITractor[] = []

  constructor(public apiService : ApiService, public dialog: MatDialog, public confirmDialog : MatDialog) {

  }

  ngOnInit(): void {
    this.getTractors()
  }

  openDialog(tractor: ITractor): void {
    const dialogRef = this.dialog.open(ModalComponent,{
      data: {type :'update', tractor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("getting data....")
      this.getTractors()
      console.log(this.tractors)
    });
  }

  openConfirmDialog(id: string|undefined): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent,{
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("getting data....")
      this.getTractors()
      console.log(this.tractors)
    });
  }

  public getTractors(){
    this.apiService.getTractors().subscribe(tractors => {
      this.tractors = tractors
    })
  }

}
