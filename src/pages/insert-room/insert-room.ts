import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the InsertRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert-room',
  templateUrl: 'insert-room.html',
})
export class InsertRoomPage {

  base64Image : string;
  room = {
    rentalroom_name: '', rentalroom_price: '', category_id: '', rentalroom_limitedroom_sex: '',	rentalroom_latitude:'',rentalroom_longitude:'',
    rentalroom_phone: '', rentalroom_name_location: '', rentalroom_facilities: ''
  };

  name :string="";
  price :string="";
  category :string="";
  sex :string="";
  phone :string="";
  location :string="";
  day :string="";

  myLatitude = 0;
  myLongitude = 0;

  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams, private camera: Camera,public geolocation: Geolocation) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertRoomPage');
  }

  openGallery(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' +imageData;
    }, (error) => {  { console.log(error) }

    });
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      this.myLatitude = resp.coords.latitude;
      this.myLongitude = resp.coords.longitude;
      });
  }

  addroom(name,price,category,sex,phone,location,day,myLatitude,myLongitude) {
     if (name != null && price != null && category != null&& sex != null&& phone != null&& location != null&& day != null) {
      let josnData;
      josnData = {
        rentalroom_name : name ,
        rentalroom_price:price,
        category_id : category,
        rentalroom_limitedroom_sex:sex,
        rentalroom_latitude:myLatitude,
        rentalroom_longitude:myLongitude,
        rentalroom_phone:phone,
        rentalroom_name_location:location,
        rentalroom_facilities:day,
      };
      let url = Enums.APIURL.URL + '/todoslim3/public/room/addroom';
      this.http.post(url, josnData).subscribe(
        (data: any) => {
          console.log(data);
          alert("เพิ่มห้องเช่าเรียบร้อยครับ");
          this.name = "";
          this.price = "";
          this.category = "";
          this.sex = "";
          this.phone = "";
          this.location = "";
          this.day = "";
          this.myLatitude = 0;
          this.myLongitude = 0;
        }
        ,
        (error) => { console.log(error) }
      );
     }
     else{
       alert("โปรดกรอกให้ครบทุกช่อง");
     }
  }

}



