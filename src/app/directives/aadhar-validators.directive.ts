import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAadharValidators]'
})
export class AadharValidatorsDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\D/g, '');
    if(trimmed.length >12){
      trimmed = trimmed.substr(0,11);
    }
    let numbers = [];
    for (let i=0; i<trimmed.length; i += 4){
      numbers.push(trimmed.substr(i,4))
    }
    input.value = numbers.join(' ');
  }

}
