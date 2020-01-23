import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AddToCartPage } from '../pages/add-to-cart/add-to-cart.page';
import { ModalController } from '@ionic/angular';
import { AddToWishListPage } from '../pages/add-to-wish-list/add-to-wish-list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
   controller = document.querySelector('ion-alert-controller');
   email
   names
   message

   currentDiv: boolean;
   mainContentDiv
   ShowThisDiv:boolean;

   listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;

   loader: boolean = true;
  constructor(private router: Router, private cartService: CartService, private render: Renderer2,
    public modalController: ModalController,) {}


  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }


   processForm(event) {
    event.preventDefault();
    this.controller.create({
      header: 'Account Created',
      message: `Created account for: <b>${this.email} ${this.names} ${this.message} </b>`,
      buttons: [{
        text: 'OK'
      }]
    }).then(alert => alert.present());
  }

 handleEmailValue(event) {
  this.email = event.target.value;
  }

  async createAddToWishList() {
    const modal = await this.modalController.create({
      component:AddToWishListPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }

  async createAddToCart() {
    const modal = await this.modalController.create({
      component:AddToCartPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  // showList() {
  //   this.list = !this.list;
  //   this.loader = true;

  //     setTimeout(() => {
  //       if(this.list) {
  //         this.render.setStyle(this.listDiv[0], 'display', 'block');
    
  //       }else {
  //         setTimeout(() => {
  //           this.render.setStyle(this.listDiv[0], 'display', 'none');
  //         }, 500);
  //       }
  //       this.loader = false;
  //     }, 1000);
  // }

 handleNamesValue(event) {
    this.names = event.target.value;
  }
  handleMessageValue(event){
    this.message = event.target.value
  }

  changeContent(){
    if( this.mainContentDiv ){
      this.currentDiv = true

    }else{
      this.ShowThisDiv  = false
    }
  }
  // ShowThisDiv(){
    
  // }

  categorylist(){
    this.router.navigateByUrl('/categorylist');
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  openHome(){
    this.router.navigateByUrl('/')
  }
  // openCart(){
  //   this.router.navigateByUrl('/add-to-cart')
  // }


 
}
