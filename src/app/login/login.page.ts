import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;

  public validationMessages: Object;
  private email ='pedro.avila@gmail.com';
  private password ='12345';


  constructor( private fb: FormBuilder,private toastController: ToastController, private route:Router, private validate:SessionService) {
    if (this.validate.getValidate()) {
      this.route.navigate(['/home']);
      return;
    } 
   }

  ngOnInit() {
     this.myForm = this.fb.group(
      {
        email: ["", Validators.compose([Validators.required, Validators.email])],
        password: ["", Validators.compose([Validators.required])],
      });

        this.validationMessages = { 
      password: [
        { type: 'required', message: 'Contraseña obligatoria' }
      ],
      email: [
        { type: 'required', message: 'Correo electrónico obligatorio'},
        { type: 'email', message: 'Revise que su correo esté bien escrito'}
      ]
    }
    if (this.validate.getValidate()) {
      this.route.navigate(['/home']);
      return;
    } 
  }

  submitForm() {
    if (this.myForm.get('password').value ==='' || this.myForm.get('email').value ===''){
      this.showToast('Por favor llene todos los campos disponibles');
      return;
    }
    if (this.myForm.get('password').value === this.password && this.myForm.get('email').value === this.email){
      this.showToast('Sesión iniciada: Bienvenido Pedro Avila','primary');
      this.validate.setValidate(true);
      this.route.navigate(['/home']);
      return;
    }
    this.showToast('Error al iniciar sesión, correo y/o constraeña incorrectos');
  }
  async showToast(message:string, color: 'primary' | 'danger' =  'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: color
    });

    await toast.present();
  }

}
