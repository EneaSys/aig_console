import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './apollo-document-detail.component.html',
    styleUrls: ['./apollo-document-detail.component.scss']
})
export class ApolloDocumentDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
    ) { }

    apolloDocument: any[];
    apolloDocumentLine: any[];

    displayedColumns: string[] = ['descrizione', 'prezzo', 'qta', 'importo', 'aliquota', 'totale'];

    ngOnInit(): void {
        this.apolloDocument = this.route.snapshot.data.apolloDocument.body;
        this.apolloDocumentLine = this.route.snapshot.data.apolloDocumentLine.body;
    }

    
}
