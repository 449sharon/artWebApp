import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
   controller = document.querySelector('ion-alert-controller');
   email
   names
   message

   currentDiv: boolean;
   mainContentDiv
   ShowThisDiv:boolean;

   listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;

   loader: boolean = true;
  constructor(private router: Router, private cartService: CartService, private render: Renderer2) {}


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

  showList() {
    this.list = !this.list;
    this.loader = true;

      setTimeout(() => {
        if(this.list) {
          this.render.setStyle(this.listDiv[0], 'display', 'block');
    
        }else {
          setTimeout(() => {
            this.render.setStyle(this.listDiv[0], 'display', 'none');
          }, 500);
        }
        this.loader = false;
      }, 1000);
  }

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


 
}
