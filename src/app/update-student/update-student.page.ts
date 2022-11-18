import { Component, OnInit } from '@angular/core';
import { StudentService } from './../services/student.service';
import { Student } from './../models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  public student:Student = new Student();
  public myForm: FormGroup;
  public validationMessages: Object;
  public validateAll = false;
  public careers = [
    {
      value: 'isc',
      txt: 'ISC'
    },
    {
      value: 'arq',
      txt: 'ARQ'
    },
    {
      value: 'ibq',
      txt: 'IBQ'
    }
  ]
  constructor(private studentService: StudentService, private fb: FormBuilder, private validate:SessionService, private router: Router,private toastController: ToastController) { 
    this.student = this.studentService.getStudentSelected();
    if (!this.validate.getValidate()) {
      this.router.navigate(['/login']);
      return;
    } 
  }

  ngOnInit() {
    if (!this.validate.getValidate()) {
      this.router.navigate(['/login']);
      return;
    } 
    this.myForm = this.fb.group(
      {
        controlNumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
        name: ["", Validators.required],
        curp: ["", Validators.compose([Validators.required, Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)])],
        age: ["", Validators.compose([Validators.required, Validators.min(17)])],
        nip: ["", Validators.compose([Validators.required, Validators.min(9), Validators.max(9999)])],
        email: ["", Validators.compose([Validators.required, Validators.email])],
        career: ["", Validators.compose([Validators.required])],
        photo: ["", Validators.compose([Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/)])]
      });

        this.validationMessages = { 
      controlNumber: [
        { type: 'required', message: 'Número de control obligatorio' },
        { type: 'minlength', message: 'El número de control de ser de 8 digitos'},
        { type: 'maxlength', message: 'El número de control de ser de 8 digitos'},
        { type: 'pattern', message: 'El número de control está mal formado'}
      ],
      name: [
        { type: 'required', message: 'Nombre obligatorio' }
      ],
      curp: [
        { type: 'required', message: 'CURP obligatoria' },
        { type: 'pattern', message: 'Su CURP está mal formada'}
      ],
      age: [
        { type: 'required', message: 'Edad obligatoria'},
        { type: 'min', message: 'La edad mínima es de 17 años'}
      ],
      nip: [
        { type: 'required', message: 'NIP obligatorio'},
        { type: 'min', message: 'La longitud mínima del NIP es de dos dígitos'},
        { type: 'max', message: 'La longitud máxima del NIP es de cuatro dígitos'}
      ],
      career: [
        { type: 'required', message: 'Carrera obligatoria'}
      ],
      email: [
        { type: 'required', message: 'Correo electrónico obligatorio'},
        { type: 'email', message: 'Revise que su correo esté bien escrito'}
      ],
      photo: [
        { type: 'required', message: 'URL de la foto obligatoria'},
        { type: 'pattern', message: 'Revise que la URL de su foto sea correcta'}
      ]
    }
    this.myForm.get('controlNumber').setValue(this.student.controlnumber);
    this.myForm.get('name').setValue(this.student.name);
    this.myForm.get('curp').setValue(this.student.curp);
    this.myForm.get('age').setValue(this.student.age);
    this.myForm.get('nip').setValue(this.student.nip);
    this.myForm.get('email').setValue(this.student.email);
    this.myForm.get('career').setValue(this.student.career.toLowerCase());
    this.myForm.get('photo').setValue(this.student.photo);

    console.log(    this.myForm.get('controlNumber').dirty);
    
    
    
  }

  validateBox(){
    const options = ['controlNumber','name','curp','age','nip','email','career','photo'];
    let validado = true;
    options.forEach(element => {
      this.validationMessages[element].forEach(item => {
        console.log(element + ' ' +this.myForm.get(element).hasError(item.type));
        if(this.myForm.get(element).hasError(item.type)){
          console.log(item.message);
          this.showToast(item.message);
          if (validado){
            validado = false;
          }  
        }
      });
    });
    return validado;
  }
  public updateStudent() {
    //Construir el objeto
    this.student.controlnumber = this.myForm.get('controlNumber').value;
    this.student.name = this.myForm.get('name').value;
    this.student.curp = this.myForm.get('curp').value;
    this.student.age = this.myForm.get('age').value;
    this.student.nip = this.myForm.get('nip').value;
    this.student.email = this.myForm.get('email').value;
    this.student.career = this.myForm.get('career').value;
    this.student.photo = this.myForm.get('photo').value;
    console.log(this.student);

  }
  submitForm() {
    if (!this.validateBox()){      
      return;
    }
      this.showToast('Estudiante actualizado','primary');
      this.updateStudent();
      this.router.navigate(['/home']);    
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
  public logOut(){
    this.validate.setValidate(false);
    this.router.navigate(['/login']);
  }

}
