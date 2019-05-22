import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';

import { ConditionPage } from '../choose/condition/condition';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ConcludePage } from '../conclude/conclude';



@IonicPage()
@Component({
    selector: 'page-concludesubject',
    templateUrl: 'concludesubject.html',
})
export class ConcludesubjectPage implements OnInit {
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

    goToConclude(name) {
        this.navCtrl.push(ConcludePage, { item: name });
    }
}
