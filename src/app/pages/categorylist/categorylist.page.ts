import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewProductDetailsPage } from '../view-product-details/view-product-details.page';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {

  constructor(private router: Router,  public modalController: ModalController, ) { }

  ngOnInit() {
  }

  // viewProductDetails(){
  //   this.router.navigateByUrl('/view-product-details');
  // }
 

  async createViewProduct() {
    const modal = await this.modalController.create({
      component:ViewProductDetailsPage,
    
    });
    return await modal.present();
  }

}
