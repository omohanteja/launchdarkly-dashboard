import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenTimerService } from '../token-timer.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private tokenTimerService: TokenTimerService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
    
      if (username === 'admin' && password === 'launchdarkly') {
        const expirationTime = new Date().getTime() + 15 * 60 * 1000;
        localStorage.setItem('authToken', 'launchDarklyLoginToken'); 
        localStorage.setItem('authTokenExpiry', expirationTime.toString());
        // Start the centralized timer
        this.tokenTimerService.startTokenTimer(expirationTime);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    }
  }
}
