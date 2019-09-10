import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Events, Content, LoadingController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import firebase from 'firebase';
/**
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-private',
  templateUrl: 'chat-private.html',
})
export class ChatPrivatePage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  
  imgornot;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider,
    public events: Events, public zone: NgZone, public loadingCtrl: LoadingController, public imgstore : ImghandlerProvider
  ) {
    
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL; 
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.imgornot = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
        for (var key in this.allmessages) {
          if (this.allmessages[key].message.substring(0, 4) == 'http')
            this.imgornot.push(true);
          else
            this.imgornot.push(false);
        }
      })
      
      
    })
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }
 
  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
