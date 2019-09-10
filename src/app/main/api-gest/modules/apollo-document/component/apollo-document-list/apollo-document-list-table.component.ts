import { Component, OnInit, ViewEncapsulation, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { fuseAnimations } from '@fuse/animations';

import { ApolloDocumentService } from '../../../_common/services/apollo-document.service';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
    selector: 'aig-apollo-document-list-table',
    templateUrl: './apollo-document-list-table.component.html',
    styleUrls: ['./apollo-document-list-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigApolloDocumentListTableComponent implements OnInit, OnChanges {
    constructor(
        private apolloDocumentService: ApolloDocumentService,
        private router: Router,
    ) { }

    @Input() requestFilter: any;

    displayedColumns: string[] = ['id', 'number', 'date', 'customer', 'total', 'buttons'];
    dataSource: any[];

    likForDownloadXml = SERVER_API_URL + "ws/generate-fattura-pa?type=apollo-document&id=";
    
    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadApolloDocument();
    }

    private loadApolloDocument(){
        this.apolloDocumentService.query(this.requestFilter).subscribe(
            (res: HttpResponse<any[]>) => this.paginateApolloDocuments(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private paginateApolloDocuments(data: any[], headers: HttpHeaders) {
        this.dataSource = data;
    }

    private onError(errorMessage: string) {
        console.log("Errore: ", errorMessage);
    }

    public detailApolloDocument(idApolloDocument: string){
        this.router.navigate(['apollo-document', 'detail', idApolloDocument]);
    }
}
