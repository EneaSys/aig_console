import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italianlegislation';
import { AigProcurementLotNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
import { Table } from "primeng/table";
import { LazyLoadEvent } from 'primeng/api';
//import { PrimeNGConfig } from "primeng/api";

@Component({
    selector: 'aig-procurement-lot-list-table-ng',
    templateUrl: './procurement-lot-list-table-ng.component.html',
    styleUrls: ['./procurement-lot-list-table-ng.component.scss']
})
export class AigProcurementLotListTableNgComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        //private primengConfig: PrimeNGConfig,
        private dialog: MatDialog,
        private procurementLotResourceService: ProcurementLotResourceService,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];


    totalRecords: number;

    loading: boolean;

    selectedCustomers: any[];

    //@ViewChild("dt") table: Table;

    ngOnInit() {
        //this.primengConfig.ripple = true;
        this.loadContent();
    }

    onLazy(event: LazyLoadEvent) {
        console.log("lazy", event);
        this.loadContent()
    }
    loadContent() {
        this.loading = true;
        this.totalRecords = 100;
        this.loading = false;
    }

    async deleteProcurementLot(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.procurementLotResourceService.deleteProcurementLotUsingDELETE(id).toPromise();
            this._snackBar.open(`Procurement Lot: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting procurement lot: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProcurementLot(procurementLotDTO: ProcurementLotDTO) {
        this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: {procurementLot:procurementLotDTO } });
    }
}
