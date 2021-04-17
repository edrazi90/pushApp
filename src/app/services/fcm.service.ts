import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import{
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor,
  Permissions
}from '@capacitor/core'

const{PushNotifications}=Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router:Router) { }

  initPush(){
    if(Capacitor.platform!='web'){
      this.registerPush();
    }

  }

  private registerPush(){
    PushNotifications.requestPermission().then((permission)=>{

      if(permission.granted){
        PushNotifications.register();
      }else{
        //
      }
    });

    PushNotifications.addListener(
      'registration',
      (token:PushNotificationToken)=>{
        console.log('myToken='+JSON.stringify(error));
      }
    );

    PushNotifications.addListener('registrationError',(error:any)=>{
      console.log('My Token:' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async(notification:PushNotification)=>{
        console.log('Push received'+JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async(notification:PushNotificationActionPerformed)=>{
        const data=notification.notification.data;
        console.log('Action performed'+JSON.stringify(notification.notification));
        if(data.detailsId){
          this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );

  }
}
