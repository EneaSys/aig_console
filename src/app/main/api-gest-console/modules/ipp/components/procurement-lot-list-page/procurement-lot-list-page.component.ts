import { Component, OnInit } from '@angular/core';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italian-public-procurement';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog, PageEvent } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AigProcurementLotNewUpdateDialogComponent } from '../procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
declare const google: any;

@Component({
    templateUrl: './procurement-lot-list-page.component.html',
    styleUrls: ['./procurement-lot-list-page.component.scss']
})
export class AigProcurementLotListPageComponent extends GenericComponent {
    constructor(
        private procurementLotResourceService: ProcurementLotResourceService,
        private _formBuilder: FormBuilder,
        aigGenericComponentService: AigGenericComponentService,
        private dialog: MatDialog,
    ) { super(aigGenericComponentService) }


    loadComponent() {
        this.loadForm();
        this.cleanFiltersAndLoadProcurementLot();
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
        this.procurementLotFilters.amountMin = event.value;
    }

    formatFilterAmountMax(event: any) {
        if (event.value < 1000001) {
            this.procurementLotFilters.amountMax = event.value;
        } else {
            this.procurementLotFilters.amountMax = null;
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
    procurementLotSearchForm: FormGroup;


    loadForm() {
        this.procurementLotSearchForm = this._formBuilder.group({
            cig: [''],
            description: [''],
            date: [''],
        });
    }



    procurementLotSearch() {
        if (this.procurementLotSearchForm.value.cig) {
            let cig = this.procurementLotSearchForm.value.cig;
            this.cleanFiltersProcurementLot();
            this.setFilterProcurementLot('cig', cig);
            this.cleanFiltersProcurementLot();
        } else {
            if (this.procurementLotSearchForm.value.description != "") {
                this.procurementLotFilters.description = this.procurementLotSearchForm.value.description;
            }
            if (this.procurementLotSearchForm.value.date != "") {
                this.procurementLotFilters.date = this.procurementLotSearchForm.value.date;
            }
            this.reloadFilter();
        }
    }


    // IPP LOT
    procurementLotDisplayColumns: string[] = ['cig', 'sa', 'description', 'amount', 'type', 'category', 'locality', 'offerExpiryDate'];
    procurementLotDTOs: ProcurementLotDTO[];
    procurementLotError: any;

    procurementLotPageable = {
        page: 0,
        size: 30,
    }
    procurementLotIndex: number;
    procurementLotLength: number;

    procurementLotFilters: any;

    cleanFiltersAndLoadProcurementLot() {
        this.cleanFiltersProcurementLot();
        this.reloadFilter();
    }

    private cleanFiltersProcurementLot() {
        this.procurementLotSearchForm.reset();

        this.procurementLotIndex = 0;

        this.procurementLotFilters = {
            cig: null,
            description: null,
            amountMin: null,
            amountMax: null,
            ippLotTypeCode: null,
            ippLotCategoryCode: null,
        }
    }

    setFilterProcurementLot(filterKey: string, value: any) {
        this.procurementLotFilters[filterKey] = value;
        this.reloadFilter();
    }

    private async reloadFilter() {
        this.loadProcurementLots(0);
        try {
            this.procurementLotLength = await this.procurementLotResourceService.countProcurementLotsUsingGET(this.procurementLotFilters).toPromise();
        } catch (e) { }
    }

    procurementLotPaginatorEvent(event: PageEvent) {
        this.procurementLotPageable.size = event.pageSize;
        this.loadProcurementLots(event.pageIndex);
    }

    private async loadProcurementLots(page) {
        this.procurementLotDTOs = null;

        this.procurementLotIndex = page
        this.procurementLotPageable.page = page;
        try {
            this.procurementLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(this.procurementLotFilters).toPromise();
        } catch (e) {
            this.procurementLotError = e;
        }
    }

}
