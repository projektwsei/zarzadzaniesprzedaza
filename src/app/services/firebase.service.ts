import { Injectable } from '@angular/core';
import * as firebase from "firebase";


@Injectable()
export class FirebaseService {

    constructor() {

        let config = {
            apiKey: "AIzaSyDl80S6ZmbRNJaM1_B3jupNsF_CI_Bs4RI",
            authDomain: "projektwsei-59f5e.firebaseapp.com",
            databaseURL: "https://projektwsei-59f5e.firebaseio.com",
            projectId: "projektwsei-59f5e",
            storageBucket: "projektwsei-59f5e.appspot.com",
            messagingSenderId: "179583660561"
        };

        firebase.initializeApp(config);
        
    }

    public auth(){
        return firebase.auth();
    }

    public db(){
        return firebase.database();
    }

    public getGoogleAuthProvider(){
        return new firebase.auth.GoogleAuthProvider();
    }


}
