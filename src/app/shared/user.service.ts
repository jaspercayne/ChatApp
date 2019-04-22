import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore) { }

  getAvatars() {
    return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value: User) {
    return this.db.collection('users').doc(value.uid).set({
      name: value.displayName,
      avatar: value.photoURL
    });
  }
}
