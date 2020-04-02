import { CateDetailPage } from './../cate-detail/cate-detail';
import { Component } from '@angular/core';
import {AlertController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
/**
 * Generated class for the CatdataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catdata',
  templateUrl: 'catdata.html',
})
export class CatdataPage {
  cate :any = [];
  rentalroom=[];
  price:any={};
  alert1 = [];
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl : AlertController) {
    this.getJsonObjet();
    // this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatdataPage');
    this.cate = this.navParams.data;
    console.log(this.cate);




  }

  getJsonObjet(){
    this.cate = this.navParams.data;
    let url =Enums.APIURL.URL+'/todoslim3/public/room/rentalroom/'+this.cate;

    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.rentalroom = data;
       console.log(this.rentalroom);
      }
      ,
      (error) => {console.log(error)}
    );

  }

  initializeItems(){
    this.rentalroom;
  }

  getItems(ev: any){
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != ''){
      this.rentalroom = this.rentalroom.filter((rentalroom) => {
        return (rentalroom.rentalroom_name.toLowerCase().indexOf(val.toLowerCase())> -1)
      })
    }
    else{
      this.getJsonObjet();
    }

  }

  gode(type){
    this.navCtrl.push("CateDetailPage",type);
  }

  cancle(){
    this.getJsonObjet();
  }

  search(){
    this.cate = this.navParams.data;
    let url1 =Enums.APIURL.URL+'/todoslim3/public/room/rentalroom/select/1/'+this.cate;
    let url2 =Enums.APIURL.URL+'/todoslim3/public/room/rentalroom/select/2/'+this.cate;
    let url3 =Enums.APIURL.URL+'/todoslim3/public/room/rentalroom/select/3/'+this.cate;

    console.log(this.rentalroom);
    let alert = this.alertCtrl.create();
    alert.setTitle('เลือกช่วงราคาห้องพัก');
    alert.addInput({
      type: 'checkbox',
      label: 'น้อยกว่า 3,000',
      value: '1',
    });

    alert.addInput({
      type: 'checkbox',
      label: '3,000-4,000',
      value: '2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'มากว่า 4,000',
      value: '3'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
      this.price = data;
        console.log(this.price);
        if(this.price==1){
          this.http.get(url1).subscribe(
            (data: any)=>{
              console.log(data);
             this.rentalroom = data;
             console.log(this.rentalroom);
            }
            ,
            (error) => {console.log(error)}
          );
        }else if(this.price==2){
          this.http.get(url2).subscribe(
            (data: any)=>{
              console.log(data);
             this.rentalroom = data;
             console.log(this.rentalroom);
            }
            ,
            (error) => {console.log(error)}
          );
        }else if(this.price==3){
          this.http.get(url3).subscribe(
            (data: any)=>{
              console.log(data);
             this.rentalroom = data;
             console.log(this.rentalroom);
            }
            ,
            (error) => {console.log(error)}
          );
        }
        else{
          this.getJsonObjet();
        }
      }


    });
    alert.present();
  }

}
