import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Item } from '../../item';
import { DetailsRenderer } from '../../components/details-renderer/details-renderer';
/*
  Generated class for the CreatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/create/create.html',
  directives: [DetailsRenderer],
})
export class CreateItemPage implements OnInit {
  private item: Item;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.item = new Item();
    this.item.onChange(true, false);
  }

  ngOnInit() {

  }

  dismiss(success: boolean) {
    if (success) {
      let item = this.item;
      this.viewCtrl.dismiss(item);
    } else {
      this.viewCtrl.dismiss();
    }
  }

  addItem() {
    console.log(this.item);
    this.navParams.get('itemList').push(this.item);
    this.navCtrl.pop();
  }

}
