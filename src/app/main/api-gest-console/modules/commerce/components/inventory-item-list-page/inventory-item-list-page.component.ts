import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { InventoryCategoryDTO, InventoryItemDTO, InventoryItemResourceService, ProducerDTO } from 'aig-commerce';
import { AigCommerceAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
  selector: 'aig-inventory-item-list-page',
  templateUrl: './inventory-item-list-page.component.html',
  styleUrls: ['./inventory-item-list-page.component.scss']
})
export class AigInventoryItemListPageComponent extends AigCommerceGenericComponent {
  constructor(
    public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
    private inventoryItemResourceService: InventoryItemResourceService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }


  filteredInventoryCategory: Observable<InventoryCategoryDTO[]>;
  filteredProducer: Observable<ProducerDTO[]>;

  loadPage() {
    this.initInventoryItemSearch();

    this.showAllInventoryItem();
  }


  reloadPage() {
    this.showAllInventoryItem();
  }

  //			---- INVENTORY ITEM TABLE AND SEARCH SECTION ----

  inventoryItemSearchFormGroup: FormGroup;
  inventoryItemPaginationSize: number;
  inventoryItemFilters: any;

  inventoryItemLength: number;
  inventoryItemDTOs: InventoryItemDTO[];
  inventoryItemError: any;

  inventoryItemDC: string[];

  private initInventoryItemSearch() {
    this.inventoryItemPaginationSize = 10

    this.inventoryItemSearchFormGroup = this._formBuilder.group({
      id: [''],
      name: [''],
      inventoryCategory: [''],
      producer: ['']
    });

    this.inventoryItemDC = ["id", "name", "producerName", "inventoryCategoryName", "buttons",];

    this.filteredInventoryCategory = this.commerceAutocompleteService.filterInventoryCategory(this.inventoryItemSearchFormGroup.controls['inventoryCategory'].valueChanges);
    this.filteredProducer = this.commerceAutocompleteService.filterProducer(this.inventoryItemSearchFormGroup.controls['producer'].valueChanges);
  }


  private clearFiltersInventoryItem() {
    this.inventoryItemFilters = {
      inventoryItemIDEquals: null,
      inventoryItemNameContains: null,
      inventoryCategoryIDEquals: null,
      producerIDEquals: null,
      page: 0,
    }
  }

  private async searchInventoryItem(page: number) {
    this.inventoryItemDTOs = null;

    this.inventoryItemFilters.page = page;
    this.inventoryItemFilters.size = this.inventoryItemPaginationSize;

    this.filteredInventoryCategory = this.commerceAutocompleteService.filterInventoryCategory(this.inventoryItemSearchFormGroup.controls['inventoryCategory'].valueChanges);
    this.filteredProducer = this.commerceAutocompleteService.filterProducer(this.inventoryItemSearchFormGroup.controls['producer'].valueChanges);

    try {
      this.inventoryItemLength = await this.inventoryItemResourceService.countInventoryItemsUsingGET(this.inventoryItemFilters).toPromise();

      if (this.inventoryItemLength == 0) {
        this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
        this.inventoryItemDTOs = [];
        return;
      }

      this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(this.inventoryItemFilters).toPromise();
    } catch (e) {
      this.inventoryItemError = e;
    }
  }

  showAllInventoryItem() {
    this.resetFiltersInventoryItem();
  }


  resetFiltersInventoryItem() {
    this.inventoryItemSearchFormGroup.reset();
    this.clearFiltersInventoryItem();
    this.searchInventoryItem(0);
  }

  inventoryItemPaginationEvent(pageEvent: PageEvent) {
    this.inventoryItemPaginationSize = pageEvent.pageSize;
    this.searchInventoryItem(pageEvent.pageIndex);
  }


  inventoryItemSearchWithFilter() {
    let searchedId = this.inventoryItemSearchFormGroup.controls.id.value;

    if (searchedId != null) {
      this.clearFiltersInventoryItem();
      this.inventoryItemSearchFormGroup.reset();
      this.inventoryItemFilters.inventoryItemIDEquals = searchedId;
      this.searchInventoryItem(0);
      return;
    } else {

      if (this.inventoryItemSearchFormGroup.controls.name.value) {
        this.inventoryItemFilters.inventoryItemNameContains = this.inventoryItemSearchFormGroup.controls.name.value;
      }

      if (this.inventoryItemSearchFormGroup.controls.inventoryCategory.value) {
        this.inventoryItemFilters.inventoryCategoryIDEquals = this.inventoryItemSearchFormGroup.controls.inventoryCategory.value.id;
      }

      if (this.inventoryItemSearchFormGroup.controls.producer.value) {
        this.inventoryItemFilters.producerIDEquals = this.inventoryItemSearchFormGroup.controls.producer.value.id;
      }

      this.searchInventoryItem(0);
    }
  }


  newInventoryItem(): void {
    this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: {} } });
  }

}
