import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public isValidate = false;
  constructor(private route:Router) { }

  getValidate() { return this.isValidate; }
  setValidate(val: boolean) { this.isValidate = val}
  validateSesson() { 
    console.log(this.getValidate());
    
    if (this.getValidate()) {
      console.log(this.getValidate() + 'asd');
      
      this.route.navigate(['/home']);
    } else {
      this.route.navigate(['/login']);
    }
    
  }
}
