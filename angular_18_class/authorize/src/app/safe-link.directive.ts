import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
   selector: 'a[appSafeLink]',
   standalone: true,
   host: {
      '(click)': 'onConfirmLeave($event)'
   }
})
export class SafeLinkDirective {
   queryParam = input('myapp', { alias: 'appSafeLink'});
   private hostEleRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
   constructor() {
      console.log('safe link');
   }

   onConfirmLeave(event: MouseEvent) {
      console.log('safe link clicked');
      const wantsToLeave = window.confirm('Do you want to leave?');
      if (wantsToLeave) {
         const address = this.hostEleRef.nativeElement.href;
         this.hostEleRef.nativeElement.href = address + '?from=' + this.queryParam();
         return;
      }
      event.preventDefault();
   }

}