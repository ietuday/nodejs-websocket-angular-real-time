import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/primeng';
import { NewUserComponent } from './new-user/new-user.component';
import { AuthGuardService } from './auth-guard.service';
import { ShowListComponent } from './show-list/show-list.component';
import { GrowlModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { ShowReviewsComponent } from './show-reviews/show-reviews.component';
import { RateComponent } from './rate/rate.component';
import { ReadComponent } from './read/read.component';
import { ReturnComponent } from './return/return.component';
import { AddBookComponent } from './add-book/add-book.component';
import { RatingModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { ShowRequestsComponent } from './show-requests/show-requests.component';
import {DialogModule} from 'primeng/primeng';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddBookComponent,
    NewUserComponent,
    RateComponent,
    ReadComponent,
    ReturnComponent,
    ShowListComponent,
    ShowRequestsComponent,
    ShowReviewsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ButtonModule,
    GrowlModule,
    DataTableModule,
    ContextMenuModule,
    RatingModule,
    InputTextareaModule,
    InputMaskModule,
    PaginatorModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
