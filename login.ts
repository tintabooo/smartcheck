import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChoosePage } from '../choose/choose';
import { AuthenticateService } from '../../providers/auth/authentication.service';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    username: string;
    password: string;
    message: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private authService: AuthenticateService,
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    // เข้าระบบ
    onLogin() {
        if (!this.username || !this.password) {
            return this.message = 'กรุณากรอกข้อมูลผู้ใช้และรหัสผ่าน'
        }
        this.authService.login(this.username, this.password)
            .then(res => {
                this.navCtrl.setRoot(HomePage);
            }).catch(err => {
                this.message = 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'
            })
    }

}
