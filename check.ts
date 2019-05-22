import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-check',
    templateUrl: 'check.html'
})
export class CheckPage {
    qrData = null;
    createdCode = null;
    scannedCode = null;
    dateTime: Date;
    private course;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private firestore: AngularFirestore,
        public navCrtl: NavController,
        public alertCtrl: AlertController,
        private navParams: NavParams,
    ) {
        // ตั้งค่าแสดงเวลาบัจจุปัน
        this.dateTime = new Date();
        // รับค่า name
        this.course = this.navParams.get('item');

    }

    // แสกน qrcode
    onClickSCAN() {
        this.barcodeScanner.scan()
            .then(barcodeData => {
                console.log('Barcode data', barcodeData);
                this.createCheck(barcodeData.text);
                const alert = this.alertCtrl.create({
                    title: 'สแกนเรียบร้อยแล้ว!',
                    buttons: ['ตกลง']
                });
                alert.present();

            }).catch(err => {
                console.log('Error', err);
            });
    }

    // เพิ่มข้อมูล firebase
    createCheck(student_id): Promise<void> {
        const id = this.firestore.createId();
        const created_at = new Date();
        const smartRef = this.firestore.collection('smart_check').doc(this.course.name);
        const limit_time = new Date();
        let color = '';
        limit_time.setHours(this.course.time.slice(0, 2));
        limit_time.setMinutes(Number(this.course.time.slice(3, 5)) + Number(this.course.late));
        if (created_at > limit_time) {
            color = '#ff0000';
            return smartRef.collection(`historys`).doc(`${id}`).set({
                id: id,
                student_id: student_id,
                created_at: created_at,
                color: color
            });
        } else {
            color = '#18e018';
            return smartRef.collection(`historys`).doc(`${id}`).set({
                id: id,
                student_id: student_id,
                created_at: created_at,
                color: color
            });
        }


    }

}