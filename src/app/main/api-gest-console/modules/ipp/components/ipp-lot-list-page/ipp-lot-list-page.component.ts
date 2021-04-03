import { Component, OnInit } from '@angular/core';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italian-public-procurement';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog, PageEvent } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AigProcurementLotNewUpdateDialogComponent } from '../procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
declare const google: any;

@Component({
    templateUrl: './ipp-lot-list-page.component.html',
    styleUrls: ['./ipp-lot-list-page.component.scss']
})
export class AigIppLotListPageComponent extends GenericComponent {
    constructor(
        private procurementLotResourceService: ProcurementLotResourceService,
        private _formBuilder: FormBuilder,
        aigGenericComponentService: AigGenericComponentService,
        private dialog: MatDialog,
    ) { super(aigGenericComponentService) }


    loadComponent() {
        this.loadForm();
        this.cleanFiltersAndLoadIppLot();
    }





    lat = 40.928621;
    lng = 14.264173;
    pointList: { lat: number; lng: number }[] = [];
    drawingManager: any;
    selectedShape: any;
    selectedArea = 0;


    onMapReady(map) {
        this.setCurrentPosition();
        this.initDrawingManager(map);
    }

    initDrawingManager = (map: any) => {
        const self = this;
        const options = {
            drawingControl: true,
            drawingControlOptions: {
                drawingModes: ['polygon'],
            },
            polygonOptions: {
                draggable: true,
                editable: true,
            },
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
        };
        this.drawingManager = new google.maps.drawing.DrawingManager(options);
        this.drawingManager.setMap(map);

        google.maps.event.addListener(
            this.drawingManager,
            'overlaycomplete',
            (event) => {
                if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                    const paths = event.overlay.getPaths();
                    for (let p = 0; p < paths.getLength(); p++) {
                        google.maps.event.addListener(
                            paths.getAt(p),
                            'set_at',
                            () => {
                                if (!event.overlay.drag) {
                                    self.updatePointList(event.overlay.getPath());
                                }
                            }
                        );
                        google.maps.event.addListener(
                            paths.getAt(p),
                            'insert_at',
                            () => {
                                self.updatePointList(event.overlay.getPath());
                            }
                        );
                        google.maps.event.addListener(
                            paths.getAt(p),
                            'remove_at',
                            () => {
                                self.updatePointList(event.overlay.getPath());
                            }
                        );
                    }
                    self.updatePointList(event.overlay.getPath());
                }
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    console.log("asd", event);
                    this.selectedShape = event.overlay;
                    // Switch back to non-drawing mode after drawing a shape.
                    self.drawingManager.setDrawingMode(null);
                    // To hide:
                    self.drawingManager.setOptions({
                        drawingControl: false,
                    });
                }
            }
        );
    }
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        }
    }

    deleteSelectedShape() {
        if (this.selectedShape) {
            this.selectedShape.setMap(null);
            this.selectedArea = 0;
            this.pointList = [];
            // To show:
            this.drawingManager.setOptions({
                drawingControl: true,
            });
        }
    }

    updatePointList(path) {
        this.pointList = [];
        const len = path.getLength();
        for (let i = 0; i < len; i++) {
            this.pointList.push(
                path.getAt(i).toJSON()
            );
        }
        this.selectedArea = google.maps.geometry.spherical.computeArea(
            path
        );
    }
    
    newProcurementLot(): void {
        this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: {} } });
    }





















    formatFilterAmountMin(event: any) {
        this.ippLotFilters.amountMin = event.value;
    }

    formatFilterAmountMax(event: any) {
        if (event.value < 1000001) {
            this.ippLotFilters.amountMax = event.value;
        } else {
            this.ippLotFilters.amountMax = null;
        }
    }

    formatFilterSlider(value: number) {
        if (value >= 1000 && value < 1000000) {
            return Math.round(value / 1000) + 'k';
        }
        if (value == 1000001) {
            return 'max';
        }
        if (value >= 1000000) {
            return Math.round(value / 1000000) + 'm';
        }
        return value;
    }










    // Filters
    ippLotSearchForm: FormGroup;


    loadForm() {
        this.ippLotSearchForm = this._formBuilder.group({
            cig: [''],
            description: [''],
            date: [''],
        });
    }



    ippLotSearch() {
        if (this.ippLotSearchForm.value.cig) {
            let cig = this.ippLotSearchForm.value.cig;
            this.cleanFiltersIppLot();
            this.setFilterIppLot('cig', cig);
            this.cleanFiltersIppLot();
        } else {
            if (this.ippLotSearchForm.value.description != "") {
                this.ippLotFilters.description = this.ippLotSearchForm.value.description;
            }
            if (this.ippLotSearchForm.value.date != "") {
                this.ippLotFilters.date = this.ippLotSearchForm.value.date;
            }
            this.reloadFilter();
        }
    }


    // IPP LOT
    ippLotDisplayedColumns: string[] = ['cig', 'description', 'amount', 'securityAmount', 'nustCode', 'locality','type','category','cpvCode', 'offerExpiryDate'];
    ippLotDTOs: ProcurementLotDTO[];
    ippLotError: any;

    ippLotPageable = {
        page: 0,
        size: 30,
    }
    ippLotIndex: number;
    ippLotLength: number;

    ippLotFilters: any;

    cleanFiltersAndLoadIppLot() {
        this.cleanFiltersIppLot();
        this.reloadFilter();
    }

    private cleanFiltersIppLot() {
        this.ippLotSearchForm.reset();

        this.ippLotIndex = 0;

        this.ippLotFilters = {
            cig: null,
            description: null,
            amountMin: null,
            amountMax: null,
            ippLotTypeCode: null,
            ippLotCategoryCode: null,
        }
    }

    setFilterIppLot(filterKey: string, value: any) {
        this.ippLotFilters[filterKey] = value;
        this.reloadFilter();
    }

    private async reloadFilter() {
        this.loadIppLots(0);
        try {
            this.ippLotLength = await this.procurementLotResourceService.countProcurementLotsUsingGET(null, null, this.ippLotFilters.amountMin, null, null, this.ippLotFilters.amountMax, null, null, null, null, this.ippLotFilters.cig, null, null, null, null, null, null, null, null, null, this.ippLotFilters.description, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotFilters.ippLotCategoryCode, null, null, null, null, null, this.ippLotFilters.ippLotTypeCode, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).toPromise();
        } catch (e) { }
    }

    ippLotPaginatorEvent(event: PageEvent) {
        this.ippLotPageable.size = event.pageSize;
        this.loadIppLots(event.pageIndex);
    }

    private async loadIppLots(page) {
        this.ippLotDTOs = null;

        this.ippLotIndex = page
        this.ippLotPageable.page = page;
        try {
            this.ippLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(null, null, this.ippLotFilters.amountMin, null, null, this.ippLotFilters.amountMax, null, null, null, null, this.ippLotFilters.cig, null, null, null, null, null, null, null, null, null, this.ippLotFilters.description, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotFilters.ippLotCategoryCode, null, null, null, null, null, this.ippLotFilters.ippLotTypeCode, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotPageable.page, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotPageable.size, null).toPromise();
        } catch (e) {
            this.ippLotError = e;
        }
    }

}
