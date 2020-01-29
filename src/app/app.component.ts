import { Component } from '@angular/core';

import { Platform, ModalController, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AddToWishListPage } from './pages/add-to-wish-list/add-to-wish-list.page';
import { AddToCartPage } from './pages/add-to-cart/add-to-cart.page';
import { ProfilePage } from './pages/profile/profile.page';
import { TrackOrderPage } from './pages/track-order/track-order.page';
import { FaqsPage } from './pages/faqs/faqs.page';
import * as firebase from 'firebase';

import { SpecialsPage } from './pages/specials/specials.page';
import { PopoverComponent } from './components/popover/popover.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  loader: boolean = true;
 
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Allspecials(){
    this.router.navigateByUrl('/specials');
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     parms: i
    //   }
    // }
    // this.router.navigate(['categorylist'],navigationExtras)   
  }
  
  async createAddToWishList() {
    const modal = await this.modalController.create({
      component:AddToWishListPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  async createAddToCart() {
    const modal = await this.modalController.create({
      component:AddToCartPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }

  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  
  async createFaqs() {
    const modal = await this.modalController.create({
      component:FaqsPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us');
}

  openHome(){
    this.router.navigateByUrl('/')
  }

  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      event: ev,
      cssClass: 'pop-over-style',
      translucent: true,
    });
    return await popover.present();
    
  }
  getAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.router.navigateByUrl('/home')
        //  this.loader
      }else {
        this.router.navigateByUrl('/login')
      }
     
      
    })
  }
}
