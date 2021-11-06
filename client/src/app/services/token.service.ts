import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, next: any) {
    //Another method for service injection
    let authSrv = this.injector.get(AuthService);

    if (req.url.includes('google')) {
      return next.handle(req);
    } else {
      let tokenizedReq = req.clone({
        setHeaders: {
          authorization: `Bearer ${authSrv.getToken()}`,
        },
      });
      return next.handle(tokenizedReq);
    }
  }
}
