import { Component, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'star-fc',
    templateUrl: 'star-fc.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StarFcComponent),
            // we need to use forwardRef because in ES6 classes are not hoisted
            // to the top, so at this point, the class is not yet defined.
            // w sumie niepotrzebne w tym przypadku, bo dekoratory działają
            // na klasie dopiero po jej utworzeniu
            multi: true
        }
    ]
})
export class StarFcComponent implements ControlValueAccessor  {
    private rating: number;
    private onChange = (_: any) => { };

    constructor() {
        this.rating = 0
    }

    getStar(star: number): string {
        if (star <= this.rating) {
            return 'star';
        }
        else {
            return 'star-outline';
        }
    }

    setStar(starClicked: number) {
        this.rating = starClicked;
        this.onChange(this.rating);
    }

    // ControlValueAccessor interface methods:

    // it takes a new value from the form model and writes it into the view
    writeValue(rating: number) {
        console.log("rating", rating);
        if (!rating) {
            this.rating = 0;
            return;
        }
        this.rating = rating;
    }

    // provides you with a function and asks you to call it whenever there is a
    // change in your component with the new value so that it can update the control
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // not used in this component
    // same as registerOnChange except on a touch event
    registerOnTouched() { }
}