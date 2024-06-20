import { Component, ElementRef, ViewEncapsulation, inject } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    class: 'button',
    '(click)': 'onClick()'
  }
})
export class ButtonComponent {
  private ele = inject(ElementRef);
  onClick() {
    console.log(this.ele.nativeElement.innerText);
  }
}
