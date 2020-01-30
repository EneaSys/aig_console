import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ActivatedRoute } from '@angular/router';
import { EopooTypeDTO } from 'aig-generic';

@Component({
    templateUrl: './eopoo-type-detail-page.component.html',
    styleUrls: ['./eopoo-type-detail-page.component.scss']
})
export class AigEopooTypeDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    eopooType: EopooTypeDTO;

    loadComponent() {
        this.eopooType = this.route.snapshot.data.eopooType;
    }
}
