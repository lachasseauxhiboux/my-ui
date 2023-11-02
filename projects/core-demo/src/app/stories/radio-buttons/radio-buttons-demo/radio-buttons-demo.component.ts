import {Component} from '@angular/core';

@Component({
  templateUrl: './radio-buttons-demo.component.html',
  selector: 'app-radio-buttons-demo',
  styleUrls: ['./radio-buttons-demo.component.scss']
})
export class RadioButtonsDemoComponent {
  selectedItem = 'Pizza';
  items = [
    'Sushi', 'Pizza', 'Wok'
  ];
}
