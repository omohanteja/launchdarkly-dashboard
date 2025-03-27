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

@NgModule({
  declarations: [AppComponent, FeatureFlagsComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, MatSlideToggleModule, MatTabGroup, MatTab, MatProgressSpinnerModule],
  providers: [LaunchdarklyService],
  bootstrap: [AppComponent],
})
export class AppModule { }
