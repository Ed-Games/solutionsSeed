import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  type: string = 'Register'

  isVisible: boolean = false


  constructor() { }

  ngOnInit(): void {
  }

  public toggleModal(): void {
    this.isVisible = !this.isVisible;
    console.log('visibility changed:', this.isVisible);
  }

  public setModalAsUpdate():void{
    this.type= 'Update'
  }

}
