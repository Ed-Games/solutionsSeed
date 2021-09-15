import { Component, OnInit } from '@angular/core';
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
      image: [''],
      name: ['', Validators.required]
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.dialogRef.close();
    let data = new FormData();
    data.append('name', this.registerForm.value.name);
    data.append('image', {
      name: `${this.registerForm.value.name}.jpg`,
      type: 'image/jpg',
      url: this.image.name
    } as any)

    console.log('data in submitForm: ', {image: this.image, name: this.registerForm.value.name})

    this.apiService.createTractor(data as unknown as ITractor).subscribe(response => {})

  }

  addImageToFormData(image: any): void {
    this.image= image
  }


}
