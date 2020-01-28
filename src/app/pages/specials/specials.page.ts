import { ProductService } from 'src/app/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
import * as firebase from 'firebase';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
import { AddToWishListPage } from '../add-to-wish-list/add-to-wish-list.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-categorylist',
  templateUrl: './specials.page.html',
  styleUrls: ['./specials.page.scss'],
})
export class SpecialsPage {
  db = firebase.firestore();
 value
 Sales = [];
  Products = [];
  myProduct = false;
  loader: boolean = true;
  constructor(private router: Router,  public modalController: ModalController,
    private data: ProductService, private activatedRouter : ActivatedRoute) { }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    this.getSpecials(); 
  }
  
  getSpecials(){
    let obj = {id : '', obj : {}};
    this.db.collection('sales').get().then(snapshot => {
      this.Products = [];
      if (snapshot.empty) {
              this.myProduct = false;
            } else {
              this.myProduct = true;
              snapshot.forEach(doc =>{
                this.Products.push(doc.data())
              });
            }
    });
  }
  async createViewProduct(event) {
    
    this.data.data = event
    const modal = await this.modalController.create({
      component:ViewProductDetailsPage,
      cssClass: 'my-custom-modal-css'
    
    });
    return await modal.present();
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
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  openHome(){
    this.router.navigateByUrl('/')
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  // openCart(){
  //   this.router.navigateByUrl('/add-to-cart')
  // }
}