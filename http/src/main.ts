import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

   // const copyReq = req.clone({
   //    headers: req.headers.set('X_DEBUG', 'TESTING')
   // });

   console.log(req.urlWithParams);
   if (req.method == 'PUT') {
      console.log(req.body);
   }
   return next(req);
}

bootstrapApplication(AppComponent, {
   providers: [provideHttpClient(
      withInterceptors([loggingInterceptor])
   )]
}).catch((err) => console.error(err));
