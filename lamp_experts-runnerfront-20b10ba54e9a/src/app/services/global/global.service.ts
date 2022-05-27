import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  resetForm(form: FormGroup) {

      form.reset();

      Object.keys(form.controls).forEach(key => {
        form.get(key).setErrors(null) ;
      });
  }
}
