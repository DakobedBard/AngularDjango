import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { DocumentDetailComponent }  from './document-detail/document-detail.component';

import { DocumentSearchComponent }  from './document-search/document-search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { LoginComponent } from './login/login.component';
import { TabComponent } from './tabs/tab/tab.component';
import { TabLineComponent } from './tabs/tab-line/tab-line.component';
import { RegisterComponent } from './register/register.component'
import { TokenInterceptorService } from './token-interceptor.service';
import { HowlComponent } from './howl/howl.component';
import { UploadComponent } from './documents/upload/upload.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { ChordLineComponent } from './tabs/chord-line/chord-line.component';
import { TabPanelComponent } from './tabs/tab-panel/tab-panel.component';
import { TabListComponent } from './tabs/tab-list/tab-list.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    MaterialModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.

    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DocumentDetailComponent,
    DocumentSearchComponent,
    LoginComponent,
    TabComponent,
    TabLineComponent,
    RegisterComponent,
    HowlComponent,
    UploadComponent,
    DocumentListComponent,
    ChordLineComponent,
    TabPanelComponent,
    TabListComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
    
  }],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
