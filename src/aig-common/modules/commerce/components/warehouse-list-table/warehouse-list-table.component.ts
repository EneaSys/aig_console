import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WarehouseResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-warehouse-list-table',
    templateUrl: './warehouse-list-table.component.html',
    styleUrls: ['./warehouse-list-table.component.scss']
})
export class AigWarehouseListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private warehouseResourceService: WarehouseResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private router: Router,
    ) { }

    ngOnInit(): void { }
}
