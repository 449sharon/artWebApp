import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/services/product-service.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);

  dbCart = firebase.firestore().collection('Cart');

  private currentNumber: number = 1;
  Products = [];
  sizes = [];
  MyObj = [];
  event = {
    image: '',
    categories: '',
    name: '',
    price: 0,
    productno: '',
    desc: null,
    small: '',
    medium: '',
    large: '',
    quantity: 1,
    amount:0,
    total:0
  };
 

  image  = ""
  constructor(public modalController: ModalController, private cartService: CartService,
    public productService: ProductService,
    public data: ProductService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {

  }

  private increment (p) {
    this.currentNumber = this.currentNumber + 1;
    this.event.quantity = this.currentNumber
  }
  
  private decrement (p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.event.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }

  ionViewWillEnter(event) {
    this.Products.push(this.data.data)
  }

  addToCart(i) {
    // if(firebase.auth().currentUser){
    //  let customerUid = firebase.auth().currentUser.uid;
    
     console.log(i);
     this.dbCart.add({
       timestamp: new Date().getTime(),
      //  customerUid: customerUid,
       product_name : i.name,
       size : this.sizes,
       price: i.price,
       quantity: this.event.quantity,
       image: i.image,
       amount : i.price * this.event.quantity
    //   }).then(() => {
    //    this.toastController(' product Added to cart')
    //    this.dismiss();
    //  })
    //    .catch(err => {
    //           console.error(err);
    //  });
    //  this.cartItemCount.next(this.cartItemCount.value + 1);
    // }else{
    //   this.createModalLogin();
     })
     this.dismiss();
    }
  createModalLogin() {
    throw new Error("Method not implemented.");
  }
  toastController(arg0: string) {
    throw new Error("Method not implemented.");
  }

  dismiss(){
  this.modalController.dismiss({
    'dismissed':true
  });
}
 
}