import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
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

   Products = []
   currentDiv: boolean;
   mainContentDiv
   ShowThisDiv:boolean;
   categories
   listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;

   loader: boolean = true;
  constructor(private router: Router, private cartService: CartService, private render: Renderer2) {
    this.adminInfo();
  }


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


  categorylist(){
  
  //   this.router.navigateByUrl('/categorylist');
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
          this.router.navigateByUrl('/categorylist');
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
         return this.Products;
       }
   })
}
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  openHome(){
    this.router.navigateByUrl('/')
  }

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
