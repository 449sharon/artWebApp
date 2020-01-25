import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewProductDetailsPageModule } from './pages/view-product-details/view-product-details.module';
import * as firebase from 'firebase';
import { AddToCartPageModule } from './pages/add-to-cart/add-to-cart.module';
import { AddToWishListPageModule } from './pages/add-to-wish-list/add-to-wish-list.module';
import { ProfilePageModule } from './pages/profile/profile.module';

const firebaseConfig = {
  apiKey: "AIzaSyCEdqt_gOew6SACcVm3xMXETdQxxbdbLJE",
  authDomain: "pitsengproject.firebaseapp.com",
  databaseURL: "https://pitsengproject.firebaseio.com",
  projectId: "pitsengproject",
  storageBucket: "pitsengproject.appspot.com",
  messagingSenderId: "359447010965",
  appId: "1:359447010965:web:30e22a1e055bd366d7c59c",
  measurementId: "G-T4KR75ZKET"
};
firebase.initializeApp(firebaseConfig);
  firebase.analytics();
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, ReactiveFormsModule,ViewProductDetailsPageModule,AddToCartPageModule,
    AddToWishListPageModule,ProfilePageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
