import {
   HttpEvent,
   HttpEventType,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
 } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable, tap } from 'rxjs';
  
 @Injectable()
 export class LoggingInterceptor implements HttpInterceptor {
   intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {
   // const copyReq = req.clone({
   //    headers: req.headers.set('X_DEBUG', 'TESTING')
   // });
     console.log('Request URL: ' , req.url);
     if (req.method == 'PUT') {
        console.log('PUT body:', req.body);
     }
     return handler.handle(req)
     .pipe(
      tap({
         next: event => {
            if (event.type === HttpEventType.Response) {
               console.log('incoming response status', event.status);
               console.log('incoming response body', event.body);
            }
         }
      })
     );
   }
 }