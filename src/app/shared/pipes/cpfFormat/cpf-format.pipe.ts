import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormatPipe',
  standalone: true
})
export class CpfFormatPipe implements PipeTransform {

  transform(cpf: string| undefined): any {
    let cpfRegex = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/

    if (!cpf) return cpf

    let foneFormatado = '';
    const digits = cpf.toString().replace(/\D/g, '').replace('.', '').replace('-', '');

  
    const formatted = digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    
    return formatted;
  }

}
