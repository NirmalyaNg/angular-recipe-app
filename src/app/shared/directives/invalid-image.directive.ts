import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInvalidImage]',
})
export class InvalidImageDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('error', ['$event']) handleError(event: Event) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'src',
      '../../../../assets/images/default-recipe.png'
    );
  }
}
