import { ProductService } from 'src/app/services/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';
import * as firebase from 'firebase';
import { AddToCartPage } from '../add-to-cart/add-to-cart.page';
import { AddToWishListPage } from '../add-to-wish-list/add-to-wish-list.page';
import { ProfilePage } from '../profile/profile.page';
import { Popover2Component } from 'src/app/components/popover2/popover2.component';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {
  active: boolean;
  db = firebase.firestore();
 value
 Sales = [];
  Products = [];
  myProduct = false;
  loader: boolean = true;
  rateArr = [];
  dbRating = firebase.firestore().collection('Rating');
  dbMessages = firebase.firestore().collection('Messages');
  message = {
    fullname: '',
    email: '',
    message:''
 }

  constructor(private router: Router,  public modalController: ModalController,
    private data: ProductService, private activatedRouter : ActivatedRoute,
    public popoverController: PopoverController,  public toastCtrl: ToastController) { }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params =>{
      console.log('value', this.router.getCurrentNavigation().extras.state.parms);
      this.value = this.router.getCurrentNavigation().extras.state.parms;
    })
    this.getProducts();
    setTimeout(() => {
     this.getRating();  
    }, 2000);
    
  }
  getRating() {
    this.Products.forEach((i)=>{
      this.dbRating.where('prod','==',i.productCode).onSnapshot((res)=>{
        this.rateArr = [];
        res.forEach((doc)=>{
          this.rateArr.push(doc.data())
        })
        console.log('My rating',this.rateArr);
      })
      
      
    })
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
  openHome(){
    this.router.navigateByUrl('/')
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  // openCart(){
  //   this.router.navigateByUrl('/add-to-cart')
  // }

  showList(i) {
    this.active = i;
   
    
  }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
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



}