import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string;
  avatarURL: string;

  constructor(public auth: AuthService) {
    this.name = auth.user.displayName;
    this.avatarURL = auth.user.photoURL;
  }

  ngOnInit() {
  }

}
