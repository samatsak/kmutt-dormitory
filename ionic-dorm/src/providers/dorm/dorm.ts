import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

/*
  Generated class for the DormProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DormProvider {
  fireComments = firebase.database().ref('/comments');
  comments = [] ;
  dorm: any ;
  
  constructor(public events: Events) {
  }
  
  initializeComment(dorm) {
    this.dorm = dorm;
  }

  addNewComment(com) {
    if (this.dorm) {
      var promise = new Promise((resolve, reject) => {
        this.fireComments.child(this.dorm.$key).push({         
          commentBy: firebase.auth().currentUser.displayName,
          message: com,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          resolve(true);
          }).catch((err) => {
            reject(err);
        })
      })
      return promise;
    }
  }

  getDormComment() {
    let temp;
    this.fireComments.child(this.dorm.$key).on('value', (snapshot) => {
      this.comments = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.comments.push(temp[tempkey]);
      }
      this.events.publish('newComment');
    })
  }

}
