import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';

import { ConditionPage } from '../choose/condition/condition';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ConcludePage } from '../conclude/conclude';
import { HomePage } from '../home/home';
import { CheckPage } from '../check/check';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-choosecheck',
    templateUrl: 'choosecheck.html',
})
export class ChoosecheckPage implements OnInit {
    public courses;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private firestore: AngularFirestore,
        public loadingCtrl: LoadingController,
    ) { }

    presentLoading() {
        const loader = this.loadingCtrl.create({
            content: "กรุณารอสักครู่...",
            duration: 500
        });
        loader.present();
    }

    ngOnInit() {
        this.courses = this.getSongList().valueChanges();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChoosePage');
    }

    getSongList(): AngularFirestoreCollection {
        return this.firestore.collection(`smart_check`);
    }

    onClickCourse(id) {
        this.navCtrl.push(ConditionPage, { item: id });
    }
    goToConclude() {
        this.navCtrl.push(ConcludePage);
    }
    goToHome() {
        this.navCtrl.push(HomePage);
    }
    goToCheck(data) {
        this.navCtrl.push(CheckPage, { item: data });
    }
}
