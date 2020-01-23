import { ProductService } from 'src/app/services/product-service.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {

  db = firebase.firestore();

  Products = [];
  myProduct = false;
  constructor(private router: Router,  public modalController: ModalController, private data: ProductService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    let obj = {id : '', obj : {}};
  this.db.collection('Products').get().then(snapshot => {
    this.Products = [];
    if (snapshot.empty) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
            snapshot.forEach(doc => {
              obj.id = doc.id;
              obj.obj = doc.data();
              this.Products.push(obj);
              obj = {id : '', obj : {}};
            });
            return this.Products;
            console.log("details", this.Products);
            
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
  openHome(){
    this.router.navigateByUrl('/')
  }


}
