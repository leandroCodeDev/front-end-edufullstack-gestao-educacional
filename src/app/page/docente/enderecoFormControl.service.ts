import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EnderecoFormControl {
  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({});
  }

  private isValidated = false

  set setForm(form: FormGroup){
    this.form = form;
  } 
  

  submited(){
    this.isValidated = true  
  }

  
  validateInput = (inputName: string) =>
    this.inputHasError(inputName)
      ? 'hasError'
      : this.inputHasSuccess(inputName)
      ? 'hasSuccess'
      : '';

  getInputErrorMessage = (inputName: string) => {
    const errors = this.form.get(inputName)?.errors;
    if (!errors || !this.isValidated) return;
    if (errors['required']) return 'Campo obrigatório!';

    return 'Campo Inválido';
  };

  private inputHasError = (inputName: string) =>
    ((this.form.controls[inputName].dirty ||
      this.form.controls[inputName].touched) &&
    this.form.controls[inputName].invalid) || 
    (this.form.controls[inputName].invalid && this.isValidated);

  private inputHasSuccess = (inputName: string) =>
    this.form.controls[inputName].dirty &&
    this.form.controls[inputName].touched &&
    this.form.controls[inputName].valid;
}