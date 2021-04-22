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
                id       : 'dossier-list-page',
                title    : 'Dossier',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/dossier',
                permission: ['c6e.admin'],
            },
            {
                id       : 'procurement-list-page',
                title    : 'Procurement',
                type     : 'item',
                icon     : 'build',
                url      : '/ipp/procurement',
                permission: ['c6e.admin'],
            },
            {
                id       : 'procurement-lot-list-page',
                title    : 'Procurement Lot',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/procurement-lot',
                permission: ['c6e.admin'],
            },
            {
                id       : 'partecipation-list-page',
                title    : 'Partecipation',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/partecipation',
                permission: ['c6e.admin'],
            },
            {
                id       : 'designated-company-list-page',
                title    : 'Designated Company',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/designated-company',
                permission: ['c6e.admin'],
            },
            {
                id       : 'preparation-list-page',
                title    : 'Preparation',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/preparation',
                permission: ['c6e.admin'],
            },
            {
                id       : 'insurance-policy-list-page',
                title    : 'Insurance Policy',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/insurance-policy',
                permission: ['c6e.admin'],
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
        id       : 'pd',
        title    : 'Public database',
        type     : 'group',
        children : [
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


