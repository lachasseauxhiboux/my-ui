import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'action-buttons',
    loadChildren: () => import('./stories/action-buttons/action-buttons-demo.module').then(m => m.ActionButtonsDemoModule),
  },
  {
    path: 'buttons',
    loadChildren: () => import('./stories/buttons/buttons-demo.module').then(m => m.ButtonsDemoModule),
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
