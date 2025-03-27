import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LaunchdarklyService } from './launchdarkly.service';
import { FeatureFlagsComponent } from './feature-flags/feature-flags.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, FeatureFlagsComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, MatSlideToggleModule, MatTabGroup, MatTab, 
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatCardModule,
    MatIcon
  ],
  providers: [LaunchdarklyService],
  bootstrap: [AppComponent],
})
export class AppModule { }
