import { Component, OnInit } from '@angular/core';
import { EopooTypeResourceService, EopooTypeDTO } from 'aig-generic';

@Component({
    selector: 'aig-eopoo-new-form',
    templateUrl: './eopoo-new-form.component.html',
    styleUrls: ['./eopoo-new-form.component.scss']
})
export class AigEopooNewFormComponent implements OnInit {
    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
    ) { }

    eopooTypeDTOs: EopooTypeDTO[];
    selectedEopooType: EopooTypeDTO;

    async ngOnInit() {
        this.eopooTypeDTOs = await this.eopooTypeResourceService.getAllEopooTypesUsingGET().toPromise();
    }

    onEopooTypeChange(eopooType: any) {
        this.selectedEopooType = eopooType;
    }
    
}
