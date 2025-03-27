import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeatureFlagsComponent } from './feature-flags/feature-flags.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },         
  { path: 'dashboard', component: FeatureFlagsComponent, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: '/login' }               
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
