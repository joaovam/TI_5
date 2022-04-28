import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Error404Compnent } from './core/error-404/error-404.component';
import { AirConditionerComponent } from './smart-home-components/air-conditioner/air-conditioner.component';
import { LightsComponent } from './smart-home-components/lights/lights.component';
import { SmartDoorLockComponent } from './smart-home-components/smart-door-lock/smart-door-lock.component';
import { SmartHomeMenuComponent } from './smart-home-menu/smart-home-menu.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SmartHomeMenuComponent,
    LightsComponent,
    AirConditionerComponent,
    SmartDoorLockComponent,

  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'smartHome/menu', pathMatch: 'full'
      },
      {
        path: 'smartHome/menu', component: SmartHomeMenuComponent
      },

      {
        path: 'smartHome/lights', component: LightsComponent
      },
      {
        path: 'smartHome/ac', component: AirConditionerComponent
      },
      {
        path: 'smartHome/smartLock', component: SmartDoorLockComponent
      },
      {
        path: '**', component: Error404Compnent
      },


    ])
  ],
  exports: [MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
