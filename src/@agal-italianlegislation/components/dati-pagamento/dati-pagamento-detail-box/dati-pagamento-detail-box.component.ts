import { Component, Input, OnInit } from '@angular/core';
import { DatiPagamentoDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-pagamento-detail-box',
    templateUrl: './dati-pagamento-detail-box.component.html',
    styleUrls: ['./dati-pagamento-detail-box.component.scss']
})
export class AgalDatiPagamentoDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiPagamento: DatiPagamentoDTO;
}