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


  constructor(public dialogRef: MatDialogRef<ModalComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.tractor) console.log(this.data.tractor);

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
      alert('Você não pode criar um trator sem nome')
      return
    }

    const data = new FormData()
    data.append('image', this.image)
    data.append('name', this.registerForm.value.name)
    this.apiService.createTractor(data as any).subscribe(response => {})
    this.closeDialog()

  }

  addImageToFormData(image: any): void {
    this.image= image
  }


}
