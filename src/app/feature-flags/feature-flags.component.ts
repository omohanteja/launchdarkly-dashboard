import { Component } from '@angular/core';
import { LaunchdarklyService } from '../launchdarkly.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-flags',
  standalone: false,
  templateUrl: './feature-flags.component.html',
  styleUrl: './feature-flags.component.css'
})
export class FeatureFlagsComponent {
  
  featureFlagKey: string = '';
  flagStatus: any;
  newFlagData = { name: '', key: '', description: '' };
  targetData: string = '';
  removeTargetValues: string = '';
  isFlagEnabled: boolean = false;
  flagDefaultRule: boolean = false;
  targetFeatureFlagKey: string = '';
  isLoading = false; 

  trueVariationId: string = '';
  falseVariationId: string = '';

  constructor(private launchDarklyService: LaunchdarklyService, private router: Router) {}

  getFlagStatus() {
    this.isLoading = true; 
    this.launchDarklyService.getFlagStatus(this.featureFlagKey).subscribe(
      (data) => {
        this.flagStatus = data;
        this.isFlagEnabled = data.environments.test.on;
        this.flagDefaultRule = (this.isFlagEnabled) ? ((data.environments.test.fallthrough.variation == 0) ? true : false) : false;
        this.trueVariationId = data.variations[0]._id;
        this.falseVariationId = data.variations[1]._id;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        alert("Try again. Error while getting flag status - " + this.featureFlagKey);
        this.trueVariationId = '';
        this.flagDefaultRule = false;
        this.isFlagEnabled = false;
        this.flagStatus = false;
        this.isLoading = false;
      }
    );  
  }

  toggleFlag() {
    this.launchDarklyService.updateFlag(this.featureFlagKey, this.isFlagEnabled).subscribe(
      () => {
        alert(this.featureFlagKey + 'Flag toggled successfully!');
        this.getFlagStatus();
      },
      (error) => {
        this.isFlagEnabled = false;
        console.error(error);
        alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');
      }
    );
  }

  toggleDefaultRule(){
   var tempVariation = this.flagDefaultRule ? this.trueVariationId : this.falseVariationId;
    this.launchDarklyService.toggleDefaultRule(this.featureFlagKey, tempVariation).subscribe(
      () => {
        alert(this.featureFlagKey + 'Default Rule Changed successfully!');
        this.getFlagStatus();
      },
      (error) => {
        this.isFlagEnabled = false;
        this.flagDefaultRule = false;
        console.error(error);
        alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');
      }
    );
  }

  createFeatureFlag() {
    this.isLoading = true; 
    this.launchDarklyService.createFeatureFlag(this.newFlagData).subscribe(
      () => {
        alert('Feature flag created successfully!');
        this.isLoading = false;
        this.newFlagData = { name: '', key: '', description: '' };
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        alert("Try again. Error while Creating Feature flag. Check Logs.");
      }
    );
  }

  addTargetToFlag() {
    this.launchDarklyService.getFlagStatus(this.featureFlagKey).subscribe(
      (data) => {
        if(!data.environments.test.on){
          alert('Flag is Not Enabled. Kindly enable the flag first!');
        } else {
          this.launchDarklyService.addTargetToFlag(this.featureFlagKey, this.targetData, data.variations[0]._id, data.variations[1]._id).subscribe(
            () => {
              alert('Target added successfully!');
              this.targetData = '';
              this.targetFeatureFlagKey = '';
            },
            (error) => {console.error(error);
            alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');}
          );      
        }
      },
      (error) => {
        console.error(error);
        alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');
      }
    ); 
  }

  removeTarget() {
    this.launchDarklyService.getFlagStatus(this.featureFlagKey).subscribe(
      (data) => {
        if(!data.environments.test.on){
          alert('Flag is Not Enabled. Kindly enable the flag first!');
        } else {
          this.launchDarklyService.removeTarget(this.featureFlagKey, this.removeTargetValues, data.variations[0]._id).subscribe(
            () => {
              alert('Target removed successfully!');
              this.removeTargetValues = '';
              this.targetFeatureFlagKey = '';
            },
            (error) => {
              console.error(error);
            alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');}
          );      
        }
      },
      (error) => {
        console.error(error);
        alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');
      }
    );
  }

  clearAllTargets() {
    this.launchDarklyService.getFlagStatus(this.featureFlagKey).subscribe(
      (data) => {
        this.launchDarklyService.clearAllTargets(this.featureFlagKey, data.variations[0]._id, data.variations[1]._id).subscribe(
          () => {
            alert('All targets cleared successfully!');
            this.targetFeatureFlagKey = '';
          },
          (error) => {console.error(error);
            alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');
          }
        );      
      },
      (error) => {
        console.error(error);
        alert('Invalid Flag. Kindly check the flag created or not. If not create the flag first!');
      }
    ); 

  }

  deleteFeatureFlag() {
    this.launchDarklyService.deleteFeatureFlag(this.featureFlagKey).subscribe(
      () => alert('Feature flag deleted successfully!'),
      (error) => console.error(error)
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
