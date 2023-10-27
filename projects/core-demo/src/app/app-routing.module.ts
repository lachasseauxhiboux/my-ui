import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'action-buttons',
    loadChildren: () => import('./stories/action-buttons/action-buttons-demo.module').then(m => m.ActionButtonsDemoModule),
  },
  {
    path: 'icon-buttons',
    loadChildren: () => import('./stories/icon-buttons/icon-buttons-demo.module').then(m => m.IconButtonsDemoModule),
  },
  {
    path: 'link-buttons',
    loadChildren: () => import('./stories/link-buttons/link-buttons-demo.module').then(m => m.LinkButtonsDemoModule),
  },
  {
    path: 'standard-buttons',
    loadChildren: () => import('./stories/standard-buttons/standard-buttons-demo.module').then(m => m.StandardButtonsDemoModule),
  },
  {
    path: 'input',
    loadChildren: () => import('./stories/input/input-demo.module').then(m => m.InputDemoModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
