import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-add-to-wish-list',
  templateUrl: './add-to-wish-list.page.html',
  styleUrls: ['./add-to-wish-list.page.scss'],
})
export class AddToWishListPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);
  private wishItemCount = new BehaviorSubject(0);
  //db = firebase.firestore();
   db = firebase.database();
  
  cart = [];
  myArr = [];
  mysize: string = '';
  sizes = [];
  quantity : number = 1;
  checkbox=[];
  checked : boolean = false;
  name;
  key;
  total = 0;
  loader: boolean = true;
  amount: number;
  dbWishlist = firebase.firestore().collection('Wishlist');
  ///
  productis = [];
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];
  currentNumber = 1;
  constructor(public modalController: ModalController ,public toastController : ToastController,private cartService: CartServiceService, private alertCtrl: AlertController) {
    this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
      console.log(element.data());
      this.name = element.data().name
    })
   }
   ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }
  ngOnInit() {
    //this.cart = this.cartService.getCart();
    this.getProducts();
  }
  getProducts() {
    console.log("mylist....");
    
      this.dbWishlist.onSnapshot((res)=>{
      this.cart = [];
      console.log("inside....mylist");
      res.forEach((doc)=>{
        this.cart.push(doc.data());

        let i = this.cart.length
        this.cart[i -1]['productID'] 
console.log("vvv", this.cart);

     // return  this.total = this.getTotal();
    // return this.total = this.total + parseFloat(doc.data().price) * parseFloat(doc.data().quantity);
    ///
   
      })
    })
  }
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  // private increment (p) {
  //   this.currentNumber = this.currentNumber + 1;
  //   this.cart[p].quantity = this.currentNumber
  // }
  
  // private decrement (p) {
  //   if (this.currentNumber > 1) {
  //     this.currentNumber = this.currentNumber - 1;
  //     this.cart[p].quantity = this.currentNumber;
  //   }
  //   return this.currentNumber;
  // }
  decreaseCartItem(p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.quantity = this.currentNumber;
    }
    return this.currentNumber;
  }
 
  increaseCartItem(p) {
   this.currentNumber = this.currentNumber + 1;
    this.quantity = this.currentNumber
  }
 
  removeCartItem(id) {
    this.dbWishlist.doc(id).delete();
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);
    
  }
  sizeSelect(i, val, y) {
    this.sizes = i.detail.value;
   }


}
