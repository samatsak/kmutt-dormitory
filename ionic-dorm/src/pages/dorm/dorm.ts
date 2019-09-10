import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ChatsDormPage } from '../chats-dorm/chats-dorm'
import { TabsPage } from '../tabs/tabs'
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

/**
 * Generated class for the DormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dorm',
  templateUrl: 'dorm.html',
})
export class DormPage {
  dorm: any
  dormForm: FormGroup;
  selectedPhoto;
  loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public angularfire: AngularFireDatabase,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider) {

    this.dorm = this.authProvider.admin


    this.dormForm = this.formBuilder.group({
      dormitoryName: [this.dorm.dormitoryName, Validators.required],
      coKMUTT: [this.dorm.coKMUTT],
      type: [this.dorm.type],
      phone: [this.dorm.phone],
      email: [this.dorm.email],
      webSite: [this.dorm.webSite],
      address: [this.dorm.address, Validators.required],
      price: [this.dorm.price, Validators.required],
      elecRate: [this.dorm.elecRate],
      waterRate: [this.dorm.waterRate],
      parking: [this.dorm.parking],
      wiFi: [this.dorm.wiFi],
      securityGuard: [this.dorm.securityGuard],
      keyCard: [this.dorm.keyCard],
      elevator: [this.dorm.elevator],
      furniture: [this.dorm.furniture],
      CCTV: [this.dorm.CCTV],
      washingMachine: [this.dorm.washingMachine],
    })

  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  validate(): boolean {
    if (this.dormForm.valid) {
      return true;
    }

    let controlDormitoryName = this.dormForm.controls['dormitoryName']
    let controlPhone = this.dormForm.controls['phone'];
    let controlEmail = this.dormForm.controls['email'];
    let controlAddress = this.dormForm.controls['address'];
    let controlPrice = this.dormForm.controls['price'];

    let errorDormitoryName
    let errorPhone
    let errorEmail
    let errorAddress
    let errorPrice

    if (controlDormitoryName.invalid) {
      errorDormitoryName = 'Please provide a Dormitory Name.'
    }

    if (controlPhone.invalid) {
      errorPhone = 'Please provide a Phone number.';
    }

    if (controlEmail.invalid) {
      errorEmail = 'Please provide a Email.';
    }

    if (controlAddress.invalid) {
      errorAddress = 'Please provide a Address.';
    }

    if (controlPrice.invalid) {
      errorPrice = 'Please provide a Price.';
    }

    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: errorDormitoryName || errorPhone || errorEmail || errorAddress || errorPrice || 'Empty error message!',
      buttons: ['OK']
    });
    alert.present();
    return false;
  }

  goToChatDorm() {
    this.navCtrl.push(ChatsDormPage);
  }

  supportLogout() {
    let alert = this.alertCtrl.create({
      title: 'Log out',
      subTitle: 'Do you want to log out?',
      buttons: [
        {
          text: 'Log out',
          handler: data => {
            this.authProvider.logout()
            this.navCtrl.setRoot(TabsPage)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
    
  }

  editDorm() {
    if (this.validate()) {
      this.authProvider.admin.dormitoryName = this.dormForm.value.dormitoryName
      this.authProvider.admin.coKMUTT = this.dormForm.value.coKMUTT
      this.authProvider.admin.type = this.dormForm.value.type
      this.authProvider.admin.phone = this.dormForm.value.phone
      this.authProvider.admin.email = this.dormForm.value.email
      this.authProvider.admin.webSite = this.dormForm.value.webSite
      this.authProvider.admin.address = this.dormForm.value.address
      this.authProvider.admin.price = this.dormForm.value.price
      this.authProvider.admin.elecRate = this.dormForm.value.elecRate
      this.authProvider.admin.waterRate = this.dormForm.value.waterRate
      this.authProvider.admin.parking = this.dormForm.value.parking
      this.authProvider.admin.wiFi = this.dormForm.value.wiFi
      this.authProvider.admin.securityGuard = this.dormForm.value.securityGuard
      this.authProvider.admin.keyCard = this.dormForm.value.keyCard
      this.authProvider.admin.elevator = this.dormForm.value.elevator
      this.authProvider.admin.furniture = this.dormForm.value.furniture
      this.authProvider.admin.CCTV = this.dormForm.value.CCTV
      this.authProvider.admin.washingMachine = this.dormForm.value.washingMachine

      this.angularfire.list('/dorm-data').update(this.dorm.$key, {
        dormitoryName: this.dormForm.value.dormitoryName,
        coKMUTT: this.dormForm.value.coKMUTT,
        type: this.dormForm.value.type,
        phone: this.dormForm.value.phone,
        email: this.dormForm.value.email,
        webSite: this.dormForm.value.webSite,
        address: this.dormForm.value.address,
        price: this.dormForm.value.price,
        elecRate: this.dormForm.value.elecRate,
        waterRate: this.dormForm.value.waterRate,
        parking: this.dormForm.value.parking,
        wiFi: this.dormForm.value.wiFi,
        securityGuard: this.dormForm.value.securityGuard,
        keyCard: this.dormForm.value.keyCard,
        elevator: this.dormForm.value.elevator,
        furniture: this.dormForm.value.furniture,
        CCTV: this.dormForm.value.CCTV,
        washingMachine: this.dormForm.value.washingMachine,
        photoLink: this.dorm.photoLink
      })
      let alert = this.alertCtrl.create({
        subTitle: 'SUCCESS',
        buttons: ['OK']
      });
      alert.present();
      setTimeout(() => alert.dismiss(), 3000);

    }
  }

  uploadPic() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose photo',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.grabPicture()
          }
        },
        {
          text: 'From Library',
          handler: () => {
            this.albumPicture()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  grabPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

      this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

      this.upload();

    }, (err) => {
    });
  }

  albumPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

      this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

      this.upload();

    }, (err) => {
    });
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  upload() {
    if (this.selectedPhoto) {
      var uploadTask = firebase.storage().ref().child(this.dorm.dormitoryName + '/uploaded.png').put(this.selectedPhoto);
      uploadTask.then(this.onSuccess, this.onError);
    }
  }

  onSuccess = (snapshot) => {
    this.dorm.photoLink = snapshot.downloadURL;
    this.loading.dismiss();
  }

  onError = (error) => {
    this.loading.dismiss();
  }


}
