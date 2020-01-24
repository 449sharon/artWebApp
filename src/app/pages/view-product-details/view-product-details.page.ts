import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  wishItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  dbWishlist = firebase.firestore().collection('Wishlist');

  private currentNumber = 0;
  constructor( public toastCtrl: ToastController,public modalController: ModalController) { }

  ngOnInit() {
    // this.wishItemCount = this.cartService.getWishCount();
  }

  private increment () {
    this.currentNumber++;
  }
  
  private decrement () {
    this.currentNumber--;
  }

dismiss(){
  this.modalController.dismiss({
    'dismissed':true
  });
}

////////
  /////
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
  }

  addWishlist(i) {
    //
    if(firebase.auth().currentUser){
    let  customerUid = firebase.auth().currentUser.uid;
      console.log(i);
      this.dbWishlist.add({
        timestamp: new Date().getTime(),
        customerUid: customerUid,
        product_name : i.obj.name,
        price: i.obj.price,
        size:i.obj.size,
        quantity: i.obj.quantity,
        image: i.obj.image
       }).then(() => {
        this.toastController('product Added to wishlist')
      })
        .catch(err => {
               console.error(err);
      });

      this.wishItemCount.next(this.wishItemCount.value + 1);
    
    }else{
     // this.createModalLogin();
    }    
 }


 
}
