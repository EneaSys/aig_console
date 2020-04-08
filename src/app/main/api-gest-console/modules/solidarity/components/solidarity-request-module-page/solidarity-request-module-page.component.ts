import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ActivatedRoute } from '@angular/router';
import { FoodProductRequestDTO } from 'aig-solidarety';
import * as jsPDF from 'jspdf'
import { ItFiscalCodeService } from 'aig-common/modules/standard/services/itFiscalCode.service';
import { AigSolidarityRequestCalculatorService } from 'aig-common/modules/solidarity/services/solidarityRequestCalulator.service';

@Component({
    templateUrl: './solidarity-request-module-page.component.html',
    styleUrls: ['./solidarity-request-module-page.component.scss']
})
export class AigSolidarityRequestModulePageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        public itFiscalCodeService: ItFiscalCodeService,
        public aigSolidarityRequestCalculatorService: AigSolidarityRequestCalculatorService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    foodProductRequestDTO: FoodProductRequestDTO;
    instructor;

    loadComponent() {
        this.foodProductRequestDTO = this.route.snapshot.data.helpRequest;
        this.instructor = this.foodProductRequestDTO.familyUnit.note.split('|');
    }

    @ViewChild('module', { static: false }) module: ElementRef;

    exportAsPdf() {
        console.log("PDF");
        
        const doc = new jsPDF();

        /*
        const specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
*/
        const module = this.module.nativeElement;

        doc.fromHTML(module.innerHTML, 15, 15, {
            width: 190
        });

        doc.save('modulo_' + this.foodProductRequestDTO.id + '.pdf');
    }
    
}
