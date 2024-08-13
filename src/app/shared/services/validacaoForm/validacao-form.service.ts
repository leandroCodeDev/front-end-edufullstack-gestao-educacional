import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoFormService {

  constructor() { }


  public validateInput = (formGroup: FormGroup, inputName: string, submicao: boolean = false) =>
    this.inputHasError(formGroup, inputName, submicao)
      ? 'hasError'
      : this.inputHasSuccess(formGroup, inputName, submicao)
        ? 'hasSuccess'
        : '';




  public getInputErrorMessage = (formGroup: FormGroup, inputName: string, submicao: boolean = false) => {
    const errors = formGroup.get(inputName)?.errors;

    if (!errors || !submicao) return;
    if (!!errors['required']) return 'Campo obrigatório!';
    if (!!errors['minlength']) {
      let err = errors['minlength']
      return 'Este campo deve conter pelo menos ' + err['requiredLength'] + ' caracteres!';
    }
    if (!!errors['maxlength']) { 
      let err = errors['maxlength']
      return 'Este campo não pode ultrapassar ' + err['requiredLength']  + ' caracteres!';
     }
     if (!!errors['max']) { 
      let err = errors['max']
      return 'Este campo não pode conter o valor superior  a ' + err['max']  + '!';
     }
     if (!!errors['min']) { 
      let err = errors['min']
      return 'Este campo não pode conter o valor  inferior a ' + err['min']  + '!';
     }
     if (!!errors['mail']) { 
      return 'Utilize um e-mail válido!';
     }
     if(!!errors['pattern']){

      return "Utilize um valor valido solicitado pelo campo"
     }

     

    return 'Campo Inválido';
  };


  public inputHasError = (formGroup: FormGroup, inputName: string, submicao: boolean = false) =>
    ((formGroup.controls[inputName].dirty ||
      formGroup.controls[inputName].touched) &&
      formGroup.controls[inputName].invalid) && submicao  ||
    (formGroup.controls[inputName].invalid && submicao);

  public inputHasSuccess = (formGroup: FormGroup, inputName: string, submicao: boolean = false) =>
    (formGroup.controls[inputName].dirty &&
      formGroup.controls[inputName].touched &&
      formGroup.controls[inputName].valid) ||
    (formGroup.controls[inputName].valid && submicao);


}
