import { ProductService } from 'src/app/services/product-service.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
import * as firebase from 'firebase';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';


@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {

  db = firebase.firestore();
 value
  Products = [];
  myProduct = false;
  constructor(private router: Router,  public modalController: ModalController, private data: ProductService, private activatedRouter : ActivatedRoute) { }

  ngOnInit() {

    this.activatedRouter.queryParams.subscribe(params =>{
      console.log('value', this.router.getCurrentNavigation().extras.state.parms);
      this.value = this.router.getCurrentNavigation().extras.state.parms;
    })
    this.getProducts();this.getProducts()
  }
  getProducts(){
    this.db.collection('Products').where('categories', '==', this.value).get().then((snapshot) =>{
      this.Products = []
      if(snapshot.size > 0){
        snapshot.forEach(doc =>{
          this.Products.push(doc.data())
          console.log(this.Products);
          
        })
      }

    })
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
      component:AddToCartPage,
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
