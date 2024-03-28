import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {
  @ViewChild('slideContainer', { static: false }) slideContainer!: ElementRef<HTMLElement>;
  @ViewChild('textContainer', { static: false }) textContainer!: ElementRef<HTMLElement>;

  slides!: HTMLElement[];
  texts!: HTMLElement[];
  currentSlide = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.slides = Array.from(this.slideContainer.nativeElement.querySelectorAll('.slide'));
    this.texts = Array.from(this.textContainer.nativeElement.querySelectorAll('.text'));
    this.showNextSlide();
    setInterval(() => this.showNextSlide(), 8000);
  }

  showNextSlide(): void {
    if (this.slides && this.texts) {
      this.renderer.removeClass(this.slides[this.currentSlide], 'active');
      this.renderer.removeClass(this.texts[this.currentSlide], 'active');
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.renderer.addClass(this.slides[this.currentSlide], 'active');
      this.renderer.addClass(this.texts[this.currentSlide], 'active');
    }
  }
}
