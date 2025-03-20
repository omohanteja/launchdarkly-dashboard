import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchdarklyService {

  private baseUrl = 'https://app.launchdarkly.com/api/v2/flags';
  private projectKey = 'property-ware';
  private headers = new HttpHeaders({
    'Authorization': 'api-2b78bb16-9d30-4dd7-8a54-29fbc1f61daf',
    'Content-Type': 'application/json'
  });

  private semanticHeaders = new HttpHeaders({
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

  addTargetToFlag(featureFlagKey: string, target: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, { patch: [target] }, { headers: this.headers });
  }

  createFeatureFlag(flagData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.projectKey}`, flagData, { headers: this.headers });
  }

  removeTarget(featureFlagKey: string, targetValues: string[], variationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, {
      environmentKey: 'test',
      instructions: [{ kind: 'removeTargets', values: targetValues, variationId: variationId }]
    }, { headers: this.semanticHeaders });
  }

  clearAllTargets(featureFlagKey: string, variationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, {
      environmentKey: 'test',
      instructions: [{ kind: 'clearTargets', variationId: variationId }]
    }, { headers: this.semanticHeaders });
  }

  deleteFeatureFlag(featureFlagKey: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.projectKey}/${featureFlagKey}`, { headers: this.headers });
  }
}
