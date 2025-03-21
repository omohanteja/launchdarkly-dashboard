import { Component } from '@angular/core';
import { LaunchdarklyService } from '../launchdarkly.service';

@Component({
  selector: 'app-feature-flags',
  standalone: false,
  templateUrl: './feature-flags.component.html',
  styleUrl: './feature-flags.component.css'
})
export class FeatureFlagsComponent {
  variationId: string = '';
  removeTargetVariationId: string = '';
  featureFlagKey: string = '';
  flagStatus: any;
  newFlagData = { name: '', key: '', description: '' };
  targetData = { variation: 0, values: [''] };
  removeTargetValues = [''];
  isFlagEnabled: boolean = false;

  constructor(private launchDarklyService: LaunchdarklyService) {}

  getFlagStatus() {
    this.launchDarklyService.getFlagStatus(this.featureFlagKey).subscribe(
      (data) => {
        this.flagStatus = data;
        this.isFlagEnabled = data.environments.test.on;
      },
      (error) => (this.flagStatus = false,console.error(error))
    );
  }

  toggleFlag() {
    this.launchDarklyService.updateFlag(this.featureFlagKey, this.isFlagEnabled).subscribe(
      () => {
        alert('Flag toggled successfully!');
        this.getFlagStatus();
      },
      (error) => console.error(error)
    );
  }

  createFeatureFlag() {
    this.launchDarklyService.createFeatureFlag(this.newFlagData).subscribe(
      () => {
        alert('Feature flag created successfully!');
        this.newFlagData = { name: '', key: '', description: '' };
      },
      (error) => console.error(error)
    );
  }

  addTargetToFlag() {
    const patch = { op: 'add', path: '/environments/test/targets/-', value: this.targetData };
    this.launchDarklyService.addTargetToFlag(this.featureFlagKey, patch).subscribe(
      () => {alert('Target added successfully!');
        this.targetData = { variation: 0, values: [''] };
        this.getFlagStatus();
      },
      (error) => console.error(error)
    );
  }

  removeTarget() {
    this.launchDarklyService.removeTarget(this.featureFlagKey, this.removeTargetValues, this.removeTargetVariationId).subscribe(
      () => {
        alert(this.removeTargetValues + ' Target removed successfully!');
        this.removeTargetVariationId = '';
        this.getFlagStatus();
      },
      (error) => console.error(error)
    );
  }

  clearAllTargets() {
    this.launchDarklyService.clearAllTargets(this.featureFlagKey, this.variationId).subscribe(
      () => {
        alert('All targets cleared successfully!');
        this.variationId = '';
        this.getFlagStatus();
      },
      (error) => console.error(error)
    );
  }

  deleteFeatureFlag() {
    this.launchDarklyService.deleteFeatureFlag(this.featureFlagKey).subscribe(
      () => alert('Feature flag deleted successfully!'),
      (error) => console.error(error)
    );
  }
}
