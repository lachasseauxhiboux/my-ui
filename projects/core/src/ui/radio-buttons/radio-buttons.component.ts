import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

type Layout = 'horizontal' | 'vertical';

@Component({
  selector: 'my-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsComponent {
  private static index = 0;

  @Input()
  name = `my-radio-group-${RadioButtonsComponent.index++}`;

  @HostBinding('class')
  @Input()
  layout: Layout = 'vertical';
}
