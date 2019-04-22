import { Component, OnInit } from '@angular/core';
import { AngularFirestore, Query, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { EncryptionService } from 'src/app/shared/encryption.service';
import { Message } from 'src/app/shared/message.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  items: Observable<any>;
  name;
  msgVal = '';

  constructor(public db: AngularFirestore, private auth: AuthService, public crypto: EncryptionService, private app: AppComponent) {
    this.items = db.collection('/messages', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
    this.name = this.app.name;
  }

  ngOnInit() { }

  chatSend(theirMessage: Message) {
    console.log('Sending user: ' + this.name);
    console.log('Message: ' + theirMessage);
    if (this.name !== null) {
      this.db.collection('messages').add({
        name: this.crypto.encryptData(this.name),
        msg: this.crypto.encryptData(theirMessage),
        timestamp: + new Date(),
        avatar: this.auth.user.photoURL
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
      this.msgVal = '';
    } else {
      console.log('No logged in user!');
    }
  }

  decryptMessage(downloadedMessage: Message) {
    return this.crypto.decryptData(downloadedMessage);
  }
}

