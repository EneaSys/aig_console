import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { IContext } from 'app/context/Context.model';
import { AigContextRepositoryService } from 'app/context/context-repository.service';

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
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    private setDefaultContext(context: IContext) {
        this.aigContextRepositoryService.setDefaultContext(context);
    }
}
