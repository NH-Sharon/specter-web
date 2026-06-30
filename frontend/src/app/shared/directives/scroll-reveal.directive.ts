import {
  Directive, ElementRef, Input, OnInit, OnDestroy, inject
} from '@angular/core';

@Directive({
  selector: '[reveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input('reveal') revealClass: string | undefined = '';
  @Input() revealDelay: number | string = 0;
  @Input() revealThreshold: number = 0.15;

  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    el.classList.add('reveal');
    if (this.revealClass) el.classList.add(this.revealClass);
    const delay = typeof this.revealDelay === 'string' ? parseInt(this.revealDelay, 10) : this.revealDelay;
    if (delay) el.style.transitionDelay = `${delay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          this.observer.unobserve(el);
        }
      },
      { threshold: this.revealThreshold, rootMargin: '0px 0px -60px 0px' }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
