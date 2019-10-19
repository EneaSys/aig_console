import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

@Component({
    templateUrl: './apollo-document-list.component.html',
    styleUrls: ['./apollo-document-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigApolloDocumentListComponent implements OnInit {
    constructor(
        private router: Router,
    ) { }
    
    private requestFilter: any;

    private types: any = [
        {n:"FA", id:21},
        {n:"FE", id:29},
        {n:"NCC", id:46},
        {n:"NFC", id:47},
        {n:"PRO", id:78},
        {n:"FEPA", id:83},
        {n:"ND", id:85},
        {n:"FdR", id:89},
    ]

    ngOnInit(){
        this.requestFilter = this.requestFilter = {
            size: 101,
            sort: ["data,DESC","protocollo,DESC",],
        }
    }
    
    public filterAzienda(idAzienda: Number){
        let _requestFilter = Object.assign({}, this.requestFilter);
        _requestFilter['idazienda.equals'] = idAzienda;
        this.requestFilter = _requestFilter;
    }

    public filterTipo(tipo: Number){
        let _requestFilter = Object.assign({}, this.requestFilter);
        _requestFilter['tipo.equals'] = tipo;
        this.requestFilter = _requestFilter;
    }
}
