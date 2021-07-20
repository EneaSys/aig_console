import { Component, Input, OnInit } from '@angular/core';
import { SocialActionDTO } from 'aig-standard';

@Component({
    selector: 'social-action-detail-box',
    templateUrl: './social-action-detail-box.component.html',
    styleUrls: ['./social-action-detail-box.component.scss']
})
export class AigSocialActionDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input() 
    socialAction: SocialActionDTO 
}