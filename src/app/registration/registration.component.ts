import { Component, OnInit } from '@angular/core';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/custom-validators/custom-validators';
import { RegistrationService } from '../shared/Service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, CustomValidators.removeSpaces, CustomValidators.isWhitespace, Validators.pattern('[a-zA-Z]+'), 
                 Validators.maxLength(15)]],
      middleName: ['', [CustomValidators.removeSpaces, Validators.pattern('[a-zA-Z]+'), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, CustomValidators.removeSpaces, CustomValidators.isWhitespace, Validators.pattern('[a-zA-Z]+'), 
                Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(35), Validators.pattern("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"), 
             CustomValidators.removeSpaces, CustomValidators.isWhitespace]],
      phoneNumber: ['', [Validators.required, CustomValidators.removeSpaces, CustomValidators.isWhitespace, Validators.minLength(10), 
                  Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(6), 
                Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"), 
                CustomValidators.removeSpaces, CustomValidators.isWhitespace, Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, CustomValidators.removeSpaces, CustomValidators.isWhitespace]],
      dateOfBirth: ['', [Validators.required, CustomValidators.removeSpaces, CustomValidators.isWhitespace, 
                   Validators.pattern("^((19|20)\\d\\d)-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$")]],
      gender: [null, [Validators.required, CustomValidators.removeSpaces]],
  },{  validator: CustomValidators.passwordMatchValidator,  })
  }

  register(): void {
    this.submitted = true;
    this.registrationService.registrationService(this.registrationForm.value).subscribe(
      (response) => {
       if(response.status == 200){
        console.log(this.registrationForm.value);
       }
      }
    )
  }

}
