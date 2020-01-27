import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { ConfirmationPage } from '../pages/confirmation/confirmation.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  selectedItems = [];
 
  total = 0;
  constructor(private cartService: CartService,public modalController: ModalController) { }

  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }

  



}
// import { Component, OnInit } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { ViewChild, ElementRef } from '@angular/core';
// import * as firebase from 'firebase';
// import { AlertController, PopoverController, NavParams } from '@ionic/angular';
// import { Router, NavigationExtras } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { TrackOrderPage } from '../track-order/track-order.page';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
// })
// export class ProfilePage implements OnInit {
//   db = firebase.firestore();
//   storage = firebase.storage().ref();
//   @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
//   cartItemCount: BehaviorSubject<number>;
//   uid
//   profile = {
//     image: '',
//     name: '',
//     address: '',
//     uid: '',
//     number: '',
//     email: firebase.auth().currentUser.email,
//   }


//   ///////
//   email
//   name
//   number
//   address
//   image
//   /////////
//   Allorders = [];
//   cart = [];
//   uploadprogress = 0;
//   errtext = '';
//   isuploading = false;
//   isuploaded = false;
//   isprofile = false;
//   Users = {
//     uid: '',
//     email: '',
//   }

// /////////

//   customerUid = firebase.auth().currentUser.uid;
//   dbOrder = firebase.firestore().collection('Order');

// ////////
//   public item =[];
//   conArray = []
//   Orders =[]
//   public display;
//   public postSort='recent';
//   public userID;
//   public userTransact: any;
//   users = [];
//   myArray =[]
//   constructor(public modalController: ModalController,
//     public router: Router,
//     public alertCtrl: AlertController,
//     public popoverController: PopoverController,
//     // public data: ProductService,
//     // public transact: TransactionService,
//     // private cartService: CartService
//     ) { 
//       this.uid = firebase.auth().currentUser.uid;
//     }

//   ngOnInit() {
//     firebase.auth().onAuthStateChanged(Users => {
//       if (Users) {
//         this.Users.uid = Users.uid
//         this.Users.email =Users.email
//       this.getProfile(); 
//        this.GetOrders();
//       } else {
//         console.log('no user');
        
//       }
//     })
//     // this.cart = this.cartService.getCart();
//     // this.cartItemCount = this.cartService.getCartItemCount();
//   }

//   changeListener(event): void {
//     const i = event.target.files[0];
//     console.log(i);
//     const upload = this.storage.child(i.name).put(i);
//     upload.on('state_changed', snapshot => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('upload is: ', progress , '% done.');
//     }, err => {
//     }, () => {
//       upload.snapshot.ref.getDownloadURL().then(dwnURL => {
//         console.log('File avail at: ', dwnURL);
//         this.image = dwnURL;
//       });
//     });
//   }


// async getImage(image){
//   let imagetosend = image.item(0);
//   if (!imagetosend) {
//     const imgalert = await this.alertCtrl.create({
//       message: 'Select image to upload',
//       buttons: [{
//         text: 'Okay',
//         role: 'cancel'
//       }]
//     });
//     imgalert.present();
//   } else {
//     if (imagetosend.type.split('/')[0] !== 'image') {
//       const imgalert = await this.alertCtrl.create({
//         message: 'Unsupported file type.',
//         buttons: [{
//           text: 'Okay',
//           role: 'cancel'
//         }]
//       });
//       imgalert.present();
//       imagetosend = '';
//       return;
//      } else {
//       const upload = this.storage.child(image.item(0).name).put(imagetosend);
//       upload.on('state_changed', snapshot => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         this.uploadprogress = progress;
//         this.isuploading = true;
//         if (progress==100){
//           this.isuploading = false;
//         } 
//       }, error => {
//       }, () => {
//         upload.snapshot.ref.getDownloadURL().then(downUrl => {this.ngOnInit
//           this.image = downUrl;
//           this.uploadprogress = 0;
//           this.isuploaded = true;
//         });
//       });
//      }
//   }
// }

//   createAccount(){
// // firebase.firestore().collection("UserProfile").doc(firebase.auth().currentUser.uid).update({
// //       name : this.profile.name,
// //       image : this.image, 
// //       number : this.profile.number,
// //       address : this.profile.address,
// //       email : firebase.auth().currentUser.email
// //     })
    
//     if (!this.address||!this.name||!this.number){

//       this.errtext = 'Fields should not be empty'
//     } else {
//       if (!this.image){
//         this.errtext = 'Profile image still uploading or not selected';
//       } else {
//         this.profile.uid =  this.Users.uid;

//         this.db.collection('UserProfile').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => {
//           this.getProfile();
//         }).catch(error => {
//           console.log('Error');
//         });

//       }
//     }
//   }
//   edit() {
//     this.isprofile = false;
//   }

//   getProfile(){
//     this.db.collection('UserProfile').where('uid', '==', this.Users.uid).get().then(snapshot => {
//       if (snapshot.empty) {
//         this.isprofile = false;
//       } else {
//         this.isprofile = true;

//         snapshot.forEach(doc => {
//           this.email = doc.data().email
//           this.profile.number = doc.data().number
//           this.profile.address = doc.data().address
//           this.profile.name = doc.data().name
//           this.profile.image = doc.data().image
//         })
//       }
//     })
//   }

//      ////////////////////////////////// 
//      GetOrders(){
//       this.dbOrder.where('userID','==',firebase.auth().currentUser.uid).onSnapshot((data)=>{
//               console.log("olx", data);
//               this.Allorders = [];
//                 data.forEach((item)=>{
//                   this.Allorders.push({ref:item.id,info:item.data(), total:item.data()})
//                 })
//                 console.log("ccc", this.Allorders);
    
//           }) 
//       }
    
//   dismiss(){
//     this.modalController.dismiss({
//       'dismissed':true
//     });
//   }
//   async createTrackOder() {
//     const modal = await this.modalController.create({
//       component:TrackOrderPage,
//       cssClass: 'track-order',
      
    
//     });
//     return await modal.present();
//   }
// }

