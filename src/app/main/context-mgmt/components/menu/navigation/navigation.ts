import { FuseNavigation } from '@fuse/types';

export const contextNavigation: FuseNavigation[] = [
	{
        id       : 'context',
        title    : 'Context',
        type     : 'group',
        children : [
            {
                id       : 'context-dashboard',
                title    : 'Dashboard',
                type     : 'item',
                icon     : 'person',
                url      : '/context/dashboard',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'modules',
                title    : 'Moduli',
                type     : 'item',
                icon     : 'group',
                url      : '/context/modules',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'billing',
                title    : 'Fatturazione',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/context/billing',
                permission: ['e4y.role.get'],
            },
        ]
    },
    {
        id       : 'iam',
        title    : 'Identity and Access Management',
        translate: 'NAV.IAM',
        type     : 'group',
        children : [
            {
                id       : 'user-list',
                title    : 'Utenti',
                type     : 'item',
                icon     : 'person',
                url      : '/iam/user',
                permission: ['e4y.account.get'],
            },
			{
                id       : 'service-account',
                title    : 'Service Account',
                type     : 'item',
                icon     : 'person',
                url      : '/iam/service-account',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'group-list',
                title    : 'Gruppi',
                type     : 'item',
                icon     : 'group',
                url      : '/iam/group',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'role-list',
                title    : 'Ruoli Personalizzati',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/iam/role',
                permission: ['e4y.role.get'],
            },
        ]
    },
	{
        id       : 'modules-config',
        title    : 'Modules Configuration',
        type     : 'group',
        children : [
            {
                id       : 'generic-config',
                title    : 'Generic Module',
                type     : 'collapsable',
				children : [
					{
						id       : 'generic-config-personalization',
						title    : 'Generic module personalization',
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city3',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'eopoo-type-list-page',
						title    : 'Eopoo Type',
						type     : 'item',
						icon     : 'how_to_reg',
						url      : '/g5c/eopoo-type',
						permission: ['g5c.eopoo-type.post'],
					},
					{
						id       : 'eopoo-config-state',
						title    : 'Eopoo state',
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city2',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'form-type-list-page',
						title    : 'Form Type',
						type     : 'item',
						icon     : 'how_to_reg',
						url      : '/g5c/form-type',
						permission: ['g5c.ui.eopoo.list'],
					},
				]
            },
			{
                id       : 'italian-config',
                title    : 'Italian Module',
                type     : 'collapsable',
				children : [
					{
						id       : 'italian-config-personalization',
						title    : 'Italian module personalization',
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city3',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'ipp-config',
						title    : 'Public Procurement',
						type     : 'collapsable',
						children : [
							{
								id       : 'partecipation-modality-list-page',
								title    : 'Partecipation modality',
								type     : 'item',
								icon     : 'child_care',
								url      : '/ipp/partecipation-modality',
								permission: ['c6e.admin'],
							},
							{
								id       : 'partecipation-status-list-page',
								title    : 'Partecipation Status',
								type     : 'item',
								icon     : 'child_care',
								url      : '/ipp/partecipation-status',
								permission: ['c6e.admin'],
							},
							{
								id       : 'preparation-modality-list-page',
								title    : 'Preparation modality',
								type     : 'item',
								icon     : 'child_care',
								url      : '/ipp/preparation-modality',
								permission: ['c6e.admin'],
							},
							{
								id       : 'preparation-status-list-page',
								title    : 'Preparation Status',
								type     : 'item',
								icon     : 'child_care',
								url      : '/ipp/preparation-status',
								permission: ['c6e.admin'],
							},
							{
								id       : 'insurance-policy-status-list-page',
								title    : 'Insurance Policy Status',
								type     : 'item',
								icon     : 'child_care',
								url      : '/ipp/insurance-policy-status',
								permission: ['c6e.admin'],
							},
						]
					},
					{
						id       : 'fepa-config',
						title    : 'FEPA',
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city2',
						permission: ['e4y.account.get'],
					},
				]
            },
			{
                id       : 'commerce-config',
                title    : 'Commerce Module',
                type     : 'collapsable',
				children : [
					{
						id       : 'commerce-config-personalization',
						title    : 'Commerce module personalization',
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city3',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'seller',
						title    : 'Venditori',
						type     : 'item',
						icon     : 'shopping_basket',
						url      : '/commerce/seller',
						permission: ['c6e.admin'],
					},
					{
						id       : 'warehouse',
						title    : 'Magazzino',
						type     : 'item',
						icon     : 'store',
						url      : '/commerce/warehouse',
						permission: ['c6e.admin'],
					},
					{
						id       : 'catalog',
						title    : 'Cataloghi',
						type     : 'item',
						icon     : 'assignment',
						url      : '/commerce/catalog',
					},
					{
						id       : 'inventory-category',
						title    : 'Categorie inventario',
						type     : 'item',
						icon     : 'format_list_bulleted',
						url      : '/commerce/inventory-category',
						permission: ['c6e.admin'],
					},
					{
						id       : 'producer',
						title    : 'Produttori',
						type     : 'item',
						icon     : 'business',
						url      : '/commerce/producer',
						permission: ['c6e.admin'],
					},
					{
						id       : 'price-list',
						title    : 'Listini prezzi',
						type     : 'item',
						icon     : 'euro_symbol',
						url      : '/commerce/price-list',
						permission: ['c6e.admin'],
					},
				]
            },
		]
	},
	{
        id       : 'public-database',
        title    : 'Public Database',
        type     : 'group',
        children : [
			{
				id       : 'aig-standard',
				title    : 'Aig Standard',
				translate: 'NAV.STANDARD',
				type     : 'collapsable',
				children : [
					{
						id       : '',
						title    : 'City',
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Social',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/social',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Social Action',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/social-action',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'ipp-config',
						title    : 'Public Procurement',
						type     : 'collapsable',
						children : [
							{
								id       : '',
								title    : 'Cpv',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/cpv',
								permission: ['e4y.account.get'],
							},

							{
								id       : '',
								title    : 'Procurement Status',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/procurement-status',
								permission: ['e4y.account.get'],
							},
							{
								id       : '',
								title    : 'Procurement Procedure',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/ipp-procedure',
								permission: ['e4y.account.get'],
							},
							{
								id       : '',
								title    : 'Procurement Modality',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/ipp-modality',
								permission: ['e4y.account.get'],
							},
							{
								id       : '',
								title    : 'Procurement Sector',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/ipp-sector',
								permission: ['e4y.account.get'],
							},

							{
								id       : '',
								title    : 'Procurement Lot Status',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/procurement-lot-status',
								permission: ['e4y.account.get'],
							},
							{
								id       : '',
								title    : 'Procurement Lot Award Criterion',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/award-criterion',
								permission: ['e4y.account.get'],
							},
							{
								id       : '',
								title    : 'Procurement Lot Type',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/ipp-lot-type',
								permission: ['e4y.account.get'],
							},
							{
								id       : '',
								title    : 'Procurement Lot Category',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/ipp-lot-category',
								permission: ['e4y.account.get'],
							},


							{
								id       : '',
								title    : 'Partecipation Type',
								type     : 'item',
								icon     : 'arrow_right',
								url      : '/s6d/partecipation-type',
								permission: ['e4y.account.get'],
							},
						


						]
					},
					{
						id       : '',
						title    : 'Regime Fiscale',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/regime-fiscale',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Tipo Cassa',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/tipo-cassa',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Natura',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/natura',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Tipo Ritenuta',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/tipo-ritenuta',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Tipo Cessione Prestazione',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/tipo-cessione-prestazione',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Tipo Sconto Maggiorazione',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/tipo-sconto-maggiorazione',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Esigibilita Iva',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/esigibilita-iva',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Modalita Pagamento',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/modalita-pagamento',
						permission: ['e4y.account.get'],
					},
				]
			},
			{
				id       : 'management',
				title    : 'Management',
				translate: 'NAV.MANAGEMENT',
				type     : 'collapsable',
				children : [

					{
						id       : 'application-module-list-page',
						title    : 'Application Module',
						type     : 'item',
						icon     : 'list_alt',
						url      : '/m8t/application-module',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'role-list-page',
						title    : 'Ruoli',
						type     : 'item',
						icon     : 'account_circle',
						url      : '/m8t/role',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'permission-list-page',
						title    : 'Permessi',
						type     : 'item',
						icon     : 'lock_open',
						url      : '/m8t/permission',
						permission: ['e4y.account.get'],
					},
					
					{
						id       : 'entity-reference-list-page',
						title    : 'Entity Reference',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/entity-reference',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'type-category-reference-list-page',
						title    : 'Type Category Reference',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/type-category-reference',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'object-reference-list-page',
						title    : 'Object Reference',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/object-reference',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'field-reference-list-page',
						title    : 'Field Reference',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/field-reference',
						permission: ['e4y.account.get'],
					},
					
					{
						id       : 'licence-list-page',
						title    : 'Licenze',
						type     : 'item',
						icon     : 'lock_open',
						url      : '/m8t/licence',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'user-licence-list-page',
						title    : 'User Licence',
						type     : 'item',
						icon     : 'lock_open',
						url      : '/m8t/user-licence',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'tenant-context-list-page',
						title    : 'Tenant Context',
						type     : 'item',
						icon     : 'all_out',
						url      : '/m8t/tenant-context',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'context-module-list-page',
						title    : 'Context Module',
						type     : 'item',
						icon     : 'assignment',
						url      : '/m8t/context-module',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'context-user-list-page',
						title    : 'Contesti',
						type     : 'item',
						icon     : 'filter_vintage',
						url      : '/m8t/context-user',
						permission: ['e4y.account.get'],
					},
					{
						id       : 'personalization-list-page',
						title    : 'Personalizzazione',
						type     : 'item',
						icon     : 'brush',
						url      : '/m8t/personalization',
						permission: ['e4y.account.get'],
					},
				]
			},
			{
				id       : 'Internal Page',
				title    : 'pagine interne',
				translate: 'Pagine interne',
				type     : 'collapsable',
				children : [
					{
						id       : 'address-list-page',
						title    : 'Indirizzi',
						type     : 'item',
						icon     : 'account_circle',
						url      : '/g5c/address',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'contact-list-page',
						title    : 'Contatti',
						type     : 'item',
						icon     : 'account_circle',
						url      : '/g5c/contact',
						permission: ['e4y.account.get'],
					},

					{
						id       : 'referent-list-page',
						title    : 'Referente',
						type     : 'item',
						icon     : 'account_circle',
						url      : '/g5c/referent',
						permission: ['e4y.account.get'],
					},
				]
			}	
		]
	},
];
