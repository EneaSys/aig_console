import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { DatiPagamentoResourceService, FatturaElettronicaBodyResourceService } from 'aig-italianlegislation';

@Injectable()
export class AigI16nAutocompleteFilterService {
    constructor(
        private fatturaElettronicaBodyResourceService: FatturaElettronicaBodyResourceService,
        private datiPagamentoResourceService: DatiPagamentoResourceService,
    ) { }

    filterFatturaElettronicaBody(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
					let filter = {
						taxNumberContains: value
					};
					return this.fatturaElettronicaBodyResourceService.getAllFatturaElettronicaBodiesUsingGET(filter);
				} else {
					return this.fatturaElettronicaBodyResourceService.getAllFatturaElettronicaBodiesUsingGET({});
				}
			})
		);
	}

    filterDatiPagamento(observable: Observable<any>) {
		return observable.pipe(
			startWith(''),
			switchMap((value: string) => {
				if (value && value.length > 0) {
					let filter = {
						nameContains: value
					};
					return this.datiPagamentoResourceService.getAllDatiPagamentosUsingGET(filter);
				} else {
					return this.datiPagamentoResourceService.getAllDatiPagamentosUsingGET({});
				}
			})
		);
	}
}