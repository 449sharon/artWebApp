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
  constructor(public modalController: ModalController,private render: Renderer2) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
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
}
