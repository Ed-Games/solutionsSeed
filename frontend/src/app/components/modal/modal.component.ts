import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private apiService: ApiService) { }

  ngOnInit(): void {
    console.log('form built')
    this.registerForm = this.formBuilder.group({
      image: [File],
      name: ['', Validators.required]
    })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  submitForm(): void {
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
