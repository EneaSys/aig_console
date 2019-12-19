import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AigGenericComponentService } from '../../../generic-component/generic-component.service';
import { GenericComponent } from '../../../generic-component/generic-component';

@Component({
    templateUrl: './apollo-document-detail.component.html',
    styleUrls: ['./apollo-document-detail.component.scss']
})
export class ApolloDocumentDetailComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    apolloDocument: any[];
    apolloDocumentLine: any[];

    displayedColumns: string[] = ['descrizione', 'prezzo', 'qta', 'importo', 'aliquota', 'totale'];

    loadComponent(): void {
        this.apolloDocument = this.route.snapshot.data.apolloDocument.body;
        this.apolloDocumentLine = this.route.snapshot.data.apolloDocumentLine.body;
    }

    
}
