import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})
export class LogoComponent {
  /** 'light' = on white/light bg (navbar)  |  'dark' = on dark bg (footer, hero, admin) */
  @Input() theme: 'light' | 'dark' = 'light';
  /** 'sm' = sidebar collapsed  |  'md' = default  |  'lg' = hero */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
