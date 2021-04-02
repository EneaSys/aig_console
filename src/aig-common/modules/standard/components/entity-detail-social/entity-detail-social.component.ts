import { Component, Input, OnInit } from '@angular/core';

import { SocialDTO } from 'aig-standard';



@Component({
    selector: 'entity-detail-social',
    templateUrl: './entity-detail-social.component.html',
    styleUrls: ['./entity-detail-social.component.scss']
})
export class AigEntityDetailSocialComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    social: SocialDTO;

}