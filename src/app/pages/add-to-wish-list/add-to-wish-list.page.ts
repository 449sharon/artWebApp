import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-to-wish-list',
  templateUrl: './add-to-wish-list.page.html',
  styleUrls: ['./add-to-wish-list.page.scss'],
})
export class AddToWishListPage implements OnInit {
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
