import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public tempData: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    Notification.requestPermission()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(Notification.permission==='granted'){
        const notification = new Notification('Solutions Seed Challenge', {
          body: 'Novo trator cadastrado com sucesso 🚜'
        })

        notification.onclick = (e) => {
          e.preventDefault();
          window.focus();
          notification.close();
        }

      } else{
        alert('Novo trator cadastrado com sucesso 🚜')
      }
      document.location.reload()
    });
  }

}
