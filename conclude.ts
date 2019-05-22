import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@IonicPage()
@Component({
    selector: 'page-conclude',
    templateUrl: 'conclude.html',
})
export class ConcludePage {

    public checks;
    private courseName;
    private inputDate;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private firestore: AngularFirestore,
    ) {
        this.courseName = this.navParams.get('item');
        this.checks = this.getSongList();
    }

    getSongList() {
        const smartRef = this.firestore.collection(`smart_check`).doc(this.courseName);
        return smartRef.collection("historys").valueChanges();
    };

    onChangeDate() {
        let start = new Date(this.inputDate + 'T00:00');
        let end = new Date(this.inputDate + 'T23:59');
        const smartRef = this.firestore.collection(`smart_check`).doc(this.courseName);
        this.checks =  smartRef.collection("historys", ref => ref
            .where('created_at', '>=', start)
            .where('created_at', '<=', end)
        ).valueChanges();
        return true;
    }
}
