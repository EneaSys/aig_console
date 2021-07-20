import { Component, Input, OnInit } from '@angular/core';
import { CityDTO } from 'aig-generic';

@Component({
    selector: 'entity-detail-city',
    templateUrl: './entity-detail-city.component.html',
    styleUrls: ['./entity-detail-city.component.scss']
})
export class AigEntityDetailCityComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    city: CityDTO;

}