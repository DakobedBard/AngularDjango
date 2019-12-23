import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { DocumentDetailComponent }  from './document-detail/document-detail.component';
import { UploadComponent } from './upload/upload.component';
import {LoginComponent} from './login/login.component';
const routes: Routes = [                                  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: DocumentDetailComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
