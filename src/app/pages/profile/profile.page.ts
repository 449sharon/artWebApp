import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrackOrderPage } from '../track-order/track-order.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  async createTrackOder() {
    const modal = await this.modalController.create({
      component:TrackOrderPage,
      cssClass: 'track-order',
      
    
    });
    return await modal.present();
  }
}
