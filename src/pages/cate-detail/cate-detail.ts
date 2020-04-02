import { GmapPage } from './../gmap/gmap';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the CateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-cate-detail',
  templateUrl: 'cate-detail.html',
})
export class CateDetailPage {
  cate :any = [];
  comement :any [];
  postcomment: any = {};
  score ="";
  comment :string="";
  getcatname = [];
  detail = {rentalroom_name:'',rentalroom_id:'',rentalroom_name_location:'',rentalroom_phone:'',category_id:'',rentalroom_price:''};

  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing, public event : Events) {

      this.getJsonObjet();
      this.getCategory()

      this.event.subscribe('star-rating:changed', (note) => {
        console.log('คะแนน',note);
        this.score = note;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CateDetailPage');
    this.cate = this.navParams.data;
    console.log(this.cate);
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

  getJsonObjet(){
    this.cate = this.navParams.data;
    let url =Enums.APIURL.URL+'/todoslim3/public/room/comment/'+this.cate.rentalroom_id;
    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.comement = data;
       console.log(this.comement);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  shar(){
   this.cate = this.navParams.data;
   let go =""+this.cate.rentalroom_name+"\nราคา : "+this.cate.rentalroom_price+"\n"+this.cate.rentalroom_name_location+"\nเบอร์ : "+this.cate.rentalroom_phone ;
   console.log("go",go);
    this.socialSharing.share(go).then(() => {
       //Success!
    }).catch(() => {
       //Error!

    });;
  }

  gmap1(cate){
    this.navCtrl.push("GmapPage",cate);
  }

  save(){
    // location.reload ();
    this.postcomment.comment_content = "";
    this.postcomment.comment_date = "";

    // this.ionViewWillLoad ();
    // this.cate = this.navParams.data;
    // let url =Enums.APIURL.URL+'/todoslim3/public/room/comment/post';
    // // this.navCtrl.setRoot (this.navCtrl.getActive () ionViewDidLoad().);





  //  let postdataset = new FormData();
  //   postdataset.append('comment_content',this.postcomment.comment_content);
  //   postdataset.append('comment_date',this.postcomment.comment_date);
  //   postdataset.append('rentalroom_id',this.cate.rentalroom_id);
  //   this.http.post(url,postdataset);<


  }

  summit(comment){
    this.cate = this.navParams.data;
    if(comment != null){
      if(this.score != ""){
        //START
        let josnData;
        josnData = {
          comment_content: comment
        , comment_score: this.score
        , rentalroom_id: this.cate.rentalroom_id
        };

        let url = Enums.APIURL.URL+'/todoslim3/public/room/addcomment';

        this.http.post(url,josnData).subscribe(
        (data: any)=>{
        console.log(data);
        this.getJsonObjet();
        this.comment="";
        this.score="";
        }
        ,
        (error) => {console.log(error)}
         );
        //END

        // this.postcomment.comment_date = "";
        //this.navCtrl.push("DetailcatPage",this.cate.category_id);


      }
      else{
        alert("โปรดให้คะแนน");
      }
    }
    else{
      alert("โปรดกรอกความคิดเห็น");
    }



  }


}
