import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  category=[];
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.getJsonObjet();
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

}

