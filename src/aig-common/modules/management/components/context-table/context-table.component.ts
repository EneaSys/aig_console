import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AigContextRepositoryService } from 'aig-common/context-browser-repository/context-browser-repository.service';
import { IContext } from 'aig-common/context-browser-repository/Context.model';

@Component({
    selector: 'aig-context-table',
    templateUrl: './context-table.component.html',
    styleUrls: ['./context-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigContextTableComponent implements OnInit {
    constructor(
        private aigContextRepositoryService: AigContextRepositoryService
    ) { }
    
    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    setDefaultContext(context: IContext) {
        this.aigContextRepositoryService.setDefaultContext(context);
    }
}
