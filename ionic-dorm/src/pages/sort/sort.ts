import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sort',
  templateUrl: 'sort.html',
})
export class SortPage {
	sortBy=""
	check=false
  filtered

  constructor(public angularfire: AngularFireDatabase, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.filtered = navParams.data
  }

  ionViewDidLoad() {
  }
  
  dismiss(){
    if(this.sortBy === 'priceLowToHigh'){
      let min
      for(let i=0;i<this.filtered.length;i++){
        min = this.filtered[i].price
        for(let j = i;j<this.filtered.length;j++){
          if(this.filtered[j].price<min){
            min = this.filtered[j].price
            let tmp = this.filtered[i]
            this.filtered[i]=this.filtered[j]
            this.filtered[j]=tmp
          }
        }
      }
    }else if(this.sortBy === 'priceHighToLow'){
      let max
      for(let i=0;i<this.filtered.length;i++){
        max = this.filtered[i].price
        for(let j = i;j<this.filtered.length;j++){
          if(this.filtered[j].price>max){
            max = this.filtered[j].price
            let tmp = this.filtered[i]
            this.filtered[i]=this.filtered[j]
            this.filtered[j]=tmp
          }
        }
      }
    }else if(this.sortBy === 'distanceLowToHigh'){
      let min
      for(let i=0;i<this.filtered.length;i++){
        min = this.filtered[i].distance
        for(let j = i;j<this.filtered.length;j++){
          if(this.filtered[j].distance<min){
            min = this.filtered[j].distance
            let tmp = this.filtered[i]
            this.filtered[i]=this.filtered[j]
            this.filtered[j]=tmp
          }
        }
      }
    }else if(this.sortBy === 'distanceHighToLow'){
      let max
      for(let i=0;i<this.filtered.length;i++){
        max = this.filtered[i].distance
        for(let j = i;j<this.filtered.length;j++){
          if(this.filtered[j].distance>max){
            max = this.filtered[j].distance
            let tmp = this.filtered[i]
            this.filtered[i]=this.filtered[j]
            this.filtered[j]=tmp
          }
        }
      }
    }else if(this.sortBy === 'rateLowToHigh'){
      let min
      for(let i=0;i<this.filtered.length;i++){
        min = this.filtered[i].totalRate
        for(let j = i;j<this.filtered.length;j++){
          if(this.filtered[j].totalRate<min){
            min = this.filtered[j].totalRate
            let tmp = this.filtered[i]
            this.filtered[i]=this.filtered[j]
            this.filtered[j]=tmp
          }
        }
      }
    }else if(this.sortBy === 'rateHighToLow'){
      let max
      for(let i=0;i<this.filtered.length;i++){
        max = 0
        for(let j = i;j<this.filtered.length;j++){
          if(this.filtered[j].totalRate>max){
            max = this.filtered[j].totalRate
            let tmp = this.filtered[i]
            this.filtered[i]=this.filtered[j]
            this.filtered[j]=tmp
          }
        }
      }
    }else{
    	
    }
  	this.viewCtrl.dismiss(this.filtered);
  }

}
