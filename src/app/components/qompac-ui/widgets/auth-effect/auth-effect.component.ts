import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-effect',
  templateUrl: './auth-effect.component.html',
  styles: [
  ]
})
export class AuthEffectComponent implements OnInit {
  @Input() appName! : string;

  constructor() { }

  ngOnInit(): void {
  }

}
