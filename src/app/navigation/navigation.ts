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
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'procurement-list-page',
                title    : 'Procurement',
                type     : 'item',
                icon     : 'build',
                url      : '/ipp/procurement',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'procurement-lot-list-page',
                title    : 'Procurement Lot',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/procurement-lot',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'partecipation-list-page',
                title    : 'Partecipation',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/partecipation',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'designated-company-list-page',
                title    : 'Designated Company',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/designated-company',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'preparation-list-page',
                title    : 'Preparation',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/preparation',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'insurance-policy-list-page',
                title    : 'Insurance Policy',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/insurance-policy',
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
        id       : 'i16n',
        title    : 'Itlian Legislation',
        type     : 'group',
        children : [
			{
                id       : 'dettaglio-pagamento',
                title    : 'Dettaglio Pagamento',
                type     : 'item',
                icon     : 'assignment',
                url      : '/i16n/dettaglio-pagamento',
                permission: ['c6e.admin'],
            },
            {
                id       : 'dati-pagamento',
                title    : 'Dati Pagamento',
                type     : 'item',
                icon     : 'assignment',
                url      : '/i16n/dati-pagamento',
                permission: ['c6e.admin'],
            },
            {
                id       : 'fattura-elettronica-body',
                title    : 'Fattura Elettronica',
                type     : 'item',
                icon     : 'assignment',
                url      : '/i16n/fattura-elettronica-body',
                permission: ['c6e.admin'],
            },
            {
                id       : 'dati-veicoli',
                title    : 'Dati Veicoli',
                type     : 'item',
                icon     : 'assignment',
                url      : '/i16n/dati-veicoli',
                permission: ['c6e.admin'],
            },
            {
                id       : 'allegati',
                title    : 'Allegati',
                type     : 'item',
                icon     : 'assignment',
                url      : '/i16n/allegati',
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


