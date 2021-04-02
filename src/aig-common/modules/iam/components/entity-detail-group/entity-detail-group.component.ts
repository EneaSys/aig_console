import { Component, Input, OnInit } from '@angular/core';

import { ContextGroupDTO } from 'api-gest';


@Component({
    selector: 'entity-detail-group',
    templateUrl: './entity-detail-group.component.html',
    styleUrls: ['./entity-detail-group.component.scss']
})
export class AigEntityDetailGroupComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    group: ContextGroupDTO;

}