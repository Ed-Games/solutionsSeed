import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITractor } from 'src/app/interfaces/ITractor';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public registerForm : FormGroup = {} as FormGroup;

  private formBuilder: FormBuilder = new FormBuilder;

  private image: File = {} as File;

  public hasImage : boolean = false;


  constructor(public dialogRef: MatDialogRef<ModalComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data?.tractor) this.hasImage =true;

    this.registerForm = this.formBuilder.group({
      image: [File],
      name: ['', Validators.required]
    })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  submitForm(): void {
    if(!this.registerForm.value.name){
      alert('O Trator precisa ter um nome')
      return
    }

    const data = new FormData()
    data.append('image', this.image)
    data.append('name', this.registerForm.value.name)
    if(this.data?.type!=="update"){
      this.apiService.createTractor(data as any).subscribe(response => {})
    } else{
      this.apiService.updateTractor(data as any, this.data.tractor._id).subscribe(response => {})
    }
    this.closeDialog()

  }

  addImageToFormData(image: any): void {
    this.image= image
  }


}
