import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(msg: string) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}]: ${msg}`);
  }
}
