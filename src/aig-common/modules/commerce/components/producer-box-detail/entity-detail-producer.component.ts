import { Component, Input, OnInit } from '@angular/core';
import { ProducerDTO } from 'aig-commerce';


@Component({
    selector: 'entity-detail-producer',
    templateUrl: './entity-detail-producer.component.html',
    styleUrls: ['./entity-detail-producer.component.scss']
})
export class AigEntityDetailProducerComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    producerDTO: ProducerDTO;

}