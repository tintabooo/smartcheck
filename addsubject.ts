import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-addsubject',
    templateUrl: 'addsubject.html',
    providers: [FormBuilder]
})
export class AddsubjectPage {

    private course: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private builder: FormBuilder,
        private firestore: AngularFirestore,
        public alertCtrl: AlertController,
    ) {
        this.initializeLoadFormData();
    }

    // โหลดข้อมูลฟอร์ม
    private initializeLoadFormData() {
        this.course = this.builder.group({
            course_name: ['', Validators.required],
            course_no: ['', Validators.required],
            course_room: ['', Validators.required],
            course_starttime: ['', Validators.required],
            course_timecheck: ['', Validators.required]
        });
    }

    // ย้ายหน้า
    goToChoose() {
        this.createCourse()
            .then(res => {
                this.navCtrl.pop();
            }).catch(err => {
                console.error(err);
            });
    }

    // เพิ่มวิชาใหม่
    createCourse() {
        return new Promise((resolve, reject) => {
            if (this.course.invalid) {
                const alert = this.alertCtrl.create({
                    title: 'กรุณากรอกข้อมูลให้ครบ!',
                    buttons: ['ตกลง']
                });
                alert.present();
                return reject('Course Invalid !!');
            }
            const id = this.firestore.createId();
            const created_at = new Date;
            const name = this.course.value.course_name;
            const org = this.course.value.course_no;
            const room = this.course.value.course_room;
            const time = this.course.value.course_starttime;
            const late = this.course.value.course_timecheck;

            const smartRef = this.firestore.collection('smart_check').doc(name);
            resolve(smartRef.set({
                id,
                name,
                org,
                room,
                time,
                late,
                created_at
            }));
        })
    }

}
