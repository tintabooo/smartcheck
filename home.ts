import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChoosePage } from '../choose/choose';
import { CheckPage } from '../check/check';
import { ConcludePage } from '../conclude/conclude';
import { ReportPage } from '../report/report';
import { ConditionPage } from '../choose/condition/condition';
import { LoginPage } from '../login/login';
import { ConcludesubjectPage } from '../concludesubject/concludesubject';
import { ChoosecheckPage } from '../choosecheck/choosecheck';
import { LoadingController } from 'ionic-angular';



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
    ) { }

    presentLoading() {
        const loader = this.loadingCtrl.create({
            content: "กรุณารอสักครู่...",
            duration: 500
        });
        loader.present();
    }

    goToChoose() {
        this.navCtrl.push(ChoosePage);
    }
    goToCheck() {
        this.navCtrl.push(CheckPage);
    }
    goToConcludePage() {
        this.navCtrl.push(ConcludePage);
    }
    goToReportPage() {
        this.navCtrl.push(ReportPage);
    }
    goToConditionPage() {
        this.navCtrl.push(ConditionPage);
    }
    onLogout() {
        this.navCtrl.setRoot(LoginPage);
    }
    goToConcludesubject() {
        this.navCtrl.push(ConcludesubjectPage);
    }
    goToChoosecheck() {
        this.navCtrl.push(ChoosecheckPage);
    }
}
