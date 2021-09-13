import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import {HttpClientModule} from '@angular/common/http'
import { FeatherModule } from 'angular-feather';
import {Trash2, Edit, Plus, X} from 'angular-feather/icons';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FeatherModule.pick({Trash2, Edit, Plus, X})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
