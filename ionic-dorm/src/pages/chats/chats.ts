import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import { ChatPrivatePage } from '../chat-private/chat-private' ;
import { AddChatPage } from '../add-chat/add-chat' ;

/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myfriends;
  myDorm ;
  myrequests;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
              public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider) {
  }


  ionViewWillEnter() {
    
    this.requestservice.getmyfriends();
    this.requestservice.getMyDorm();    
    this.myfriends = [];
    this.myDorm = [];    
 
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('admin-data', () => {
      this.myDorm = [];
      this.myDorm = this.requestservice.myDorm; 
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; 
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');    
    this.events.unsubscribe('friends');
    this.events.unsubscribe('admin-data');
    
  }


  addChat() {
    this.navCtrl.push(AddChatPage);
  }

  chatPrivate(dorm) {
    this.chatservice.initializebuddy(dorm);
    this.navCtrl.push(ChatPrivatePage);
  }

}
