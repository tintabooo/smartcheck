import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';

import { ConditionPage } from '../choose/condition/condition';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AddsubjectPage } from '../addsubject/addsubject';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
    selector: 'page-choose',
    templateUrl: 'choose.html',
})
export class ChoosePage implements OnInit {
    public courses;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private firestore: AngularFirestore,
    ) { }

    ngOnInit() {
        this.courses = this.getSongList().valueChanges();
    }

    getSongList(): AngularFirestoreCollection {
        return this.firestore.collection(`smart_check`);
    }

    onClickCourse(name) {
        this.navCtrl.push(ConditionPage, { item: name });
    }
    goToAddsubject() {
        this.navCtrl.push(AddsubjectPage);
    }
    goToHome() {
        this.navCtrl.push(HomePage);
    }
}
