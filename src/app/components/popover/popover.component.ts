import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import { Router } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login.page';
import { RegisterPage } from 'src/app/pages/register/register.page';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    public modalController: ModalController,  
    public popoverController: PopoverController,
    private router: Router,) { }

  ngOnInit() {}

  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
      }

      async openLogin(){
    const modal = await this.modalController.create({
      component:LoginPage,
      cssClass: 'login-register',
      
    
    });
    return await modal.present();
    // this.router.navigateByUrl('/login');
}
async openRegister(){

  const modal = await this.modalController.create({
    component:RegisterPage,
    cssClass: 'login-register'
    
  
  });
  return await modal.present();
  // this.router.navigateByUrl('/login');



}

// logOut(){
//   this.router.navigateByUrl('/');
// }

}
