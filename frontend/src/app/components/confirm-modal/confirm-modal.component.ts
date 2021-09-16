import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>, public apiService: ApiService,  @Inject(MAT_DIALOG_DATA) public id: any) {}

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  deleteTractor(): void {
    this.apiService.deleteTractor(this.id.id).subscribe(data => {})

    this.closeDialog()
  }

}
