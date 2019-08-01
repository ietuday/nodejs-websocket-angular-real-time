import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowReviewsComponent } from './show-reviews/show-reviews.component';
import { RateComponent } from './rate/rate.component';
import { ReadComponent } from './read/read.component';
import { ReturnComponent } from './return/return.component';
import { MessagesComponent } from './messages/messages.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ShowRequestsComponent } from './show-requests/show-requests.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'newUser', component: NewUserComponent},
    { path: 'showList', component: ShowListComponent, canActivate: [AuthGuardService]},
    { path: 'showReviews', component: ShowReviewsComponent, canActivate: [AuthGuardService]},
    { path: 'rate', component: RateComponent, canActivate: [AuthGuardService]},
    { path: 'read', component: ReadComponent, canActivate: [AuthGuardService]},
    { path: 'return', component: ReturnComponent, canActivate: [AuthGuardService]},
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]},
    { path: 'addBook', component: AddBookComponent, canActivate: [AuthGuardService]},
    { path: 'showRequests', component: ShowRequestsComponent, canActivate: [AuthGuardService]}
];

export const routing = RouterModule.forRoot(routes);