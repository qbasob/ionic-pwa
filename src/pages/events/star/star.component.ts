import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'star',
    templateUrl: 'star.component.html'
})
export class StarComponent {
    @Input()
    rating: number;

    @Output()
    ratingChange = new EventEmitter<number>();

    constructor() { }

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
        this.ratingChange.emit(this.rating);
    }
}