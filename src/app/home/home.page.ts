import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AddToCartPage } from '../pages/add-to-cart/add-to-cart.page';
import { ModalController } from '@ionic/angular';
import { AddToWishListPage } from '../pages/add-to-wish-list/add-to-wish-list.page';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  cartItemCount: BehaviorSubject<number>;
  wishItemCount: BehaviorSubject<number>;
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

   Products = []
   proSales = []
   currentDiv: boolean;
   mainContentDiv
   ShowThisDiv:boolean;
   categories
   listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;
   loader: boolean = true;

   Homescreen = [];
   SpecialScrin = []

  constructor(private router: Router, private cartService: CartService, private render: Renderer2, public modalController: ModalController,) {
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

  Allspecials(){
    this.router.navigateByUrl('/specials');
  }


  getProducts(categories) {
    let obj = {id : '', obj : {}};
    if(categories == 'Vase') {
          this.active = true;
      }
    if(categories) {
        this.db.collection('Products').where('categories', '==', categories).get().then((snapshot) => {
        this.Products = [];
    if (snapshot.empty) {
         this.myProduct = false;
             //  alert('the are no Vase')
          console.log(" Category is Empty...")
     } else {
             this.myProduct = true;
             snapshot.forEach(doc => {
             obj.id = doc.id;
            obj.obj = doc.data();
            this.Products.push(obj);
            obj = {id : '', obj : {}};
            console.log("herererer", this.Products);
           });
            return this.Products;
           }
       })
    }else {
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
                        console.log("herererer", this.Products);
                      });
                      return this.Products;
                    }
            });
          }
        //  this.router.navigateByUrl('/categorylist');
     }


     ///////////////// for sales
    getSpecials(){
      let obj = {id : '', obj : {}};
    this.db.collection('sales').get().then(snapshot => {
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
                this.SpecialScrin = this.proSales
              });
            }
       });
  }

  getPictures(){
  let obj = {id : '', obj : {}};
  this.db.collection('Pictures').get().then(snapshot => {
    this.Homescreen = [];
    if (snapshot.empty) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
            snapshot.forEach(doc => {
              obj.id = doc.id;
              obj.obj = doc.data();
              this.Homescreen.push(obj);
              obj = {id : '', obj : {}};
              console.log("xxc", this.proSales);
            });
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
        //
     }).catch(err => {
              console.error(err);
     });
    }else{
      //this.createModalLogin();
    }
  }
}
