import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit():void {
    const queryParams = this.route.snapshot.queryParamMap;
    console.log(queryParams);
    
    if (
      queryParams.has('state') &&
      (queryParams.has('error') || queryParams.has('code'))
    ) {
      this.auth
        .handleRedirectCallback(this.route.snapshot.url.join(''))
        .pipe(mergeMap(() => Browser.close()))
        .subscribe();
    } else {
      this.router.navigate(["/"]);
      Browser.close()
    }
}

}
