import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './city-detail-page.component.html',
    styleUrls: ['./city-detail-page.component.scss']
})
export class AigCityDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private cityResourceService: CityResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    city: CityDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.city = this.route.snapshot.data.city;
        } else {
            this.city = await this.cityResourceService.getCityUsingGET(this.city.id).toPromise();
        }
    }

    async deleteCity(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.cityResourceService.deleteCityUsingDELETE(id).toPromise();
    
            this._snackBar.open(`City: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'city']);
        } catch (e) {
            this._snackBar.open(`Error during deleting city: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editCity(city: CityDTO) {
        this.dialog.open(AigCityNewUpdateModalComponent, { data: { city: city } });
    }

}
