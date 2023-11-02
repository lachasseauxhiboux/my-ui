import { Component } from '@angular/core';

@Component({
  selector: 'app-link-buttons-demo',
  templateUrl: './link-buttons-demo.component.html',
  styleUrls: ['./link-buttons-demo.component.scss'],
})
export class LinkButtonsDemoComponent {
  onClick() {
    alert('clicked');
  }
}
