import { Component, Input, OnInit } from '@angular/core';
import { ItalianPublicProcurementProcedureDTO, ItalianPublicProcurementSectorDTO, RegimeFiscaleDTO, TipoCassaDTO, TipoRitenutaDTO, TipoScontoMaggiorazioneDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-tipo-sconto-maggioranza',
    templateUrl: './entity-detail-tipo-sconto-maggioranza.component.html',
    styleUrls: ['./entity-detail-tipo-sconto-maggioranza.component.scss']
})
export class AigEntityDetailTipoScontoMaggioranzaComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    tipoScontoMaggioranza: TipoScontoMaggiorazioneDTO;

}