import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {
    this.router.navigate(["/"]);
  }
}
