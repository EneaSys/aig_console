import { Injectable } from '@angular/core';
import { DatiPagamentoDTO, FatturaElettronicaBodyDTO } from 'aig-italianlegislation';

@Injectable()
export class AigI16nAutocompleteDisplayService {
    fatturaElettronicaBodyDisplayFn(fatturaElettronicaBody?: FatturaElettronicaBodyDTO): any | undefined {
        return fatturaElettronicaBody ? fatturaElettronicaBody.numero : undefined;
    }

    datiPagamentoDisplayFn(datiPagamento?: DatiPagamentoDTO): any | undefined {
        return datiPagamento ? datiPagamento.condizioniPagamento : undefined;
    }

}