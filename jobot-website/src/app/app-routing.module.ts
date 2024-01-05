import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' } // Redirect all unknown routes to the landing page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
