import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Enums from '../../enums/enums';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ComparisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comparison',
  templateUrl: 'comparison.html',
})
export class ComparisonPage {
  result:any={};
  value;
  showroom1:any=[];
  showroom2:any=[];
  category = [];
  get={rentalroom_name:''};
  detail = {rentalroom_name:'',rentalroom_id:'',rentalroom_name_location:'',rentalroom_phone:'',category_id:'',rentalroom_price:''};
  getcatname = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    this.getCategory();
    this.result.room1 ="";
    this.result.room2 ="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComparisonPage');
    let url =Enums.APIURL.URL+'/todoslim3/public/room/compare';
    this.http.get(url).subscribe(
      (data: any)=>{
      console.log(data);
       this.value = data;
       console.log(this.value);
      }
      ,
      (error) => {console.log(error)}
    );
  }


  getCategory(){
    this.detail = this.navParams.data;
    let url =Enums.APIURL.URL+'/todoslim3/public/room/category/'+this.detail.category_id;
    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.getcatname = data;
       console.log("getcatname",this.getcatname);
       console.log(url);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  getRoomview(){
    if(this.result.room1 != ""){
      let url =Enums.APIURL.URL+'/todoslim3/public/room/compare/'+this.result.room1;
    this.http.get(url).subscribe(
      (data: any)=>{
      console.log(data);
       this.showroom1 = data;
       console.log(this.showroom1);
      }
      ,
      (error) => {console.log(error)}
    );
    }
    if(this.result.room2 != ""){
      let url =Enums.APIURL.URL+'/todoslim3/public/room/compare/'+this.result.room2;
    this.http.get(url).subscribe(
      (data: any)=>{
      console.log(data);
       this.showroom2 = data;
       console.log(this.showroom2);
      }
      ,
      (error) => {console.log(error)}
    );

    }

  }



}
