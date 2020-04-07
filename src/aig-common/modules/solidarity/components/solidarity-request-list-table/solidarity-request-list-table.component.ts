import { Component, OnInit, Input } from '@angular/core';
import { AigSolidarityRequestCalculatorService } from '../../services/solidarityRequestCalulator.service';

@Component({
    selector: 'aig-solidarity-request-list-table',
    templateUrl: './solidarity-request-list-table.component.html',
    styleUrls: ['./solidarity-request-list-table.component.scss']
})
export class AigSolidarityRequestListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    constructor(
        public aigSolidarityRequestCalculatorService: AigSolidarityRequestCalculatorService,
    ) { }

    ngOnInit(): void { }

    name(instructor) {
        if(instructor != null) {
            return instructor.split("|")[1];
        }
        return "";
    }
}
