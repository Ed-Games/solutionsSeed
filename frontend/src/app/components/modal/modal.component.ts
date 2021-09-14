import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public registerForm : FormGroup = {} as FormGroup;

  private formBuilder: FormBuilder = new FormBuilder;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private apiService: ApiService) { }

  ngOnInit(): void {
  this.registerForm = this.formBuilder.group({
      image: [''],
      name: ['', Validators.required]
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.apiService.createTractor(this.registerForm.value).subscribe(response => {})
    console.log(this.registerForm.value)
    this.dialogRef.close();
  }


}
