import { Component, OnInit } from '@angular/core';
import { TokenTimerService } from './token-timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'LaunchDarkly - Feature Flag';

  constructor(private tokenTimerService: TokenTimerService) {}

  ngOnInit(): void {
    const tokenExpiry = parseInt(localStorage.getItem('authTokenExpiry') || '0', 10);

    if (tokenExpiry) {
      this.tokenTimerService.startTokenTimer(tokenExpiry);
    }
  }

}
