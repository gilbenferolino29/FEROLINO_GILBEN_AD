
import { AbstractControl,  ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchingValidator(): ValidatorFn { 
  return (control: AbstractControl): ValidationErrors | null => {
    const pw1  = control.value;
    const pw2 = control.root.get('password')?.value;

    if(pw1 == ''){
      return null;
    }
    //console.log(pw1);
    //console.log(pw2);
    //console.log(pw1 === pw2 ?  null:{ passwordNotMatch: true } );
    return pw1 != pw2 ? { passwordNotMatch: true } : null;
    
  };

} 