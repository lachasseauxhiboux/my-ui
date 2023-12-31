import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'action-buttons',
    loadChildren: () =>
      import('./stories/action-buttons/action-buttons-demo.module').then(m => m.ActionButtonsDemoModule),
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./stories/checkbox/checkbox-demo.module').then(m => m.CheckboxDemoModule),
  },
  {
    path: 'icon-buttons',
    loadChildren: () => import('./stories/icon-buttons/icon-buttons-demo.module').then(m => m.IconButtonsDemoModule),
  },
  {
    path: 'input',
    loadChildren: () => import('./stories/input/input-demo.module').then(m => m.InputDemoModule),
  },
  {
    path: 'link-buttons',
    loadChildren: () => import('./stories/link-buttons/link-buttons-demo.module').then(m => m.LinkButtonsDemoModule),
  },
  {
    path: 'radio-buttons',
    loadChildren: () => import('./stories/radio-buttons/radio-buttons-demo.module').then(m => m.RadioButtonsDemoModule),
  },
  {
    path: 'round-buttons',
    loadChildren: () => import('./stories/round-buttons/round-buttons-demo.module').then(m => m.RoundButtonsDemoModule),
  },

  {
    path: 'standard-buttons',
    loadChildren: () =>
      import('./stories/standard-buttons/standard-buttons-demo.module').then(m => m.StandardButtonsDemoModule),
  },
  {
    path: 'typography',
    loadChildren: () => import('./stories/typography/typography-demo.module').then(m => m.TypographyDemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
