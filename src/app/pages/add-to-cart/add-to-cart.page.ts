import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {
  private currentNumber = 0;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  private increment () {
    this.currentNumber++;
  }
  
  private decrement () {
    this.currentNumber--;
  }


}
