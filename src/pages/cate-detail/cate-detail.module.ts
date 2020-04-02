import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateDetailPage } from './cate-detail';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    CateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CateDetailPage),
    StarRatingModule
  ],
})
export class CateDetailPageModule {}
