import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'generic',
        title    : 'Generic',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'apollo-document-list',
                title    : 'Documenti Apollo',
                type     : 'item',
                icon     : 'archive',
                url      : '/apollo-document',
                permission: ['e4y2.apollo.get'],
            },
            {
                id       : 'eopoo-list-page',
                title    : 'Eopoo',
				translate: 'NAV.EOPOO',
                type     : 'item',
                icon     : 'how_to_reg',
                url      : '/g5c/eopoo',
                permission: ['g5c.eopoo.get'],
            },
        ]
    },
    {
        id       : 'solidarity',
        title    : 'Solidarity',
        type     : 'group',
        children : [
            {
                id       : 'solidarity-dashboard',
                title    : 'Dashboard',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/solidarity/dashboard',
                permission: ['s8y.request.get'],
            },
            {
                id       : 'solidarity-request-list-page',
                title    : 'Requests',
                type     : 'item',
                icon     : 'child_care',
                url      : '/solidarity/request',
                permission: ['s8y.request.get'],
            },
        ]
    },
    {
        id       : 'ipp',
        title    : 'Public Procurement',
        type     : 'group',
        children : [
            {
                id       : 'procurement-list-page',
                title    : 'Procurement',
                type     : 'item',
                icon     : 'build',
                url      : '/ipp/procurement',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'ipp-lot-list-page',
                title    : 'Procurement Lot',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/lot',
                permission: ['ipp.p9t.get'],
            },
        ]
    },
    {
        id       : 'commerce',
        title    : 'Commerce',
        type     : 'group',
        children : [
			{
                id       : 'inventory-item-list-page',
                title    : 'Inventario',
                type     : 'item',
                icon     : 'assignment',
                url      : '/commerce/inventory-item',
                permission: ['c6e.admin'],
            },
			{
                id       : 'warehouse-manager',
                title    : 'Manager Magazzino',
                type     : 'item',
                icon     : 'store',
                url      : '/commerce/warehouse-manager',
                permission: ['c6e.admin'],
            },
			{
                id       : 'seller-manager',
                title    : 'Manager Venditore',
                type     : 'item',
                icon     : 'person_pin_circle',
                url      : '/commerce/seller-manager',
                permission: ['c6e.admin'],
            },
            {
                id       : 'catalog-manager',
                title    : 'Manager Catalogo',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/commerce/catalog-manager',
                permission: ['c6e.admin'],
            },
        ]
    },
	{
        id       : 'temp',
        title    : 'Temporanei',
        type     : 'group',
        children : [
            {
                id       : 'price-list-item',
                title    : 'Price list item',
                type     : 'item',
                icon     : 'person_pin_circle',
                url      : '/commerce/price-list-item',
                permission: ['c6e.admin'],
            },
			{
                id       : 'buyer',
                title    : 'Clienti - seller manager',
                type     : 'item',
                icon     : 'person_pin_circle',
                url      : '/commerce/buyer',
                permission: ['c6e.admin'],
            },
            {
                id       : 'purchase',
                title    : 'Vendite - seller manager',
                type     : 'item',
                icon     : 'shopping_bag',
                url      : '/commerce/purchase',
                permission: ['c6e.admin'],
            },
            {
                id       : 'purchase-item',
                title    : 'Purchase item - seller manager - purchase',
                type     : 'item',
                icon     : 'shopping_bag',
                url      : '/commerce/purchase-item',
                permission: ['c6e.admin'],
            },
			{
				id       : 'fiscal-transaction-list-page',
				title    : 'Transazioni Fiscali  - seller manager - purchase',
				type     : 'item',
				icon     : 'how_to_reg',
				url      : '/commerce/fiscal-transaction',
				permission: ['c6e.admin'],
			},
            {
                id       : 'warehouse-handling-item',
                title    : 'Warehouse Handling',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/commerce/warehouse-handling-item',
                permission: ['c6e.admin'],
            },
            /*{
                id       : 'price-list-item',
                title    : 'Price list item',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/commerce/price-list-item',
                permission: ['c6e.admin'],
            },*/
            {
                id       : 'catalog-item',
                title    : 'Catalog item',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/commerce/catalog-item',
                permission: ['c6e.admin'],
            },
        ]
    },
];


