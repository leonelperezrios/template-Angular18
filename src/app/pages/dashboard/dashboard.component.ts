import {Component} from '@angular/core';
import {MenuService} from "@services";
import {AsyncPipe} from "@angular/common";
import {FunctionalityComponent} from "@components";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        AsyncPipe,
        FunctionalityComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    constructor(public menuService: MenuService) {
    }

}
