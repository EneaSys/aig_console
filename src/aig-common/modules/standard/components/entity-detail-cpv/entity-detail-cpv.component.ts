import { Component, Input, OnInit } from '@angular/core';
import { CpvDTO } from 'aig-standard';





@Component({
    selector: 'entity-detail-cpv',
    templateUrl: './entity-detail-cpv.component.html',
    styleUrls: ['./entity-detail-cpv.component.scss']
})
export class AigEntityDetailCpvComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    cpvDTO: CpvDTO;

}