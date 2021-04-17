import { Component } from '@angular/core';
import { SplashScreenPlugin, StatusBarPlugin } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform:Platform,
    private splashscreen:SplashScreenPlugin,
    private statusbar:StatusBarPlugin,
    private fcmservice:FcmService
  ) {
    this.initializeApp();

  }
  initializeApp(){
    this.platform.ready().then(()=>{
      this.statusbar.setStyle;
      this.splashscreen.hide();

    this.fcmservice.initPush();
    });
  }
}
