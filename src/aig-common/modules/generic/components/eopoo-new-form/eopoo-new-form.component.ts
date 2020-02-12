import { Component, OnInit, Input } from '@angular/core';
import { EopooTypeResourceService, EopooTypeDTO } from 'aig-generic';
import { EopooDTO } from 'api-gest';

@Component({
    selector: 'aig-eopoo-new-form',
    templateUrl: './eopoo-new-form.component.html',
    styleUrls: ['./eopoo-new-form.component.scss']
})
export class AigEopooNewFormComponent implements OnInit {
    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
    ) { }

    @Input()
    eopoo: EopooDTO;
    
    eopooTypeDTOs: EopooTypeDTO[];
    selectedEopooType: EopooTypeDTO;
    isUpdate: boolean = false;

    async ngOnInit() {
        this.eopooTypeDTOs = await this.eopooTypeResourceService.getAllEopooTypesUsingGET().toPromise();
        
        if(this.eopoo != null && this.eopoo.eopooType != null) {
            this.isUpdate = true;
            this.selectedEopooType = this.eopoo.eopooType;
        }
    }

    onEopooTypeChange(eopooType: any) {
        this.selectedEopooType = eopooType;
    }
    
}
