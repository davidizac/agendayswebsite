import { Component, OnInit, Input , forwardRef, OnChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() errorMessage: string;
  @Input() type: boolean;
  text: string;
  propagateChange: (_: any) => { };



  propagateChangeToParent() {
    this.propagateChange(this.text);
  }

  // interface implementation//
  writeValue(obj: any): void {
    this.text = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

}


