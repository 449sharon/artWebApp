import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.page.html',
  styleUrls: ['./specials.page.scss'],
})
export class SpecialsPage implements OnInit {

  db = firebase.firestore();
  Sales = [];
  myProduct: boolean;
  event = {
    id: '',
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    small:'',
    medium:'',
    large: ''
  };
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    let obj = {id : '', obj : {}};
    this.db.collection('sales').get().then(snapshot => {
      this.Sales = [];
      if (snapshot.empty) {
              this.myProduct = false;
            } else {
              this.myProduct = true;
              snapshot.forEach(doc => {
                obj.id = doc.id;
                obj.obj = doc.data();
                this.Sales.push(obj);
                obj = {id : '', obj : {}};
                console.log("herererer", this.Sales);
              });
              return this.Sales;
            }
    });
  }
}
