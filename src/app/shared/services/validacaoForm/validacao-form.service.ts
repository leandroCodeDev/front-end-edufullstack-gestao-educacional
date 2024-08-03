import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoFormService {

  constructor() { }


  validateInput = (formGroup: FormGroup, inputName: string) =>
    this.inputHasError(formGroup, inputName)
      ? 'hasError'
      : this.inputHasSuccess(formGroup, inputName)
        ? 'hasSuccess'
        : '';




  getInputErrorMessage = (formGroup: FormGroup, inputName: string, submicao: boolean = false) => {
    const errors = formGroup.get(inputName)?.errors;
    if (!errors || !submicao) return;
    if (errors['required']) return 'Campo obrigatório!';

    return 'Campo Inválido';
  };


  private inputHasError = (formGroup: FormGroup, inputName: string, submicao: boolean = false) =>
    ((formGroup.controls[inputName].dirty ||
      formGroup.controls[inputName].touched) &&
      formGroup.controls[inputName].invalid) ||
    (formGroup.controls[inputName].invalid && submicao);

  private inputHasSuccess = (formGroup: FormGroup, inputName: string, submicao: boolean = false) =>
    (formGroup.controls[inputName].dirty &&
      formGroup.controls[inputName].touched &&
      formGroup.controls[inputName].valid) ||
    (formGroup.controls[inputName].valid && submicao);


}
