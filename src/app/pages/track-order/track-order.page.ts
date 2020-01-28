import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
})
export class TrackOrderPage implements OnInit {
  listDiv: any = document.getElementsByClassName('pedding-oders');
  list: boolean = false;
  loader: boolean = true;
  active: any;
  constructor(public modalController: ModalController,private render: Renderer2) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  showList(i) {
   this.active = i;
  
   
}
}
