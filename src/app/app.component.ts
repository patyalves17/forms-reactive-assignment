import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { reject } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projetForm: FormGroup;

  ngOnInit() {
    this.projetForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.validadeProjetName], this.AsyncValidadeProjetName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('finished'),

    });
  }

  onSubmit() {
    console.log(this.projetForm);
  }


  validadeProjetName(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return { 'namesIsForbidden': true };
    }
    return null;
  }

  AsyncValidadeProjetName(control: FormControl ) : Promise<any> | Observable<any> {
    const promise = new Promise((resolve,reject) => {
      setTimeout(() => {
        if(control.value === 'paty' ){
          resolve( { 'namesIsForbidden': true } );
        }
        resolve(null);
      }, 1500);
    });

    return promise;

  }
}
