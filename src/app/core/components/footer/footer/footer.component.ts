import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Add event listener to the subscribe button
    this.renderer.listen('window', 'DOMContentLoaded', () => {
      const subscribeBtn = this.elementRef.nativeElement.querySelector('.footerbutton');
      const emailInput = this.elementRef.nativeElement.querySelector('.emailinput');

      subscribeBtn.addEventListener('click', () => {
        alert('Thank you for joining our beautiful community! We will sent you an email.');
        emailInput.value = ''; 
      });
    });
  }

}
