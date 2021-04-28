import { Component, Input, OnInit } from '@angular/core';
import { DettaglioPagamentoDTO } from 'aig-italianlegislation';


@Component({
    selector: 'aig-dettaglio-pagamento-detail',
    templateUrl: './dettaglio-pagamento-detail.component.html',
    styleUrls: ['./dettaglio-pagamento-detail.component.scss']
})
export class AigDettaglioPagamentoDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    dettaglioPagamento: DettaglioPagamentoDTO;

}