import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { HomePage } from '../../home/home';
import { ChoosePage } from '../choose';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-condition',
    templateUrl: 'condition.html',
})
export class ConditionPage implements OnInit {
    data;
    scannedCode = null;
    dateTime: Date;
    private courseName;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public barcodeScanner: BarcodeScanner,
        private firestore: AngularFirestore,
        public alertCtrl: AlertController,
    ) { }

    ngOnInit() {
        this.courseName = this.navParams.get('item');
        console.log('Id: ', this.courseName);
        this.data = this.getSongDetail(this.courseName).valueChanges();
        console.log(this.data);

    }

    getSongDetail(ID: string): AngularFirestoreDocument {
        return this.firestore.collection('smart_check').doc(ID);
    }

    // ย้ายหน้า
    goToHome() {
        this.navCtrl.push(HomePage);

    }
    // alert
    showAlert() {
        const alert = this.alertCtrl.create({
          title: 'ลบรายวิชาเรียบร้อยแล้ว!',
          buttons: ['ตกลง']
        });
        alert.present();
      }


    // ลบรายวิชา
    onClickRemoveCourse() {
        this.firestore.doc(`smart_check/${this.courseName}`).delete();
        this.navCtrl.setRoot(ChoosePage);
    }
    
}