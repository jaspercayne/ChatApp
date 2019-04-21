import { Component, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OrgChat';
  items: Observable<any>;
  name: any;
  isLoggedIn: boolean;

  constructor(public db: AngularFirestore, public auth: AuthService) {
    this.items = db.collection('/messages').valueChanges();
    this.isLoggedIn = auth.isLoggedIn;
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
    this.name = this.auth.user.displayName;
  }
  logout() {
    this.auth.logout();
    this.name = null;
  }

  get getLoggedInUsername() {
    return this.name;
  }
}
