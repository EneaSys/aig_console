import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CityDTO } from 'aig-generic';
import { CityResourceService } from 'aig-standard';
import { AigCityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/city-new-update-modal/city-new-update-modal.component';

@Component({
    selector: 'aig-city-list-table',
    templateUrl: './city-list-table.component.html',
    styleUrls: ['./city-list-table.component.scss']
})
export class AigCityListTableComponent implements OnInit {
    constructor(
        private cityResourceService: CityResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteCity(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.cityResourceService.deleteCityUsingDELETE(id).toPromise();
            this._snackBar.open(`City: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting city: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editCity(cityDTO: CityDTO) {
        this.dialog.open(AigCityNewUpdateModalComponent, { data: { city: cityDTO } });
    }
}
