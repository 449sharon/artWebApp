import { Component, OnInit, Renderer2, ViewChild, ElementRef, NgModuleFactoryLoader } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AddToCartPage } from '../pages/add-to-cart/add-to-cart.page';
import { ModalController, ToastController } from '@ionic/angular';
import { AddToWishListPage } from '../pages/add-to-wish-list/add-to-wish-list.page';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import {NavigationExtras} from '@angular/router';
import { ProfilePage } from '../pages/profile/profile.page';
import { ViewProductDetailsPage } from '../pages/view-product-details/view-product-details.page';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  cartItemCount: BehaviorSubject<number>;
  // wishItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  dbWishlist = firebase.firestore().collection('Wishlist');
  dbMessages = firebase.firestore().collection('Messages');
  db = firebase.firestore();
  event = {
    id: '',
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    small:'',
    medium:'',
    large: ''
  };
  active: boolean;
  errtext = '';
  myProduct = false;
   controller = document.querySelector('ion-alert-controller');
   email
   names
  // message
  message = {
    fullname: '',
    email: '',
    message:''
 }

//  validations_form: FormGroup;
//  errorMessage: string = '';

   Products = [];
   proSales = [];
   currentDiv: boolean;
   mainContentDiv
   ShowThisDiv:boolean;
   categories
   listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;
   loader: boolean = true;

   Homescreen = {
     deco: null,
     lamps: null,
     pottery: null,
     vase: null
   }
   SpecialScrin = []
  

  constructor( public toastCtrl: ToastController, private data: ProductService,private router: Router, private cartService: CartService, private render: Renderer2, public modalController: ModalController,) {
    this.adminInfo();
    this.getSpecials();


    //////
    this.getPictures();


    ///////
    // this.validations_form = this.formBuilder.group({
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   name: new FormControl('', Validators.compose([
    //     Validators.required
    //   ])),
    //   message: new FormControl('', Validators.compose([
    //    Validators.required
    //   ])),
    // });
  }

  // validation_messages = {
  //   'email': [
  //     { type: 'required', message: 'Email is required.' },
  //     { type: 'pattern', message: 'Please enter a valid email.' }
  //   ],
  //   'message': [
  //     { type: 'required', message: 'Password is required.' },
  //     { type: 'pattern', message: 'Please enter your message' }
  //   ],
  //   'name': [
  //     { type: 'required', message: 'Password is required.' },
  //     { type: 'pattern', message: 'Please enter your fullname.' }
  //   ]
  // };


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
 
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
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


  categorylist(i){
    console.log('seko',i);
    
    let navigationExtras: NavigationExtras = {
      state: {
        parms: i
      }
    }
    this.router.navigate(['categorylist'],navigationExtras)   
  }

  async allSpecials(event){

    //  console.log('SFDSDFSDF', this.data.data.image = event.obj.image);
    //  console.log('Image in the service ', this.data.data.image);
    
    // this.data.data = event
    const modal = await this.modalController.create({
      component:ViewProductDetailsPage,
      cssClass: 'my-custom-modal-css'
    
    });
    return await modal.present();
  }

     ///////////////// for sales
    getSpecials(){
      let obj = {id : '', obj : {}};
    this.db.collection('sales').limit(5).get().then(snapshot => {
      this.proSales = [];
      if (snapshot.empty) {
              this.myProduct = false;
            } else {
              this.myProduct = true;
              snapshot.forEach(doc => {
                obj.id = doc.id;
                obj.obj = doc.data();
                this.proSales.push(obj);
                obj = {id : '', obj : {}};
                
              });
              this.SpecialScrin.push(this.proSales[0])
            }
       });
  }

  getPictures(){
  let obj = {id : '', obj : {}};
  this.db.collection('Pictures').doc('images').get().then(snapshot => {
    this.Homescreen = {
      deco: null,
      lamps: null,
      pottery: null,
      vase: null
    }
    if (!snapshot.exists) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
              obj.id = snapshot.id;
              obj.obj = snapshot.data();
              this.Homescreen = {
                deco: snapshot.data().deco,
                lamps: snapshot.data().lamps,
                pottery: snapshot.data().pottery,
                vase: snapshot.data().vase
              }
              obj = {id : '', obj : {}};
            console.log("xxc", this.Homescreen);
          }
     });
}


Info = []
adminInfo(){
  this.db.collection('admins').get().then(snapshot => {
  this.Info = [];
  if (snapshot.empty) {
         this.myProduct = false;
       } else {
         this.myProduct = true;
         snapshot.forEach(doc => {
           this.Info.push(doc.data());
           console.log("admin", this.Info);
         });
         
       }
   })
}

specialsAlso(){
  this.router.navigateByUrl('/specials');
}

openAboutUS(){
    this.router.navigateByUrl('/about-us');
}

  openHome(){
    this.router.navigateByUrl('/')
  }
  // openCart(){
  //   this.router.navigateByUrl('/add-to-cart')
  // }

addMessage() {
    if(firebase.auth().currentUser){
     let customerUid = firebase.auth().currentUser.uid;
     this.dbMessages.add({
       customerUid: customerUid,
       name : this.message.fullname,
       email : this.message.email,
       message : this.message.message
  
       
      }).then(() => {
        this.toastController('Message Sent!')
     }).catch(err => {
              console.error(err);
     });

     this.message = {
      fullname: '',
      email: '',
      message:''
   }

    }else{
      //this.createModalLogin();
    }
  }

async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}

ngOnInit() {
  // this.cartItemCount = this.cartService.getCartItemCount();
  // this.wishItemCount = this.cartService.getWishCount();
}
////////
/////

  addWishlist(i) {
    //
    if(firebase.auth().currentUser){
    let  customerUid = firebase.auth().currentUser.uid;
      console.log(i);
      this.dbWishlist.add({
        timestamp: new Date().getTime(),
        customerUid: customerUid,
        name : i.obj.name,
        price: i.obj.price,
        // size:i.obj.size,
        productCode: i.obj.productCode,
        quantity: i.obj.quantity,
        percentage:i.obj.percentage,
        totalprice:i.obj.totalprice,
        image: i.obj.image
       }).then(() => {
        this.toastController('product Added to wishlist')
      })
        .catch(err => {
               console.error(err);
      });

      // this.wishItemCount.next(this.wishItemCount.value + 1);
    
    }else{
     // this.createModalLogin();
    }    
 }
//  async presentPopover(ev) {
//   const popover = await this.popoverController.create({
//     component:PopoverComponent,
//     event: ev,
//     cssClass: 'pop-over-style',
//     translucent: true,
//   });
//   return await popover.present();
  
// }

}
