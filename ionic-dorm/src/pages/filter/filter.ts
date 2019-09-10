import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
	price = {
		upper:7500,
		lower:2500
	}
	cctvYes = false
	cctvNo = false
	cokmuttYes = false
	cokmuttNo = false
	elevatorYes = false
	elevatorNo = false
	parkingYes = false
	parkingNo = false
	wifiYes = false
	wifiNo = false
	filtered
	
  constructor(public viewCtrl: ViewController,
  	public navCtrl: NavController,
  	public angularfire: AngularFireDatabase, 
  	public navParams: NavParams) {
    this.filtered = navParams.data
  }

  ionViewDidLoad() {
  }


  dismiss() {
    this.filtered = this.filtered.filter((row)=>{
    	if(+row.price >= +this.price.lower && +row.price <= +this.price.upper){
    		return true
    	}
    	return false;
    })

    if(this.cctvYes&&!this.cctvNo){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.CCTV.toLowerCase().indexOf('y') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.cctvNo&&!this.cctvYes){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.CCTV.toLowerCase().indexOf('n') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.cokmuttYes&&!this.cokmuttNo){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.coKMUTT.toLowerCase().indexOf('y') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.cokmuttNo&&!this.cokmuttYes){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.coKMUTT.toLowerCase().indexOf('n') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.elevatorYes&&!this.elevatorNo){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.elevator.toLowerCase().indexOf('y') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.elevatorNo&&!this.elevatorYes){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.elevator.toLowerCase().indexOf('n') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.parkingYes&&!this.parkingNo){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.parking.toLowerCase().indexOf('y') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.parkingNo&&!this.parkingYes){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.parking.toLowerCase().indexOf('n') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.wifiYes&&!this.wifiNo){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.wiFi.toLowerCase().indexOf('y') > -1){
    			return true
    		}
    		return false;
   		})
    }

    if(this.wifiNo&&!this.wifiYes){
    	this.filtered = this.filtered.filter((row)=>{
    		if(row.wiFi.toLowerCase().indexOf('n') > -1){
    			return true
    		}
    		return false;
   		})
    }

   this.viewCtrl.dismiss(this.filtered);
 }
}
