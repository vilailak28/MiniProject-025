import { CatdataPage } from './../catdata/catdata';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
/**
 * Generated class for the TyperoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-typeroom',
  templateUrl: 'typeroom.html',
})
export class TyperoomPage {
  category=[];
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.getJsonObjet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TyperoomPage');
  }

  getJsonObjet(){
    let url =Enums.APIURL.URL+'/todoslim3/public/room/category';

    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.category = data;
       console.log(this.category);
      }
      ,
      (error) => {console.log(error)}
    );

  }

  select(type){
    this.navCtrl.push("CatdataPage",type.category_id);
  }
}
