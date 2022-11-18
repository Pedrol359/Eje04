import { StudentService } from './../services/student.service';
import { Student } from './../models/student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {

  public student:Student;
  public myForm: FormGroup;
  public validationMessages: Object;
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
  constructor(private studentService: StudentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        controlNumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])], //[initialValue, Validations]
        name: ["", Validators.required],
        curp: ["", Validators.compose([Validators.required, Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)])],
        age: ["", Validators.compose([Validators.required, Validators.min(17)])],
        nip: ["", Validators.compose([Validators.required, Validators.min(9), Validators.max(9999)])],
        email: ["", Validators.compose([Validators.required, Validators.email])],
        career: ["", Validators.compose([Validators.required])],
        photo: ["", Validators.compose([Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/)])]
      }); //We add formBuilder to give structure and validations to our form

        this.validationMessages = { //Difference between a JSON a JS Object is the usage of ''
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
    
  }

  public newStudent() {
    //Construir el objeto
    this.studentService.addStudent(this.student)
  }

}
