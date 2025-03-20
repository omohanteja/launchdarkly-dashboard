import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LaunchdarklyService } from './launchdarkly.service';
import { FeatureFlagsComponent } from './feature-flags/feature-flags.component';

@NgModule({
  declarations: [AppComponent, FeatureFlagsComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [LaunchdarklyService],
  bootstrap: [AppComponent],
})
export class AppModule { }
