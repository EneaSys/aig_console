import { Component, Input, OnInit } from '@angular/core';
import { DatiPagamentoDTO } from 'aig-italianlegislation';


@Component({
    selector: 'aig-dati-pagamento-detail',
    templateUrl: './dati-pagamento-detail.component.html',
    styleUrls: ['./dati-pagamento-detail.component.scss']
})
export class AigDatiPagamentoDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiPagamento: DatiPagamentoDTO;

}