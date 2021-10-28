import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };
  showError = false;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authSrv.loggedIn()) {
      this.router.navigate(['/panel']);
    }
  }

  onSubmit() {
    this.authSrv.signIn(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
      },
      (err) => {
        this.showError = true;
      },
      () => {
        this.router.navigate(['/panel']);
      }
    );
  }
}
