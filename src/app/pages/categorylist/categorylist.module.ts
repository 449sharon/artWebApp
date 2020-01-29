import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorylistPageRoutingModule } from './categorylist-routing.module';
import { StarRatingModule } from 'ionic4-star-rating';
import { CategorylistPage } from './categorylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    CategorylistPageRoutingModule
  ],
  declarations: [CategorylistPage]
})
export class CategorylistPageModule {}
