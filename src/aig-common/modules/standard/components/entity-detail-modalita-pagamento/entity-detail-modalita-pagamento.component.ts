import { Component, Input, OnInit } from '@angular/core';
import { IlFePagamentoModalitaDTO} from 'aig-standard';

@Component({
    selector: 'entity-detail-modalita-pagamento',
    templateUrl: './entity-detail-modalita-pagamento.component.html',
    styleUrls: ['./entity-detail-modalita-pagamento.component.scss']
})
export class AigEntityDetailModalitaPagamentoComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    modalitaPagamento: IlFePagamentoModalitaDTO;

}