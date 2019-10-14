import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'aig-group-table',
    templateUrl: './group-table.component.html',
    styleUrls: ['./group-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigGroupTableComponent implements OnInit {
    constructor() { }

    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
}
