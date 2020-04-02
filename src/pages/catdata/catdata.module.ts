import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatdataPage } from './catdata';

@NgModule({
  declarations: [
    CatdataPage,
  ],
  imports: [
    IonicPageModule.forChild(CatdataPage),
  ],
})
export class CatdataPageModule {}
