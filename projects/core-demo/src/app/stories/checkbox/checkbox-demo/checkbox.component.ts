import {Component} from '@angular/core';

@Component({
  selector: 'app-checkbox-demo',
  templateUrl: './checkbox-demo.component.html',
  styleUrls: ['./checkbox-demo.component.scss']
})
export class CheckboxDemoComponent {
  selected1 = false;
  selected2 = true;
  selected3 = false;
  disabled = true;

  getTitle(isChecked: boolean) {
    return isChecked ? 'checked' : 'unchecked';
  }
}
