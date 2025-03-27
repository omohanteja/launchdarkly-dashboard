import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchdarklyService {

  private baseUrl = 'https://app.launchdarkly.com/api/v2/flags';
  private projectKey = 'property-ware';
  //private projectKey = 'default';
  private headers = new HttpHeaders({
    'Authorization': 'api-2b78bb16-9d30-4dd7-8a54-29fbc1f61daf',
    //'Authorization': 'api-fd828d8d-efa8-4cf7-906f-dfe6fdc4a49f',
    'Content-Type': 'application/json'
  });

  private semanticHeaders = new HttpHeaders({
    //'Authorization': 'api-fd828d8d-efa8-4cf7-906f-dfe6fdc4a49f',
    'Authorization': 'api-2b78bb16-9d30-4dd7-8a54-29fbc1f61daf',
    'Content-Type': 'application/json; domain-model=launchdarkly.semanticpatch'
  });

  constructor(private http: HttpClient) {}

  getFlagStatus(featureFlagKey: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, { headers: this.headers });
  }

  updateFlag(featureFlagKey: string, isFlagEnabled: boolean): Observable<any> {
    const patch = [ {op: 'replace', path: '/environments/test/on', value: isFlagEnabled }]
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, { patch }, { headers: this.headers });
  }

  addTargetToFlag(featureFlagKey: string, target: string, trueVariationId: string, disabledVariationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, {
      environmentKey: 'test',
      instructions: [{ kind: 'addTargets', contextKind:'user', values: [target], variationId: trueVariationId },
        { kind: 'updateFallthroughVariationOrRollout',variationId: disabledVariationId}]}, 
      { headers: this.semanticHeaders });
  }

  createFeatureFlag(flagData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.projectKey}`, flagData, { headers: this.headers });
  }

  removeTarget(featureFlagKey: string, targetValues: string, variationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, {
      environmentKey: 'test',
      instructions: [{ kind: 'removeTargets', contextKind:'user',values: [targetValues], variationId: variationId }]
    }, { headers: this.semanticHeaders });
  }

  clearAllTargets(featureFlagKey: string, variationId: string, disabledVariationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, {
      environmentKey: 'test',
      instructions: [{ kind: 'clearUserTargets',contextKind:'user', variationId: variationId},
        { kind: 'clearUserTargets',contextKind:'user', variationId: disabledVariationId},
        { kind: 'updateFallthroughVariationOrRollout',variationId: variationId}],
    }, { headers: this.semanticHeaders });
  }

  deleteFeatureFlag(featureFlagKey: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, { headers: this.headers });
  }

  toggleDefaultRule(featureFlagKey: string, variationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, {
      environmentKey: 'test',
      instructions: [{ kind: 'updateFallthroughVariationOrRollout',variationId: variationId}],
    }, { headers: this.semanticHeaders });
  }
}
