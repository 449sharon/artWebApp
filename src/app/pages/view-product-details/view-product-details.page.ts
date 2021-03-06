import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/services/product-service.service';
import { CartService } from 'src/app/cart.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { Popover2Component } from 'src/app/components/popover2/popover2.component';


@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  //cartItemCount:BehaviorSubject<number>;
  wishItemCount: BehaviorSubject<number>;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
  dbWishlist = firebase.firestore().collection('Wishlist');
  dbRating = firebase.firestore().collection('Rating');
  private cartItemCount = new BehaviorSubject(0);

  dbCart = firebase.firestore().collection('Cart');

   currentNumber: number = 1;
  Products = [];
  proSales = [];
  sizes = null;
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
    amount: 0,
    total: 0
  };
  productSize = {
    small: false,
    medium: false,
    large: false
  }

  image = ""
  constructor(public modalController: ModalController,
    public productService: ProductService,
    public data: ProductService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public cartService: CartServiceService,
    private router: Router,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.wishItemCount = this.cartService.getWishCount();
    // console.log(this.data.data.image);
  }

   increment(p) {
    this.currentNumber = this.currentNumber + 1;
    this.event.quantity = this.currentNumber
  }

   decrement(p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.event.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }

  ionViewWillEnter(event) {
    this.Products.push(this.data.data)
    this.proSales.push(this.data.data)
  }
  selectedSize(size) {
    let val = size.toElement.value
    if (this.sizes == val) {
      this.sizes = null
    } else {
      this.sizes = size.toElement.value
    }
    console.log(this.sizes);

    switch (val) {
      case 'S':
        this.productSize = {
          small: true,
          medium: false,
          large: false
        }
        break;
      case 'M':
        this.productSize = {
          small: false,
          medium: true,
          large: false
        }
        break;
      case 'L':
        this.productSize = {
          small: false,
          medium: false,
          large: true
        }
        break;
    }

  }
  addToCart(i) {

    let customerUid = firebase.auth().currentUser.uid;

    console.log(i);
    this.dbCart.add({
      timestamp: new Date().getTime(),
      customerUid: customerUid,
      product_name: i.name,
      productCode: i.productCode,
      desc: i.desc,
      size: this.sizes,
      price: i.price,
      quantity: this.event.quantity,
      image: i.image,
      amount: i.price * this.event.quantity
    })
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.dismiss();
  }
  getCartItemCount() {
    return this.cartItemCount;
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
logRatingChange(rating, id){
 // console.log("changed rating: ",rating);
  // do your stuff
  this.dbRating.add({
    rate: rating,
    user: firebase.auth().currentUser.uid,
    prod: id
  })
}

  ////////
  /////
  // async toastController(message) {
  //   let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
  //   return toast.present();
  // }

  addWishlist(i) {
   

        this.dbWishlist.add({
          timestamp: new Date().getTime(),
          product_name: i.name,
          productCode: i.productCode,
          size: this.sizes,
          price: i.price,
          quantity: this.event.quantity,
          image: i.image,
      }).then(() => {
        this.presentToast()
        this.dismiss();
        // ('product Added to wishlist')
      })
        .catch(err => {
          console.error(err);
        });

      //  this.wishItemCount.next(this.wishItemCount.value + 1);

    } 
  //   else {
  //     // this.createModalLogin();
  //   }
  // }
  async toastPopover(ev) {
    const popover = await this.popoverController.create({
      component:Popover2Component,
      event: ev,
      
      // cssClass: 'pop-over-style',
      translucent: true,
    });
    
   popover.present();
    setTimeout(()=>popover.dismiss(),500);
    
    
  }
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Item added successfully',
      duration: 3000,
      position: 'top'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
  }
}