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
						type     : 'item',
						icon     : 'location_city',
						url      : '/s6d/city3',
						permission: ['e4y.account.get'],
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
						id       : 'warehouse',
						title    : 'Magazzino',
						type     : 'item',
						icon     : 'store',
						url      : '/commerce/warehouse',
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
						id       : '',
						title    : 'Cpv',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/cpv',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Ipp Modality',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/ipp-modality',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Ipp Procedure',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/ipp-procedure',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Ipp Sector',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/ipp-sector',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Ipp Lot Type',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/ipp-lot-type',
						permission: ['e4y.account.get'],
					},
					{
						id       : '',
						title    : 'Ipp Lot Category',
						type     : 'item',
						icon     : 'arrow_right',
						url      : '/s6d/ipp-lot-category',
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
						id       : 'context-list',
						title    : 'Ruoli',
						type     : 'item',
						icon     : 'assignment_ind',
						url      : '/m8t/role',
						permission: ['e4y.role.get'],
					},
					{
						id       : 'application-module',
						title    : 'Application Module',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/application-module',
						permission: ['e4y.role.get'],
					},
					{
						id       : 'permission-list',
						title    : 'Permessi',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/permission',
						permission: ['e4y.role.get'],
					},
					{
						id       : 'tenant-context-list-page',
						title    : 'Tenant Context',
						translate: 'NAV.TENANT_CONTEXT_LIST_PAGE',
						type     : 'item',
						icon     : 'star_half',
						url      : '/m8t/tenant-context',
					},
					{
						id       : 'context-module-list-page',
						title    : 'Context Module',
						type     : 'item',
						icon     : 'chrome_reader_mode',
						url      : '/m8t/context-module',
					},
					{
						id       : 'context-list',
						title    : 'Contesti',
						type     : 'item',
						icon     : 'control_camera',
						url      : '/m8t/context'
					},
				]
			},
		]
	},
];