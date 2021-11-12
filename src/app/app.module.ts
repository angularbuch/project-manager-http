import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TaskService} from './services/task-service/task.service';
import {AppComponent} from './app.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {LoginService} from './services/login-service/login-service';
import {appRouting, routingComponents, routingProviders} from './app.routing';
import {ShowErrorComponent} from './show-error/show-error.component';
import {APPLICATION_VALIDATORS} from './models/app-validators';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {AUTH_ENABLED} from './app.tokens';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, HttpClientJsonpModule,

    appRouting],
  entryComponents: [AppComponent],
  providers: [LoginService,
    Title,
    TaskService,
    routingProviders,
    {provide: AUTH_ENABLED, useValue: false}

  ],
  declarations: [AppComponent,
    routingComponents,
    ShowErrorComponent,
    APPLICATION_VALIDATORS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
