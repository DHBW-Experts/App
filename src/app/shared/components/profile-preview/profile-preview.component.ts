import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss'],
})
export class ProfilePreviewComponent implements OnInit {
  @Input() public user: any;

  constructor() {}

  ngOnInit() {}
}