import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  private currentNumber = 0;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
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
 
}
