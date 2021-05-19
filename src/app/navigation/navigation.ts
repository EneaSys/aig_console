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
            /*{
                id       : 'generic-eopoo-list-page',
                title    : 'Generic Eopoo',
                type     : 'item',
                icon     : 'how_to_reg',
                url      : '/g5c/generic-eopoo',
                permission: ['g5c.eopoo.get'],
            },*/
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
                translate: 'NAV.IPP.PROCUREMENT',
                type     : 'item',
                icon     : 'business_center',
                url      : '/ipp/procurement',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'procurement-lot-list-page',
                title    : 'Procurement Lot',
                translate: 'NAV.IPP.PROCUREMENT-LOT',
                type     : 'item',
                icon     : 'next_week',
                url      : '/ipp/procurement-lot',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'partecipation-list-page',
                title    : 'Partecipation',
                translate: 'NAV.IPP.PARTECIPATION',
                type     : 'item',
                icon     : 'network_locked',
                url      : '/ipp/partecipation',
                permission: ['ipp.p9t.get'],
            }
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
                translate: 'NAV.COMMERCE.INVENTORY',
                type     : 'item',
                icon     : 'assignment',
                url      : '/commerce/inventory-item',
                permission: ['c6e.admin'],
            },
			{
                id       : 'warehouse-manager',
                title    : 'Manager Magazzino',
                translate: 'NAV.COMMERCE.WAREHOUSE_MANAGER',
                type     : 'item',
                icon     : 'store',
                url      : '/commerce/warehouse-manager',
                permission: ['c6e.admin'],
            },
			{
                id       : 'seller-manager',
                title    : 'Manager Venditore',
                translate: 'NAV.COMMERCE.SELLER_MANAGER',
                type     : 'item',
                icon     : 'person_pin_circle',
                url      : '/commerce/seller-manager',
                permission: ['c6e.admin'],
            },
            {
                id       : 'catalog-manager',
                title    : 'Manager Catalogo',
                translate: 'NAV.COMMERCE.CATALOG_MANAGER',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/commerce/catalog-manager',
                permission: ['c6e.admin'],
            },
        ]
    },
    {
        id       : 'pd',
        title    : 'Public database',
        type     : 'group',
        children : [
            {
                id       : 'management-custom',
                title    : 'Management custom page',
                type     : 'item',
                icon     : 'view_carousel',
                url      : '/m8t/management-custom',
                permission: ['c6e.admin'],
            },
            {
                id       : 'standard-custom',
                title    : 'Standard custom page',
                type     : 'item',
                icon     : 'view_carousel',
                url      : '/s6d/standard-custom',
                permission: ['c6e.admin'],
            }
        ]
    },
];


