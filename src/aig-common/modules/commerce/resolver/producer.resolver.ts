import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProducerDTO, ProducerResourceService } from 'aig-commerce';

@Injectable()
export class AigProducerResolver implements Resolve<Observable<ProducerDTO>> {

    constructor(private producerResourceService: ProducerResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idProducer: number = +route.paramMap.get('id');
        return this.producerResourceService.getProducerUsingGET(idProducer);
    }
}