import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { fuseAnimations } from '@fuse/animations';

import { ApolloDocumentService } from '../../../_common/services/document.service';

@Component({
    selector: 'aig-apollo-document-list-table',
    templateUrl: './apollo-document-list-table.component.html',
    styleUrls: ['./apollo-document-list-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigApolloDocumentListTableComponent implements OnInit {
    displayedColumns: string[] = ['id', 'idcompany', 'type', 'protocol', 'date', 'customer', 'buttons'];
    dataSource: any[];

    constructor(
        private apolloDocumentService: ApolloDocumentService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.apolloDocumentService.query().subscribe(
            (res: HttpResponse<any[]>) => this.paginateApolloDocuments(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected paginateApolloDocuments(data: any[], headers: HttpHeaders) {
        this.dataSource = data;
    }

    protected onError(errorMessage: string) {
        console.log("Errore: ", errorMessage);
    }
    
    detailApolloDocument(idApolloDocument: string){
        console.log(idApolloDocument);
        //this.router.navigate(['document', 'detail', idApolloDocument]);
    }
}
