import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Tenth } from '../../pipes/tenth';
import { ItemService } from '../../providers/item-service/item-service';

@Component({
  templateUrl: 'build/pages/edit-factors/edit-factors.html',
  pipes: [Tenth],
})
export class EditFactorsPage {
  
  constructor(private navCtrl: NavController, private itemService: ItemService, public alertController: AlertController) {
    
  }

  addFactor() {
    this.itemService.addFactor();
  }

  editFactorName(index:number) {
    let prompt = this.alertController.create({
      title: 'Ändere Faktor Name',
      message: "Neuer Name für Faktor zur Auswahl im Rechner (z.B. morgens, zwischendurch, o.ä.)",
      inputs: [
        {
          name: 'Name',
          placeholder: 'neu'
        },
      ],
      buttons: [
        {
          text: 'Zurück',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.itemService.changeFactorName(index, data['Name']);
          }
        }
      ]
    });
    prompt.present();
  }

}
