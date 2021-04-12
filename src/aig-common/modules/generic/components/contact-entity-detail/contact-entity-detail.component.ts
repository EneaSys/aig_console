import { Component, Input, OnInit } from '@angular/core';
import { ContactDTO } from 'aig-generic';

@Component({
    selector: 'aig-contact-entity-detail',
    templateUrl: './contact-entity-detail.component.html',
    styleUrls: ['./contact-entity-detail.component.scss']
})
export class AigContactEntityDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    contactDTO: ContactDTO;
}