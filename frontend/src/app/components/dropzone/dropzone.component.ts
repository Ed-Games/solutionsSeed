import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  files: File[] = [];

  @Output() fileSelected = new EventEmitter<File>()

  constructor() { }


  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    this.fileSelected.emit(this.files[0]);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
  }

}
