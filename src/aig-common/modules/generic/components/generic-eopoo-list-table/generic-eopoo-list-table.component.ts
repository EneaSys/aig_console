import { Component, Input, OnInit } from '@angular/core';
import { GenericEopooDTO } from 'aig-generic';

@Component({
    selector: 'aig-generic-eopoo-list-table',
    templateUrl: './generic-eopoo-list-table.component.html',
    styleUrls: ['./generic-eopoo-list-table.component.scss']
})
export class AigGenericEopooListTableComponent implements OnInit {
    constructor(
        /*private eopooTypeResourceService: EopooTypeResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,*/
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: GenericEopooDTO[];

    ngOnInit(): void { }

    /*async deleteEopooType(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.eopooTypeResourceService.deleteEopooTypeUsingDELETE(id).toPromise();
            this._snackBar.open(`Eopoo type: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting eopoo type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editEopooType(eopooTypeDTO: EopooTypeDTO) {
        this.dialog.open(AigEopooTypeNewUpdateModalComponent, { data: { eopooType: eopooTypeDTO } });
    }*/
}