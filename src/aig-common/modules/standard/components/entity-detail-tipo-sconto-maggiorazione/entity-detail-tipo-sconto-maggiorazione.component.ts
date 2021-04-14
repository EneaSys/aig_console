import { Component, Input, OnInit } from '@angular/core';
import { ItalianPublicProcurementProcedureDTO, ItalianPublicProcurementSectorDTO, RegimeFiscaleDTO, TipoCassaDTO, TipoRitenutaDTO, TipoScontoMaggiorazioneDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-tipo-sconto-maggiorazione',
    templateUrl: './entity-detail-tipo-sconto-maggiorazione.component.html',
    styleUrls: ['./entity-detail-tipo-sconto-maggiorazione.component.scss']
})
export class AigEntityDetailTipoScontoMaggiorazioneComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    tipoScontoMaggiorazione: TipoScontoMaggiorazioneDTO;

}