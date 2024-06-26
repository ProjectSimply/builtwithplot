Vue.component('moosendpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'name', title: 'Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'mobile', title: 'Phone', task: ['subscribe'], required: false, 'description': 'Phone number should be passed with proper country code. For example: "+91xxxxxxxxxx"'}
            ]

        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.fieldLoading = true;

            var fieldData = {
                'action': 'adfoin_get_moosendpro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                    }
                }

                that.fieldLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_moosend_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        if( this.fielddata.listId ) {
            this.getFields();
        }
    },
    template: '#moosendpro-action-template'
});

Vue.component('sendypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe', 'unsubscribe'], required: true, description: ''},
                {type: 'text', value: 'name', title: 'Name', task: ['subscribe'], required: false, description: ''},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe'], required: false, description: ''},
                {type: 'text', value: 'ipaddress', title: 'IP Address', task: ['subscribe'], required: false, description: ''},
                {type: 'text', value: 'referrer', title: 'Referrer', task: ['subscribe'], required: false, description: ''},
                {type: 'text', value: 'custom_fields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key:value format. Example Birthday:2000-12-12. For multiple custom fields use comma to separate. Example Birthday:2000-12-12,City:London,Profession:Teacher. Don\'t use any space.  You can use form fields as value.'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.name == 'undefined') {
            this.fielddata.name = '';
        }
    },
    template: '#sendypro-action-template'
});

Vue.component('sendfoxpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldsLoading: false,
            fields: []

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_sendfox_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        this.fieldsLoading = true;

        var fieldRequestData = {
            'action': 'adfoin_get_sendfoxpro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });

                    that.fieldsLoading = false;
                }
            }
        });
    },
    template: '#sendfoxpro-action-template'
});

Vue.component('pipedrivepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            ownerLoading: false,
            worksheetLoading: false,
            fields: [
                {type: 'text', value: 'note_content', title: 'Content [Note]', task: ['add_ocdna'], required: false, description: ''},
                {type: 'text', value: 'act_subject', title: 'Subject [Activity]', task: ['add_ocdna'], required: false, description: ''},
                {type: 'text', value: 'act_type', title: 'Type [Activity]', task: ['add_ocdna'], required: false, description: 'Example: call, meeting, task, deadline, email, lunch'},
                {type: 'text', value: 'act_due_date', title: 'Due Date [Activity]', task: ['add_ocdna'], required: false, description: 'Format: YYYY-MM-DD'},
                {type: 'text', value: 'act_after_days', title: 'Due Date After X days [Activity]', task: ['add_ocdna'], required: false, description: 'Accepts numeric value. If filled, due date will be calculated and set'},
                {type: 'text', value: 'act_due_time', title: 'Due Time [Activity]', task: ['add_ocdna'], required: false, description: 'Format: HH:MM'},
                {type: 'text', value: 'act_duration', title: 'Duration [Activity]', task: ['add_ocdna'], required: false, description: 'Format: HH:MM'},
                {type: 'text', value: 'act_note', title: 'Note [Activity]', task: ['add_ocdna'], required: false, description: ''},
            ]

        }
    },
    methods: {},
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.duplicate == 'undefined') {
            this.fielddata.duplicate = false;
        }

        if (typeof this.fielddata.duplicate != 'undefined') {
            if(this.fielddata.duplicate == "false") {
                this.fielddata.duplicate = false;
            }
        }

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_pipedrive_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {

            that.fielddata.ownerList = response.data;
            that.ownerLoading = false;
        });

        var orgRequestData = {
            'action': 'adfoin_get_pipedrive_org_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, orgRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_ocdna','add_lead'], required: false, description: single.description } );
                    });
                }
            }
        });

        var personRequestData = {
            'action': 'adfoin_get_pipedrive_person_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, personRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_ocdna','add_lead'], required: false, description: single.description } );
                    });
                }
            }
        });

        var dealRequestData = {
            'action': 'adfoin_get_pipedrive_deal_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, dealRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_ocdna'], required: false, description: single.description } );
                    });
                }
            }
        });

        var leadRequestData = {
            'action': 'adfoin_get_pipedrive_lead_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, leadRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_lead'], required: false, description: single.description } );
                    });
                }
            }
        });
    },
    watch: {},
    template: '#pipedrivepro-action-template'
});

Vue.component('mailblusterpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            fieldsLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['add_contact'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'fullName', title: 'Full Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'timezone', title: 'Timezone', task: ['add_contact'], required: false},
                {type: 'text', value: 'ipAddress', title: 'IP Address', task: ['add_contact'], required: false},
            ]
        }
    },
    methods: {
    },
    created: function() {
    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.doptin == 'undefined') {
            this.fielddata.doptin = false;
        }

        if (typeof this.fielddata.doptin != 'undefined') {
            if(this.fielddata.doptin == "false") {
                this.fielddata.doptin = false;
            }
        }

        this.fieldsLoading = true;

        var fieldRequestData = {
            'action': 'adfoin_mailblusterpro_get_custom_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                    });
                    that.fieldsLoading = false;
                }
            }
        });
    },
    template: '#mailbluster-action-template'
});

Vue.component('zohocrmpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            userLoading: false,
            moduleLoading: false,
            fieldsLoading: false,
            fields: []
 
        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.moduleLoading = true;
            this.fields = [];
 
            var fieldsRequestData = {
                'action': 'adfoin_get_zohocrmpro_module_fields',
                '_nonce': adfoin.nonce,
                'module': this.fielddata.moduleId,
                'credId': this.fielddata.credId,
                'task': this.action.task
            };
 
            jQuery.post( ajaxurl, fieldsRequestData, function( response ) {
 
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
 
                        that.moduleLoading = false;
                    }
                }
            });
        },
        getUsers: function() {
            var that = this;
            this.userLoading = true;
 
            var userRequestData = {
                'action': 'adfoin_get_zohocrm_users',
                'credId': this.fielddata.credId,
                '_nonce': adfoin.nonce
            };
    
            jQuery.post( ajaxurl, userRequestData, function( response ) {
                
                that.fielddata.users = response.data;
                that.userLoading = false;
            });
        },
        getModules: function() {
            var that = this;
            this.moduleLoading = true;
 
            var moduleRequestData = {
                'action': 'adfoin_get_zohocrm_modules',
                'credId': this.fielddata.credId,
                '_nonce': adfoin.nonce
            };
    
            jQuery.post( ajaxurl, moduleRequestData, function( response ) {
                that.fielddata.modules = response.data;
                that.moduleLoading = false;
            });
        }
    },
    created: function() {
 
    },
    mounted: function() {
 
        if (typeof this.fielddata.userId == 'undefined') {
            this.fielddata.userId = '';
        }

        if (typeof this.fielddata.moduleId == 'undefined') {
            this.fielddata.moduleId = '';
        }

        if (typeof this.fielddata.duplicate == 'undefined') {
            this.fielddata.duplicate = false;
        }

        if (typeof this.fielddata.duplicate != 'undefined') {
            if(this.fielddata.duplicate == "false") {
                this.fielddata.duplicate = false;
            }
        }

        if (typeof this.fielddata.credId == 'undefined') {
            this.fielddata.credId = '123456';
        }

        if( this.fielddata.credId ) {
            this.getUsers();
        }

        if( this.fielddata.credId && this.fielddata.userId ) {
            this.getModules();
        }

        if( this.fielddata.credId && this.fielddata.userId && this.fielddata.moduleId ) {
            this.getFields();
        }
       
    },
    watch: {},
    template: '#zohocrmpro-action-template'
});

Vue.component('zohodeskpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            organizationLoading: false,
            departmentLoading: false,
            ownerLoading: false,
            fields: []
 
        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.departmentLoading = true;
            this.fields = [];
 
            var fieldsRequestData = {
                'action': 'adfoin_get_zohodeskpro_fields',
                '_nonce': adfoin.nonce,
                'orgId': this.fielddata.orgId,
                'departmentId': this.fielddata.departmentId,
                'credId': this.fielddata.credId,
                'task': this.action.task
            };
 
            jQuery.post( ajaxurl, fieldsRequestData, function( response ) {
 
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
 
                        that.departmentLoading = false;
                    }
                }
            });
        },
        getOrganizations: function() {
            var that = this;

            this.organizationLoading = true;
 
            var orgRequestData = {
                'action': 'adfoin_get_zohodesk_organizations',
                'credId': this.fielddata.credId,
                '_nonce': adfoin.nonce
            };
            
            jQuery.post( ajaxurl, orgRequestData, function( response ) {
                that.fielddata.organizations = response.data;
                that.organizationLoading = false;
            });

            this.getOwners();
        },
        getDepartments: function() {
            var that = this;
            this.departmentLoading = true;
 
            var departmentRequestData = {
                'action': 'adfoin_get_zohodesk_departments',
                'credId': this.fielddata.credId,
                'orgId': this.fielddata.orgId,
                '_nonce': adfoin.nonce
            };
 
            jQuery.post( ajaxurl, departmentRequestData, function( response ) {
                that.fielddata.departments = response.data;
                that.departmentLoading = false;
            });
        },
        getOwners: function() {
            var that = this;

            this.ownerLoading = true;
 
            var ownerRequestData = {
                'action': 'adfoin_get_zohodesk_owners',
                'credId': this.fielddata.credId,
                '_nonce': adfoin.nonce
            };
            
            jQuery.post( ajaxurl, ownerRequestData, function( response ) {
                that.fielddata.owners = response.data;
                that.ownerLoading = false;
            });
        },
    },
    created: function() {
        if( this.fielddata.credId && this.fielddata.orgId ) {
            this.getDepartments();
        }
    },
    mounted: function() {
        var that = this;
 
        if (typeof this.fielddata.orgId == 'undefined') {
            this.fielddata.orgId = '';
        }

        if (typeof this.fielddata.departmentId == 'undefined') {
            this.fielddata.departmentId = '';
        }

        if (typeof this.fielddata.credId == 'undefined') {
            this.fielddata.credId = '';
        }

        if (typeof this.fielddata.ownerId == 'undefined') {
            this.fielddata.ownerId = '';
        }

        if( this.fielddata.credId ) {
            this.getOrganizations();
        }

        if( this.fielddata.credId && this.fielddata.orgId && this.fielddata.departmentId ) {
            this.getFields();
        }
    },
    template: '#zohodeskpro-action-template'
});

Vue.component('biginpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            userLoading: false,
            moduleLoading: false,
            fieldsLoading: false,
            fields: []
 
        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.moduleLoading = true;
            this.fields = [];
 
            var fieldsRequestData = {
                'action': 'adfoin_get_biginpro_module_fields',
                '_nonce': adfoin.nonce,
                'module': this.fielddata.moduleId,
                'task': this.action.task
            };
 
            jQuery.post( ajaxurl, fieldsRequestData, function( response ) {
 
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
 
                        that.moduleLoading = false;
                    }
                }
            });
        }
    },
    created: function() {
 
    },
    mounted: function() {
        var that = this;
 
        if (typeof this.fielddata.userId == 'undefined') {
            this.fielddata.userId = '';
        }

        if (typeof this.fielddata.moduleId == 'undefined') {
            this.fielddata.moduleId = '';
        }
 
        this.userLoading = true;
 
        var userRequestData = {
            'action': 'adfoin_get_bigin_users',
            '_nonce': adfoin.nonce
        };
 
        jQuery.post( ajaxurl, userRequestData, function( response ) {
            
            that.fielddata.users = response.data;
            that.userLoading = false;
        });

        this.moduleLoading = true;
 
        var moduleRequestData = {
            'action': 'adfoin_get_bigin_modules',
            '_nonce': adfoin.nonce
        };
 
        jQuery.post( ajaxurl, moduleRequestData, function( response ) {
            that.fielddata.modules = response.data;
            that.moduleLoading = false;
        });

        if( this.fielddata.moduleId ) {
            this.getFields();
        }
       
    },
    watch: {},
    template: '#biginpro-action-template'
});

Vue.component('salesflarepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            ownerLoading: false,
            fieldsLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            this.fields = [];
            var that = this;
            this.fieldsLoading = true;
            var selectedObjects = [];
            if(this.fielddata.account__chosen) {selectedObjects.push('account')}
            if(this.fielddata.contact__chosen) {selectedObjects.push('contact')}
            if(this.fielddata.opportunity__chosen) {selectedObjects.push('opportunity')}
            if(this.fielddata.task__chosen) {selectedObjects.push('task')}

            var allFieldsRequestData = {
                'action': 'adfoin_get_salesflarepro_all_fields',
                '_nonce': adfoin.nonce,
                'selectedObjects': selectedObjects,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, allFieldsRequestData, function( response ) {

                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_data'], required: false, description: single.description } );
                        });

                        that.fieldsLoading = false;
                    }
                }
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_salesflare_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {

            that.fielddata.ownerList = response.data;
            that.ownerLoading = false;
        });

        if (typeof this.fielddata.account__chosen == 'undefined') {
            this.fielddata.account__chosen = false;
        }

        if (typeof this.fielddata.account__chosen != 'undefined') {
            this.fielddata.account__chosen = (this.fielddata.account__chosen === "true");
        }

        if (typeof this.fielddata.contact__chosen == 'undefined') {
            this.fielddata.contact__chosen = false;
        }

        if (typeof this.fielddata.contact__chosen != 'undefined') {
            this.fielddata.person__chosen = (this.fielddata.contact__chosen === "true");
        }

        if (typeof this.fielddata.opportunity__chosen == 'undefined') {
            this.fielddata.opportunity__chosen = false;
        }

        if (typeof this.fielddata.opportunity__chosen != 'undefined') {
            this.fielddata.opportunity__chosen = (this.fielddata.opportunity__chosen === "true");
        }

        if (typeof this.fielddata.task__chosen == 'undefined') {
            this.fielddata.task__chosen = false;
        }

        if (typeof this.fielddata.task__chosen != 'undefined') {
            this.fielddata.task__chosen = (this.fielddata.task__chosen === "true");
        }

        if( this.fielddata.account__chosen || this.fielddata.contact__chosen || this.fielddata.opportunity__chosen || this.fielddata.task__chosen ) {
            this.getFields();
        }

        
    },
    watch: {},
    template: '#salesflarepro-action-template'
});

Vue.component('closepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            ownerLoading: false,
            fieldsLoading: false,
            fields: []

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_close_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {

            that.fielddata.ownerList = response.data;
            that.ownerLoading = false;
        });

        this.fieldsLoading = true;

        var allRequestData = {
            'action': 'adfoin_get_closepro_all_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, allRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_lead'], required: false, description: single.description } );
                    });
                    that.fieldsLoading = false;
                }
            }
        });
    },
    template: '#closepro-action-template'
});

Vue.component('constantcontactpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            // tagsLoading: false,
            cfLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe', 'unsubscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'jobTitle', title: 'Job Title', task: ['subscribe'], required: false},
                {type: 'text', value: 'companyName', title: 'Company Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'phoneNumber', title: 'Work Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'homePhone', title: 'Home Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'mobilePhone', title: 'Mobile Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'birthdayMonth', title: 'Birthday Month', task: ['subscribe'], required: false},
                {type: 'text', value: 'birthdayDay', title: 'Birthday Day', task: ['subscribe'], required: false},
                {type: 'text', value: 'anniversary', title: 'Anniversary', task: ['subscribe'], required: false},
                {type: 'text', value: 'addressType', title: 'Address Type', task: ['subscribe'], required: false, description: 'home, work, other'},
                {type: 'text', value: 'address1', title: 'Address Line 1', task: ['subscribe'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['subscribe'], required: false},
                {type: 'text', value: 'state', title: 'State', task: ['subscribe'], required: false},
                {type: 'text', value: 'zip', title: 'ZIP', task: ['subscribe'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe'], required: false},
                {type: 'text', value: 'tags', title: 'Tags', task: ['subscribe'], required: false, description: 'Use comma for multiple tags'}
            ]
        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.permission == 'undefined') {
            this.fielddata.permission = 'explicit';
        }

        if (typeof this.fielddata.createSource == 'undefined') {
            this.fielddata.createSource = 'Account';
        }

        if (typeof this.fielddata.tagId == 'undefined') {
            this.fielddata.tagId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_constantcontact_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        // this.tagsLoading = true;

        // var tagsRequestData = {
        //     'action': 'adfoin_get_constantcontactpro_tags',
        //     '_nonce': adfoin.nonce
        // };

        // jQuery.post( ajaxurl, tagsRequestData, function( response ) {
        //     that.fielddata.tags = response.data;
        //     that.tagsLoading = false;
        // });

        this.cfLoading = true;

        var cfRequestData = {
            'action': 'adfoin_get_constantcontactpro_custom_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, cfRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push({type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                    that.cfLoading = false;
                }
            }
        });
    },
    template: '#constantcontactpro-action-template'
});

Vue.component('verticalresponsepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'first_name', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'last_name', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'home_phone', title: 'Home Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'mobile_phone', title: 'Mobile Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'work_phone', title: 'Work Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'fax', title: 'Fax', task: ['subscribe'], required: false},
                {type: 'text', value: 'birthdate', title: 'Birth Date', task: ['subscribe'], required: false},
                {type: 'text', value: 'gender', title: 'Gender', task: ['subscribe'], required: false},
                {type: 'text', value: 'marital_status', title: 'Marital Status', task: ['subscribe'], required: false},
                {type: 'text', value: 'company', title: 'Company', task: ['subscribe'], required: false},
                {type: 'text', value: 'title', title: 'Title', task: ['subscribe'], required: false},
                {type: 'text', value: 'website', title: 'Website', task: ['subscribe'], required: false},
                {type: 'text', value: 'street_address', title: 'Street Address', task: ['subscribe'], required: false},
                {type: 'text', value: 'extended_address', title: 'Extended Address', task: ['subscribe'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['subscribe'], required: false},
                {type: 'text', value: 'state', title: 'state', task: ['subscribe'], required: false},
                {type: 'text', value: 'postal_code', title: 'Postal Code', task: ['subscribe'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe'], required: false},
            ]
        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_verticalresponse_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        this.fieldLoading = true;

        var fieldRequestData = {
            'action': 'adfoin_get_verticalresponsepro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                    that.fieldLoading = false;
                }
            }
        });
    },
    template: '#verticalresponsepro-action-template'
});

Vue.component('mailjetpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: []

        }
    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailjet_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var fieldRequestData = {
            'action': 'adfoin_get_mailjetpro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                    that.fieldLoading = false;
                }
            }
        });
    },
    template: '#mailjetpro-action-template'
});

Vue.component('mailifypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            this.fields = [];
            var that = this;
            this.listLoading = true;

            var fieldData = {
                'action': 'adfoin_get_mailifypro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                        that.listLoading = false;
                    }
                }
            });
        }
    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailify_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#mailifypro-action-template'
});

Vue.component('getresponsepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            tagLoading: false,
            fields: []

        }
    },
    methods: {},
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.tagId == 'undefined') {
            this.fielddata.tagId = '';
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        if (typeof this.fielddata.autoresponder == 'undefined') {
            this.fielddata.autoresponder = false;
        }

        if (typeof this.fielddata.autoresponder != 'undefined') {
            if(this.fielddata.autoresponder == "false") {
                this.fielddata.autoresponder = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_getresponse_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var contactRequestData = {
            'action': 'adfoin_get_getresponsepro_contact_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, contactRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }
        });

        this.tagLoading = true;

        var tagRequestData = {
            'action': 'adfoin_get_getresponsepro_tags',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, tagRequestData, function( response ) {
            that.fielddata.tag = response.data;
            that.tagLoading = false;
        });
    },
    template: '#getresponsepro-action-template'
});

Vue.component('engagebaypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: true},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'phone', title: 'Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'role', title: 'Role', task: ['subscribe'], required: false},
                {type: 'text', value: 'website', title: 'Website', task: ['subscribe'], required: false},
                {type: 'text', value: 'address', title: 'Address', task: ['subscribe'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['subscribe'], required: false},
                {type: 'text', value: 'sate', title: 'State', task: ['subscribe'], required: false},
                {type: 'text', value: 'zip', title: 'Zip', task: ['subscribe'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe'], required: false},
                {type: 'text', value: 'company', title: 'Company', task: ['subscribe'], required: false},
                {type: 'text', value: 'tags', title: 'Tags', task: ['subscribe'], required: false, description: 'Use comma to add multiple tags (without space)'},
            ]
        }
    },
    methods: {},
    created: function() {},
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_engagebay_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        this.fieldLoading = true;

        var fieldRequestData = {
            'action': 'adfoin_get_engagebay_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });

                    that.fieldLoading = false;
                }
            }
        });
    },
    template: '#engagebaypro-action-template'
});

Vue.component('copperpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            ownerLoading: false,
            fieldsLoading: false,
            fields: []
        }
    },
    methods: {},
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_copper_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {

            that.fielddata.ownerList = response.data;
        });

        var companyRequestData = {
            'action': 'adfoin_get_copperpro_all_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, companyRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                    });

                    that.ownerLoading = false;
                }
            }
        });

        var leadRequestData = {
            'action': 'adfoin_get_copperpro_lead_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, leadRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_lead'], required: false, description: single.description } );
                    });

                    that.ownerLoading = false;
                }
            }
        });

    },
    watch: {},
    template: '#copperpro-action-template'
});

Vue.component('hubspotpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            userLoading: false,
            fieldsLoading: false,
            objectLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.objectLoading = true;
            this.fields = [];
 
            var fieldsRequestData = {
                'action': 'adfoin_get_hubspotpro_object_fields',
                '_nonce': adfoin.nonce,
                'object': this.fielddata.objectId,
                'task': this.action.task
            };
 
            jQuery.post( ajaxurl, fieldsRequestData, function( response ) {
 
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: single.type ? single.type : 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                        });
 
                        that.objectLoading = false;
                    }
                }
            });
        }
    },
    created: function() {

    },
    mounted: function() {

        var that = this;
 
        if (typeof this.fielddata.userId == 'undefined') {
            this.fielddata.userId = '';
        }

        if (typeof this.fielddata.objectId == 'undefined') {
            this.fielddata.objectId = '';
        }
 
        this.userLoading = true;
 
        var userRequestData = {
            'action': 'adfoin_get_hubspotpro_users',
            '_nonce': adfoin.nonce
        };
 
        jQuery.post( ajaxurl, userRequestData, function( response ) {
            that.fielddata.users = response.data;
            that.userLoading = false;
        });

        if( this.fielddata.objectId ) {
            this.getFields();
        }

    },
    watch: {},
    template: '#hubspotpro-action-template'
});

Vue.component('capsulecrmpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            ownerLoading: false,
            fieldsLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            this.fields = [];
            var that = this;
            this.fieldsLoading = true;
            var selectedObjects = [];
            if(this.fielddata.organisation__chosen) {selectedObjects.push('organisation')}
            if(this.fielddata.person__chosen) {selectedObjects.push('person')}
            if(this.fielddata.opportunity__chosen) {selectedObjects.push('opportunity')}
            if(this.fielddata.case__chosen) {selectedObjects.push('case')}
            if(this.fielddata.task__chosen) {selectedObjects.push('task')}

            var allFieldsRequestData = {
                'action': 'adfoin_get_capsulecrmpro_all_fields',
                '_nonce': adfoin.nonce,
                'selectedObjects': selectedObjects,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, allFieldsRequestData, function( response ) {

                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_party'], required: false, description: single.description } );
                        });

                        that.fieldsLoading = false;
                    }
                }
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_capsulecrm_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {

            that.fielddata.ownerList = response.data;
            that.ownerLoading = false;
        });

        if (typeof this.fielddata.organisation__chosen == 'undefined') {
            this.fielddata.organisation__chosen = false;
        }

        if (typeof this.fielddata.organisation__chosen != 'undefined') {
            this.fielddata.organisation__chosen = (this.fielddata.organisation__chosen === "true");
        }

        if (typeof this.fielddata.person__chosen == 'undefined') {
            this.fielddata.person__chosen = false;
        }

        if (typeof this.fielddata.person__chosen != 'undefined') {
            this.fielddata.person__chosen = (this.fielddata.person__chosen === "true");
        }

        if (typeof this.fielddata.opportunity__chosen == 'undefined') {
            this.fielddata.opportunity__chosen = false;
        }

        if (typeof this.fielddata.opportunity__chosen != 'undefined') {
            this.fielddata.opportunity__chosen = (this.fielddata.opportunity__chosen === "true");
        }

        if (typeof this.fielddata.case__chosen == 'undefined') {
            this.fielddata.case__chosen = false;
        }

        if (typeof this.fielddata.case__chosen != 'undefined') {
            this.fielddata.case__chosen = (this.fielddata.case__chosen === "true");
        }

        if (typeof this.fielddata.task__chosen == 'undefined') {
            this.fielddata.task__chosen = false;
        }

        if (typeof this.fielddata.task__chosen != 'undefined') {
            this.fielddata.task__chosen = (this.fielddata.task__chosen === "true");
        }

        if( this.fielddata.organisation__chosen || this.fielddata.person__chosen || this.fielddata.opportunity__chosen || this.fielddata.case__chosen || this.fielddata.task__chosen ) {
            this.getFields();
        }

        
    },
    watch: {},
    template: '#capsulecrmpro-action-template'
});

Vue.component('insightlypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            ownerLoading: false,
            fieldsLoading: false,
            fields: []
        }
    },
    methods: {},
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_insightly_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {
            that.fielddata.ownerList = response.data;
        });

        var allRequestData = {
            'action': 'adfoin_get_insightlypro_all_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, allRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                    });

                    that.ownerLoading = false;
                }
            }
        });

    },
    watch: {},
    template: '#insightlypro-action-template'
});

Vue.component('zohocampaignspro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: []
        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_zohocampaigns_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var fieldRequestData = {
            'action': 'adfoin_get_zohocampaigns_contact_fifelds',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });

                    that.fieldLoading = false;
                }
            }
        });
    },
    template: '#zohocampaignspro-action-template'
});

Vue.component('omnisendpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['add_contact'], required: false},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'phone', title: 'Phone', task: ['add_contact'], required: false},
                {type: 'text', value: 'address', title: 'Address', task: ['add_contact'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['add_contact'], required: false},
                {type: 'text', value: 'state', title: 'State', task: ['add_contact'], required: false},
                {type: 'text', value: 'zip', title: 'ZIP', task: ['add_contact'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['add_contact'], required: false},
                {type: 'text', value: 'birthday', title: 'Birthday', task: ['add_contact'], required: false, description: 'required format YYYY-MM-DD'},
                {type: 'text', value: 'gender', title: 'Gender', task: ['add_contact'], required: false, description: 'e.g. Male, Female'},
                {type: 'text', value: 'tags', title: 'Tags', task: ['add_contact'], required: false, description: 'For multiple values use comma without space. Ex: tag1,tag2,tag3'},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['add_contact'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use pipe, example: Age=25|Country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;


        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }
    },
    template: '#omnisendpro-action-template'
});

Vue.component('activecampaignpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            automationLoading: false,
            pipelineLoading: false,
            accountLoading: false,
            fields: []

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.automationId == 'undefined') {
            this.fielddata.automationId = '';
        }

        if (typeof this.fielddata.accountId == 'undefined') {
            this.fielddata.accountId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }

        if (typeof this.fielddata.phoneNumber == 'undefined') {
            this.fielddata.phoneNumber = '';
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        this.listLoading = true;
        this.automationLoading = true;
        this.pipelineLoading = true;
        this.accountLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_activecampaignpro_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var automationRequestData = {
            'action': 'adfoin_get_activecampaign_automations',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, automationRequestData, function( response ) {
            that.fielddata.automations = response.data;
            that.automationLoading = false;
        });

        var accountRequestData = {
            'action': 'adfoin_get_activecampaign_accounts',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, accountRequestData, function( response ) {
            that.fielddata.accounts = response.data;
            that.accountLoading = false;
        });

        var contactRequestData = {
            'action': 'adfoin_get_activecampaignpro_contact_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, contactRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }
        });

        var dealRequestData = {
            'action': 'adfoin_get_activecampaignpro_deal_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, dealRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }
        });
    },
    template: '#activecampaignpro-action-template'
});

Vue.component('roblypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldsLoading: false,
            fields: []

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_robly_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var fieldRequestData = {
            'action': 'adfoin_get_roblypro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                    that.fieldLoading = false;
                }
            }
        });
    },
    template: '#roblypro-action-template'
});

Vue.component('selzypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldsLoading: false,
            fields: [
                // {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                // {type: 'text', value: 'name', title: 'Name', task: ['subscribe'], required: false},
                // {type: 'text', value: 'phone', title: 'Phone Number', task: ['subscribe'], required: false}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.doubleOptin == 'undefined') {
            this.fielddata.doubleOptin = false;
        }

        if (typeof this.fielddata.doubleOptin != 'undefined') {
            if(this.fielddata.doubleOptin == "false") {
                this.fielddata.doubleOptin = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_selzy_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        this.fieldsLoading = true;

        var fieldRequestData = {
            'action': 'adfoin_get_selzypro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                    that.fieldsLoading = false;
                }
            }
        });
    },
    template: '#selzypro-action-template'
});

Vue.component('mailercloudpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: []

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailercloud_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var fieldRequestData = {
            'action': 'adfoin_get_mailercloudpro_contact_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }
        });
    },
    template: '#mailercloudpro-action-template'
});

Vue.component('sendxpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'company', title: 'Company', task: ['subscribe'], required: false},
                {type: 'text', value: 'birthday', title: 'Birthday', task: ['subscribe'], required: false, description: 'YYYY-MM-DD'},
                {type: 'text', value: 'tags', title: 'Tags', task: ['subscribe'], required: false, description: 'For multiple values use comma without space. Ex: tag1,tag2,tag3'},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use double pipe, example: Age=25||Country=USA (without space)'},
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {},
    template: '#sendxpro-action-template'
});

Vue.component('asanapro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            workspaceLoading: false,
            projectLoading: false,
            sectionLoading: false,
            userLoading: false,
            customFieldsLoading: false,
            fields: [
                {type: 'text', value: 'name', title: 'Name', task: ['create_task'], required: true},
                {type: 'textarea', value: 'notes', title: 'Notes', task: ['create_task'], required: false},
                {type: 'text', value: 'dueOn', title: 'Due On', task: ['create_task'], required: false, description: 'Use YYYY-MM-DD format'},
                {type: 'text', value: 'dueOnX', title: 'Due After X Days', task: ['create_task'], required: false, description: 'Accepts numeric value. If filled, due date will be calculated and set'},
            ]

        }
    },
    methods: {
        getProjects: function() {
            var that = this;
            this.projectLoading = true;
            this.userLoading = true;

            var projectData = {
                'action': 'adfoin_get_asana_projects',
                '_nonce': adfoin.nonce,
                'workspaceId': this.fielddata.workspaceId
            };

            jQuery.post( ajaxurl, projectData, function( response ) {
                var projects = response.data;
                that.fielddata.projects = projects;
                that.projectLoading = false;
            });

            var userData = {
                'action': 'adfoin_get_asana_users',
                '_nonce': adfoin.nonce,
                'workspaceId': this.fielddata.workspaceId
            };

            jQuery.post( ajaxurl, userData, function( response ) {
                var users = response.data;
                that.fielddata.users = users;
                that.userLoading = false;
            });
        },
        getSections: function() {
            var that = this;

            this.customFieldsLoading = true;

            var fieldData = {
                'action': 'adfoin_get_asanapro_custom_fields',
                '_nonce': adfoin.nonce,
                'projectId': this.fielddata.projectId
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['create_task'], required: false, description: single.description } );
                        });
                    }
                }
                that.customFieldsLoading = false;
            });


            this.sectionLoading = true;

            var sectionData = {
                'action': 'adfoin_get_asana_sections',
                '_nonce': adfoin.nonce,
                'projectId': this.fielddata.projectId
            };

            jQuery.post( ajaxurl, sectionData, function( response ) {
                var sections = response.data;
                that.fielddata.sections = sections;
                that.sectionLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.workspaceId == 'undefined') {
            this.fielddata.workspaceId = '';
        }

        if (typeof this.fielddata.projectId == 'undefined') {
            this.fielddata.projectId = '';
        }

        if (typeof this.fielddata.sectionId == 'undefined') {
            this.fielddata.sectionId = '';
        }

        if (typeof this.fielddata.userId == 'undefined') {
            this.fielddata.userId = '';
        }

        this.workspaceLoading = true;

        var workspaceRequestData = {
            'action': 'adfoin_get_asana_workspaces',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, workspaceRequestData, function( response ) {
            that.fielddata.workspaces = response.data;
            that.workspaceLoading = false;
        });

        if( this.fielddata.workspaceId ) {
            this.getProjects();
        }

        if( this.fielddata.workspaceId && this.fielddata.projectId ) {
            this.getSections();
        }
    },
    template: '#asanapro-action-template'
});

Vue.component('mailerlitepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: []

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.doubleoptin != 'undefined') {
            if(this.fielddata.doubleoptin == "false") {
                this.fielddata.doubleoptin = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailerlite_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var customFieldData = {
            'action': 'adfoin_get_mailerlitepro_custom_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, customFieldData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }
        });
    },
    template: '#mailerlitepro-action-template'
});

Vue.component('mailerlite2pro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldsLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'status', title: 'Status', task: ['subscribe'], required: false, description: 'active | unsubscribed | unconfirmed | bounced | junk'},
                {type: 'text', value: 'ip_address', title: 'IP Address', task: ['subscribe'], required: false}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailerlite2_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        this.fieldsLoading = true;

        var customFieldData = {
            'action': 'adfoin_get_mailerlite2pro_custom_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, customFieldData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });

                    that.fieldsLoading = false;
                }
            }
        });
    },
    template: '#mailerlite2pro-action-template'
});

Vue.component('woodpeckerpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'company', title: 'Company', task: ['subscribe'], required: false},
                {type: 'text', value: 'industry', title: 'Industry', task: ['subscribe'], required: false},
                {type: 'text', value: 'website', title: 'Website', task: ['subscribe'], required: false},
                {type: 'text', value: 'tags', title: 'Tags', task: ['subscribe'], required: false},
                {type: 'text', value: 'title', title: 'Title', task: ['subscribe'], required: false},
                {type: 'text', value: 'phone', title: 'Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['subscribe'], required: false},
                {type: 'text', value: 'state', title: 'State', task: ['subscribe'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe'], required: false},
                {type: 'text', value: 'status', title: 'Status', task: ['subscribe'], required: false, description: 'ACTIVE | BLACKLIST | REPLIED | INVALID | BOUNCED'},
                {type: 'text', value: 'snippet1', title: 'Snippet1', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet2', title: 'Snippet2', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet3', title: 'Snippet3', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet4', title: 'Snippet4', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet5', title: 'Snippet5', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet6', title: 'Snippet6', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet7', title: 'Snippet7', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet8', title: 'Snippet8', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet9', title: 'Snippet9', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet10', title: 'Snippet10', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet11', title: 'Snippet11', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet12', title: 'Snippet12', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet13', title: 'Snippet13', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet14', title: 'Snippet14', task: ['subscribe'], required: false},
                {type: 'text', value: 'snippet15', title: 'Snippet15', task: ['subscribe'], required: false}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_woodpreckerpro_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#woodpeckerpro-action-template'
});

Vue.component('aweberpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            accountLoading: false,
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe', 'unsubscribe'], required: true},
                {type: 'text', value: 'name', title: 'Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'ipAddress', title: 'IP Address', task: ['subscribe'], required: false},
                {type: 'text', value: 'adTracking', title: 'Ad Tracking', task: ['subscribe'], required: false},
                {type: 'text', value: 'miscNotes', title: 'Additional Notes', task: ['subscribe'], required: false},
                {type: 'text', value: 'tags', title: 'Tags', task: ['subscribe'], required: false, description: 'For multiple values use comma without space. Ex: tag1,tag2,tag3'},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use double pipe, example: Age=25||Country=USA (without space)'}
            ]

        }
    },
    methods: {
        getLists: function() {
            var that = this;
            this.listLoading = true;

            var listData = {
                'action': 'adfoin_get_aweber_lists',
                '_nonce': adfoin.nonce,
                'accountId': this.fielddata.accountId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {
                var lists = response.data;
                that.fielddata.lists = lists;
                that.listLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.accounts == 'undefined') {
            this.fielddata.accounts = '';
        }

        if (typeof this.fielddata.accountId == 'undefined') {
            this.fielddata.accountId = '';
        }

        if (typeof this.fielddata.lists == 'undefined') {
            this.fielddata.lists = '';
        }

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        this.accountLoading = true;

        var accountRequestData = {
            'action': 'adfoin_get_aweber_accounts',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, accountRequestData, function( response ) {
            that.fielddata.accounts = response.data;
            that.accountLoading = false;
        });

        if( this.fielddata.accountId ) {
            this.getLists();
        }
    },
    template: '#aweberpro-action-template'
});

Vue.component('campaignmonitorpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            accountLoading: false,
            listLoading: false,
            fieldLoading: false,
            fields: [
                // {type: 'text', value: 'email', title: 'Email', task: ['create_subscriber'], required: true},
                // {type: 'text', value: 'name', title: 'Name', task: ['create_subscriber'], required: false},
                // {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['create_subscriber'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use pipe, example: Age=25|Country=USA (without space)'}
            ]
        }
    },
    methods: {
        getList: function() {
            var that = this;
            this.listLoading = true;

            var listData = {
                'action': 'adfoin_get_campaignmonitor_list',
                '_nonce': adfoin.nonce,
                'accountId': this.fielddata.accountId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {
                var list = response.data;
                that.fielddata.list = list;
                that.listLoading = false;
            });
        },
        getFields: function() {
            var that = this;
            this.fieldLoading = true;

            var fieldData = {
                'action': 'adfoin_get_campaignmonitorpro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        // empty fields
                        that.fields = [];
                        response.data.map(function(single) {
                            that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['create_subscriber'], required: false, description: single.description } );
                        });
                    }
                }

                that.fieldLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.accountId == 'undefined') {
            this.fielddata.accountId = '';
        }

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.name == 'undefined') {
            this.fielddata.name = '';
        }

        this.accountLoading = true;

        var accountRequestData = {
            'action': 'adfoin_get_campaignmonitor_accounts',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, accountRequestData, function( response ) {
            that.fielddata.accounts = response.data;
            that.accountLoading = false;
        });

        if(this.fielddata.accountId){
            this.getList();
        }

        if( this.fielddata.listId ) {
            this.getFields();
        }
    },
    template: '#campaignmonitorpro-action-template'
});

Vue.component('convertkitpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            tagLoading: false,
            formsLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use pipe, example: Age=25|Country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.tags == 'undefined') {
            this.fielddata.tags = '';
        }

        if (typeof this.fielddata.tagList == 'undefined') {
            this.fielddata.tagList = '';
        }

        if (typeof this.fielddata.formId == 'undefined') {
            this.fielddata.formId = '';
        }

        this.listLoading = true;
        this.tagLoading  = true;

        var listRequestData = {
            'action': 'adfoin_get_convertkit_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        var tagRequestData = {
            'action': 'adfoin_get_convertkitpro_tags',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, tagRequestData, function( response ) {
            that.fielddata.tagList = response.data;
            that.tagLoading = false;
        });

        this.formsLoading = true;

        var formsRequestData = {
            'action': 'adfoin_get_convertkit_forms',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, formsRequestData, function( response ) {
            that.fielddata.forms = response.data;
            that.formsLoading = false;
        });
    },
    template: '#convertkitpro-action-template'
});

Vue.component('klaviyopro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'event', title: 'Event Name', task: ['track'], required: false, description: 'Name of the event you want to track'},
                {type: 'text', value: 'value', title: 'Value', task: ['track'], required: false, description: 'A numeric value to associate with this event (e.g. the dollar value of a purchase)'},
                {type: 'text', value: 'eventId', title: 'Event ID', task: ['track'], required: false, description: 'A unique identifier for an event'},
                {type: 'text', value: 'time', title: 'Time', task: ['track'], required: false, description: '10-digit UNIX timestamp'},
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe','track', 'identify'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe','track', 'identify'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe','track', 'identify'], required: false},
                {type: 'text', value: 'title', title: 'Title', task: ['subscribe'], required: false},
                {type: 'text', value: 'organization', title: 'Organization', task: ['subscribe'], required: false},
                {type: 'text', value: 'phoneNumber', title: 'Phone Number', task: ['subscribe','track', 'identify'], required: false, description: 'Should be passed with proper country code. For example: "+91xxxxxxxxxx"'},
                {type: 'text', value: 'ip', title: 'IP', task: ['subscribe'], required: false},
                {type: 'text', value: 'address1', title: 'Address 1', task: ['subscribe'], required: false},
                {type: 'text', value: 'address2', title: 'Address 2', task: ['subscribe'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['subscribe','track', 'identify'], required: false},
                {type: 'text', value: 'region', title: 'Region', task: ['subscribe','track', 'identify'], required: false},
                {type: 'text', value: 'zip', title: 'ZIP', task: ['subscribe','track', 'identify'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe','track', 'identify'], required: false},
                {type: 'text', value: 'latitude', title: 'Latitude', task: ['subscribe'], required: false},
                {type: 'text', value: 'longitude', title: 'Longitude', task: ['subscribe'], required: false},
                {type: 'text', value: 'timezone', title: 'Timezone', task: ['subscribe'], required: false, description: 'e.g. Asia/Dhaka'},
                {type: 'text', value: 'externalId', title: 'External ID', task: ['subscribe'], required: false},
                {type: 'text', value: 'source', title: 'Source', task: ['subscribe'], required: false},
                {type: 'text', value: 'customFields', title: 'Custom Properties', task: ['subscribe'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use double pipe as separator, example: Age=25||Country=USA (without space)'},
                {type: 'text', value: 'image', title: 'Image', task: ['track', 'identify'], required: false, description: 'URL to a photo of a person'},
                {type: 'text', value: 'cus_prop', title: 'Additional Customer Properties', task: ['track'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use double pipe as separator, example: Age=25||Country=USA (without space)'},
                {type: 'text', value: 'prop', title: 'Additional Event Properties', task: ['track'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use double pipe as separator, example: Age=25||Country=USA (without space)'},
                {type: 'text', value: 'consent', title: 'Consent', task: ['track', 'identify'], required: false, description: 'eg: sms | email | web | directmail | mobile. Use comma for multiple itmes.'}
            ]

        }
    },
    methods: {
        getLists: function(credId = null) {
            var that = this;

            this.listLoading = true;

            var listRequestData = {
                'action': 'adfoin_get_klaviyo_list',
                'credId': this.fielddata.credId,
                '_nonce': adfoin.nonce
            };

            jQuery.post( ajaxurl, listRequestData, function( response ) {
                that.fielddata.list = response.data;
                that.listLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.credId == 'undefined') {
            this.fielddata.credId = '';
        }

        if (typeof this.fielddata.emailConsent == 'undefined') {
            this.fielddata.emailConsent = false;
        }

        if (typeof this.fielddata.emailConsent != 'undefined') {
            if(this.fielddata.emailConsent == "false") {
                this.fielddata.emailConsent = false;
            }
        }

        if (typeof this.fielddata.smsConsent == 'undefined') {
            this.fielddata.smsConsent = false;
        }

        if (typeof this.fielddata.smsConsent != 'undefined') {
            if(this.fielddata.smsConsent == "false") {
                this.fielddata.smsConsent = false;
            }
        }

        this.getLists(this.fielddata.credId);
    },
    template: '#klaviyopro-action-template'
});

Vue.component('acellepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.listLoading = true;
            this.fields = [];

            var listData = {
                'action': 'adfoin_get_acellepro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {

                // that.fields.push({ type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true } );

                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                    }
                }

                that.listLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_acelle_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        if( this.fielddata.listId ) {
            this.getFields();
        }
    },
    template: '#acellepro-action-template'
});

Vue.component('easysendypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: []
        }
    },
    methods: {
        getFields: function() {
            this.fields = [];
            var that = this;
            this.listLoading = true;

            var fieldData = {
                'action': 'adfoin_get_easysendypro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                        that.listLoading = false;
                    }
                }
            });
        }
    },
    created: function() {},
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.name == 'undefined') {
            this.fielddata.name = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_easysendy_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        if( this.fielddata.listId ) {
            this.getFields();
        }
    },
    template: '#easysendypro-action-template'
});

Vue.component('clickuppro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            workspaceLoading: false,
            spaceLoading: false,
            folderLoading: false,
            listLoading: false,
            fieldsLoading: false,
            fields: [
                {type: 'text', value: 'name', title: 'Name', task: ['create_task'], required: true},
                {type: 'textarea', value: 'description', title: 'Description', task: ['create_task'], required: false},
                {type: 'text', value: 'startDate', title: 'Start Date', task: ['create_task'], required: false},
                {type: 'text', value: 'dueDate', title: 'Due Date', task: ['create_task'], required: false},
                {type: 'text', value: 'dueOnX', title: 'Due After X Days', task: ['create_task'], required: false, description: 'Accepts numeric value. If filled, due date will be calculated and set'},
                {type: 'text', value: 'priorityId', title: 'Priority ID', task: ['create_task'], required: false, description: 'Urgent: 1, Hight: 2. Normal: 3, Low: 4'},
                {type: 'text', value: 'assignees', title: 'Assignee Emails', task: ['create_task'], required: false, description: 'Enter assignee email. Use comma for multiple emails.'},
                {type: 'text', value: 'tags', title: 'Tags', task: ['create_task'], required: false, description: 'Use comma for multiple tags.'},
                {type: 'text', value: 'attachments', title: 'Attachments', task: ['create_task'], required: false, description: 'Use comma for multiple file links.'},
            ]
        }
    },
    methods: {
        getSpaces: function() {
            var that = this;
            this.spaceLoading = true;

            var spaceData = {
                'action': 'adfoin_get_clickup_spaces',
                '_nonce': adfoin.nonce,
                'workspaceId': this.fielddata.workspaceId
            };

            jQuery.post( ajaxurl, spaceData, function( response ) {
                var spaces = response.data;
                that.fielddata.spaces = spaces;
                that.spaceLoading = false;
            });
        },
        getFolders: function() {
            var that = this;
            this.folderLoading = true;

            var folderData = {
                'action': 'adfoin_get_clickup_folders',
                '_nonce': adfoin.nonce,
                'spaceId': this.fielddata.spaceId
            };

            jQuery.post( ajaxurl, folderData, function( response ) {
                var folders = response.data;
                that.fielddata.folders = folders;
                that.folderLoading = false;
            });

            if(!this.fielddata.folderId) {
                this.getLists();
            }
        },
        getLists: function() {
            var that = this;
            this.listLoading = true;

            var listData = {
                'action': 'adfoin_get_clickup_lists',
                '_nonce': adfoin.nonce,
                'spaceId': this.fielddata.spaceId,
                'folderId': this.fielddata.folderId
            };

            jQuery.post( ajaxurl, listData, function( response ) {
                var lists = response.data;
                that.fielddata.lists = lists;
                that.listLoading = false;
            });
        },
        getCustomFields: function() {
            var that = this;
            this.fieldsLoading = true;

            var fieldData = {
                'action': 'adfoin_get_clickuppro_custom_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['create_task'], required: false, description: single.description } );
                        });
                        that.fieldsLoading = false;
                    }
                }
            });
        },
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.workspaceId == 'undefined') {
            this.fielddata.workspaceId = '';
        }

        if (typeof this.fielddata.spaceId == 'undefined') {
            this.fielddata.spaceId = '';
        }

        if (typeof this.fielddata.folderId == 'undefined') {
            this.fielddata.folderId = '';
        }

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.workspaceLoading = true;

        var workspaceRequestData = {
            'action': 'adfoin_get_clickup_workspaces',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, workspaceRequestData, function( response ) {
            that.fielddata.workspaces = response.data;
            that.workspaceLoading = false;
        });

        if( this.fielddata.workspaceId ) {
            this.getSpaces();
        }

        if( this.fielddata.workspaceId && this.fielddata.spaceId ) {
            this.getFolders();
        }

        if( this.fielddata.workspaceId && this.fielddata.spaceId && this.fielddata.folderId ) {
            this.getLists();
        }

        if( this.fielddata.workspaceId && this.fielddata.spaceId && this.fielddata.listId ) {
            this.getCustomFields();
        }
    },
    template: '#clickuppro-action-template'
});

Vue.component('benchmarkpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            this.fields = [];
            var that = this;
            this.listLoading = true;

            var fieldData = {
                'action': 'adfoin_get_benchmarkpro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, fieldData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                        that.listLoading = false;
                    }
                }
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_benchmark_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        if( this.fielddata.listId ) {
            this.getFields();
        }
    },
    template: '#benchmarkpro-action-template'
});

Vue.component('webhookpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'url', title: 'URL', task: ['send_to_webhook'], required: true},
                {type: 'textarea', value: 'headers', title: 'Headers', task: ['send_to_webhook'], required: false, description: 'Use JSON e.g. {"Content-Type": "application/x-www-form-urlencoded", "api_key": "X334mm333jJKj"}'},
                {type: 'textarea', value: 'body', title: 'Body', task: ['send_to_webhook'], required: false, description: 'Use JSON e.g. {"first_name": "John", "last_name": "Doe"}'},
                {type: 'text', value: 'useragent', title: 'User Agent', task: ['send_to_webhook'], required: false},
                {type: 'text', value: 'basic', title: 'Basic Auth', task: ['send_to_webhook'], required: false, description: 'Only for Basic auth. Format: username|password'}

            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.method == 'undefined') {
            this.fielddata.method = 'POST';
        }

        if (typeof this.fielddata.url == 'undefined') {
            this.fielddata.url = '';
        }

        if (typeof this.fielddata.headers == 'undefined') {
            this.fielddata.headers = '';
        } else {
            this.fielddata.headers = this.fielddata.headers.replace(/\\/g, "");
        }

        if (typeof this.fielddata.body == 'undefined') {
            this.fielddata.body = '';
        } else {
            this.fielddata.body = this.fielddata.body.replace(/\\/g, "");
        }

        if (typeof this.fielddata.basic == 'undefined') {
            this.fielddata.basic = '';
        }
    },
    template: '#webhookpro-action-template'
});

Vue.component('agilecrmpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email [Contact]', task: ['add_contact'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name [Contact]', task: ['add_contact'], required: true},
                {type: 'text', value: 'lastName', title: 'Last Name [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'title', title: 'Title [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'company', title: 'Company [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'phone', title: 'Phone [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'address', title: 'Address [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'city', title: 'City [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'state', title: 'State [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'zip', title: 'Zip [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'country', title: 'Country [Contact]', task: ['add_contact'], required: false},
                {type: 'text', value: 'conTags', title: 'Tags [Contact]', task: ['add_contact'], required: false, description: 'Use comma for multiple tags without space, e.g. tag1,tag2,tag3'},
                {type: 'text', value: 'conCustomFields', title: 'Custom Fields [Contact]', task: ['add_contact'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use double pipe, example: Age=25||Country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }

        var pipelineRequestData = {
            'action': 'adfoin_get_agilecrmpro_pipelines',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, pipelineRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                    });
                }
            }
        });
    },
    template: '#agilecrmpro-action-template'
});

Vue.component('wealthboxpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            ownerLoading: false,
            fields: [
                {type: 'text', value: 'prefix', title: 'Prefix', task: ['add_contact'], required: false},               
                {type: 'text', value: 'firstName', title: 'First Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'middleName', title: 'Middle Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'suffix', title: 'Suffix', task: ['add_contact'], required: false},        
                {type: 'text', value: 'nickname', title: 'Nick Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'twitterName', title: 'Twitter Name', task: ['add_contact'], required: false}, 
                {type: 'text', value: 'linkedinUrl', title: 'LinkedIn URL', task: ['add_contact'], required: false},
                {type: 'text', value: 'contactSource', title: 'Contact Source', task: ['add_contact'], required: false, description: 'Referral | Conference | Direct Mail | Cold Call | Other'},
                {type: 'text', value: 'contactType', title: 'Contact Type', task: ['add_contact'], required: false, description: 'Client | Past Client | Prospect | Vendor | Organization'},
                {type: 'text', value: 'status', title: 'Status', task: ['add_contact'], required: false, description: 'Active | Inactive'},
                {type: 'text', value: 'maritalStatus', title: 'Marital Status', task: ['add_contact'], required: false, description: 'Married | Single | Divorced | Widowed | Life Partner | Seperated | Unknown'},
                {type: 'text', value: 'jobTitle', title: 'Job Title', task: ['add_contact', ], required: false},                
                {type: 'text', value: 'companyName', title: 'Company Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'backgroundInfo', title: 'Background Information', task: ['add_contact'], required: false},
                {type: 'text', value: 'gender', title: 'Gender', task: ['add_contact'], required: false, description: 'Female | Male | Non-binary | Unknown'},
                {type: 'text', value: 'householdTitle', title: 'Household Title', task: ['add_contact'], required: false},
                {type: 'text', value: 'householdName', title: 'Household Name', task: ['add_contact'], required: false},
                {type: 'text', value: 'personalEmail', title: 'Pesonal Email', task: ['add_contact'], required: false},
                {type: 'text', value: 'workEmail', title: 'Work Email', task: ['add_contact'], required: false},
                {type: 'text', value: 'mobile', title: 'Mobile', task: ['add_contact'], required: false},
                {type: 'text', value: 'workPhone', title: 'Work Phone', task: ['add_contact'], required: false},
                {type: 'text', value: 'homePhone', title: 'Home Phone', task: ['add_contact'], required: false},
                {type: 'text', value: 'birthDate', title: 'Birth Date', task: ['add_contact'], required: false},
                {type: 'text', value: 'addressLine1', title: 'Address line 1', task: ['add_contact'], required: false},
                {type: 'text', value: 'addressLine2', title: 'Address line 2', task: ['add_contact'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['add_contact'], required: false},                
                {type: 'text', value: 'state', title: 'State', task: ['add_contact'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['add_contact'], required: false},
                {type: 'text', value: 'zipCode', title: 'ZIP Code', task: ['add_contact'], required: false},
                {type: 'text', value: 'kind', title: 'Address Type', task: ['add_contact'], required: false, description: 'e.g. Work | Home'},
                {type: 'text', value: 'webAddress', title: 'Website', task: ['add_contact'], required: false},
                {type: 'text', value: 'webType', title: 'Web Address Type', task: ['add_contact'], required: false},
                {type: 'text', value: 'tags', title: 'Tags', task: ['add_contact'], required: false, description: 'Use comma without space for multiple values'}
            ]
        }
    },
    methods: {},
    created: function() {},
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.owner == 'undefined') {
            this.fielddata.owner = '';
        }

        this.ownerLoading = true;

        var ownerRequestData = {
            'action': 'adfoin_get_wealthbox_owner_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, ownerRequestData, function( response ) {
            that.fielddata.ownerList = response.data;
            that.ownerLoading = false;
        });

        var cfRequestData = {
            'action': 'adfoin_get_wealthboxpro_custom_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, cfRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(item) {
                        that.fields.push( { type: 'text', value: item.id, title: item.name, task: ['add_contact'], required: false, description: item.description } );
                    });
                }
            }
        });
    },
    template: '#wealthboxpro-action-template'
});

Vue.component('drippro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            accountLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['create_subscriber'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'phone', title: 'Phone', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'address1', title: 'Address 1', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'address2', title: 'Address 2', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'state', title: 'State', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'zip', title: 'ZIP', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['create_subscriber'], required: false},
                {type: 'text', value: 'tags', title: 'Tags', task: ['create_subscriber'], required: false, description: 'For multiple values use comma without space. Ex: tag1,tag2,tag3'},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['create_subscriber'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use comma, example: Age=25,Country=USA (without space)'}
            ]

        }
    },
    methods: {
        getList: function() {
            var that = this;
            this.accountLoading = true;

            var listData = {
                'action': 'adfoin_get_drip_list',
                '_nonce': adfoin.nonce,
                'accountId': this.fielddata.accountId
            };

            jQuery.post( ajaxurl, listData, function( response ) {
                var list = response.data;
                that.fielddata.list = list;
                //that.accountLoading = false;

                var workflowData = {
                    'action': 'adfoin_get_drip_workflows',
                    '_nonce': adfoin.nonce,
                    'accountId': that.fielddata.accountId
                };

                jQuery.post( ajaxurl, workflowData, function( response ) {
                    var workflows = response.data;
                    that.fielddata.workflows = workflows;
                    that.accountLoading = false;
                });
            });


        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.accountId == 'undefined') {
            this.fielddata.accountId = '';
        }

        if (typeof this.fielddata.campaignId == 'undefined') {
            this.fielddata.campaignId = '';
        }

        if (typeof this.fielddata.workflowId == 'undefined') {
            this.fielddata.workflowId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }

        this.listLoading = true;

        var accountRequestData = {
            'action': 'adfoin_get_drip_accounts',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, accountRequestData, function( response ) {
            that.fielddata.accounts = response.data;
            that.listLoading = false;
        });
    },
    template: '#drippro-action-template'
});

Vue.component('sendinbluepro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true}
            ]

        }
    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        if (typeof this.fielddata.doptin == 'undefined') {
            this.fielddata.doptin = false;
        }

        if (typeof this.fielddata.doptin != 'undefined') {
            if(this.fielddata.doptin == "false") {
                this.fielddata.doptin = false;
            }
        }

        this.listLoading = true;

        var attRequestData = {
            'action': 'adfoin_get_sendinbluepro_attributes',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, attRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push({type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }
        });

        var listRequestData = {
            'action': 'adfoin_get_sendinbluepro_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#sendinbluepro-action-template'
});

Vue.component('liondeskpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: []
        }
    },
    methods: {
    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.fieldLoading = true;
        var fieldsRequestData = {
            'action': 'adfoin_get_liondeskpro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldsRequestData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push({type: 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                    });
                    that.fieldLoading = false;
                }
            }
        });

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_liondeskpro_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#liondeskpro-action-template'
});

Vue.component('googlesheetspro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            worksheetLoading: false,
            fields: []

        }
    },
    methods: {
        getWorksheets: function() {
            if(!this.fielddata.spreadsheetId) {
                return;
            }

            this.fielddata.worksheetList = [];
            this.fielddata.worksheetId = '';
            this.fields = [];

            var that = this;
            this.worksheetLoading = true;

            var listData = {
                'action': 'adfoin_googlesheets_get_worksheets',
                '_nonce': adfoin.nonce,
                'spreadsheetId': this.fielddata.spreadsheetId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {
                that.fielddata.worksheetList = response.data;
                that.worksheetLoading = false;
            });
        },
        getHeaders: function() {
            if(this.fielddata.worksheetId == 0 || this.fielddata.worksheetId) {

                this.fields = [];
                var that = this;
                this.worksheetLoading = true;
                this.fielddata.worksheetName = this.fielddata.worksheetList[parseInt(this.fielddata.worksheetId)];

                var requestData = {
                    'action': 'adfoin_googlesheets_get_headers',
                    '_nonce': adfoin.nonce,
                    'spreadsheetId': this.fielddata.spreadsheetId,
                    'worksheetName': this.fielddata.worksheetName,
                    'task': this.action.task
                };

                jQuery.post( ajaxurl, requestData, function( response ) {
                    if(response.success) {
                        if(response.data) {
                            for(var key in response.data) {
                                that.fielddata[key] = '';
                                that.fields.push({type: 'text', value: key, title: response.data[key], task: ['add_row'], required: false});
                            }
                        }
                    }

                    that.worksheetLoading = false;
                });
            }
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.spreadsheetId == 'undefined') {
            this.fielddata.spreadsheetId = '';
        }

        if (typeof this.fielddata.worksheetId == 'undefined') {
            this.fielddata.worksheetId = '';
        }

        if(typeof this.fielddata.worksheetName == 'undefined') {
            this.fielddata.worksheetName = '';
        }

        if (typeof this.fielddata.wcMultipleRow == 'undefined') {
            this.fielddata.wcMultipleRow = false;
        }

        if (typeof this.fielddata.wcMultipleRow != 'undefined') {
            if(this.fielddata.wcMultipleRow == "false") {
                this.fielddata.wcMultipleRow = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_spreadsheet_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.spreadsheetList = response.data;
            that.listLoading = false;
        });

        if(this.fielddata.spreadsheetId && this.fielddata.worksheetName ) {
            var that = this;
            this.worksheetLoading = true;

            var requestData = {
                'action': 'adfoin_googlesheets_get_headers',
                '_nonce': adfoin.nonce,
                'spreadsheetId': this.fielddata.spreadsheetId,
                'worksheetName': this.fielddata.worksheetName,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, requestData, function( response ) {
                if(response.success) {
                    if(response.data) {
                        for(var key in response.data) {
                            that.fields.push({type: 'text', value: key, title: response.data[key], task: ['add_row'], required: false});
                        }
                    }
                }

                that.worksheetLoading = false;
            });
        }

        if(this.fielddata.worksheetList) {
            this.fielddata.worksheetList = JSON.parse( this.fielddata.worksheetList.replace(/\\/g, '') );
        }
    },
    watch: {},
    template: '#googlesheetspro-action-template'
});

Vue.component('elasticemailpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use pipe, example: Age=25|Country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }

        if (typeof this.fielddata.customFields == 'undefined') {
            this.fielddata.customFields = '';
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_elasticemail_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#elasticemailpro-action-template'
});

Vue.component('mailchimppro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldLoading: false,
            fields: [
            ]

        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.fieldLoading = true;
            this.fields = [];

            var listData = {
                'action': 'adfoin_get_mailchimppro_mergefields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {

                that.fields.push({ type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true } );

                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                    }
                }

                that.fieldLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.tags == 'undefined') {
            this.fielddata.tags = '';
        }

        if (typeof this.fielddata.doubleoptin == 'undefined') {
            this.fielddata.doubleoptin = false;
        }

        if (typeof this.fielddata.doubleoptin != 'undefined') {
            if(this.fielddata.doubleoptin == "false") {
                this.fielddata.doubleoptin = false;
            }
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailchimp_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        if( this.fielddata.listId ) {
            var that = this;
            this.listLoading = true;

            var listData = {
                'action': 'adfoin_get_mailchimppro_mergefields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {

                that.fields.push({ type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true } );

                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                    }
                }

                that.listLoading = false;
            });
        }
    },
    template: '#mailchimppro-action-template'
});

Vue.component('mailwizzpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldsLoading: false,
            fields: []

        }
    },
    methods: {
        getFields: function() {
            var that = this;
            this.fieldLoading = true;
            this.fields = [];

            var listData = {
                'action': 'adfoin_get_mailwizzpro_fields',
                '_nonce': adfoin.nonce,
                'listId': this.fielddata.listId,
                'task': this.action.task
            };

            jQuery.post( ajaxurl, listData, function( response ) {
                if( response.success ) {
                    if( response.data ) {
                        response.data.map(function(single) {
                            that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                        });
                    }
                }

                that.fieldLoading = false;
            });
        }
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_mailwizz_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });

        if( this.fielddata.listId ) {
            this.getFields();
        }
    },
    template: '#mailwizzpro-action-template'
});

Vue.component('mauticpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            fieldsLoading: false,
            fields: []
        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;
        this.fieldsLoading = true;

        var fieldsRequestData = {
            'action': 'adfoin_get_mauticpro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldsRequestData, function( response ) {

            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push( { type: 'text', value: single.key, title: single.value, task: ['add_contact'], required: false, description: single.description } );
                    });

                    that.fieldsLoading = false;
                }
            }
        });
    },
    template: '#mauticpro-action-template'
});

Vue.component('autopilotpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'twitter', title: 'Twitter', task: ['subscribe'], required: false},
                {type: 'text', value: 'salutation', title: 'Salutation', task: ['subscribe'], required: false},
                {type: 'text', value: 'company', title: 'Company', task: ['subscribe'], required: false},
                {type: 'text', value: 'numberOfEmployees', title: 'Number Of Employees', task: ['subscribe'], required: false},
                {type: 'text', value: 'title', title: 'Title', task: ['subscribe'], required: false},
                {type: 'text', value: 'industry', title: 'Industry', task: ['subscribe'], required: false},
                {type: 'text', value: 'phone', title: 'Phone', task: ['subscribe'], required: false},
                {type: 'text', value: 'mobilePhone', title: 'MobilePhone', task: ['subscribe'], required: false},
                {type: 'text', value: 'fax', title: 'Fax', task: ['subscribe'], required: false},
                {type: 'text', value: 'website', title: 'Website', task: ['subscribe'], required: false},
                {type: 'text', value: 'mailingStreet', title: 'MailingStreet', task: ['subscribe'], required: false},
                {type: 'text', value: 'mailingCity', title: 'MailingCity', task: ['subscribe'], required: false},
                {type: 'text', value: 'mailingState', title: 'MailingState', task: ['subscribe'], required: false},
                {type: 'text', value: 'mailingPostalCode', title: 'MailingPostalCode', task: ['subscribe'], required: false},
                {type: 'text', value: 'mailingCountry', title: 'MailingCountry', task: ['subscribe'], required: false},
                {type: 'text', value: 'leadSource', title: 'LeadSource', task: ['subscribe'], required: false},
                {type: 'text', value: 'linkedIn', title: 'LinkedIn', task: ['subscribe'], required: false},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use {{datatype--key}}={{value}} format, example: string--Age=25. For multiple fields use pipe, example: integer--Age=25|string--Country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_autopilot_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#autopilotpro-action-template'
});

Vue.component('autopilotnewpro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fieldsLoading: false,
            fields: []
        }
    },
    methods: {},
    created: function() {},
    mounted: function() {
        var that = this;
        this.fieldLoading = true;

        var fieldData = {
            'action': 'adfoin_get_autopilotnewpro_fields',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, fieldData, function( response ) {
            if( response.success ) {
                if( response.data ) {
                    response.data.map(function(single) {
                        that.fields.push({ type: 'text', value: single.key, title: single.value, task: ['subscribe'], required: false, description: single.description } );
                    });
                }
            }

            that.fieldLoading = false;
        });
    },
    template: '#autopilotnewpro-action-template'
});

Vue.component('emailoctopuspro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'firstName', title: 'First Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'lastName', title: 'Last Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key=value format, example: Age=25. For multiple fields use pipe, example: Age=25|Country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }

        if (typeof this.fielddata.doubleoptin != 'undefined') {
            if(this.fielddata.doubleoptin == "false") {
                this.fielddata.doubleoptin = false;
            }
        }

        if (typeof this.fielddata.update == 'undefined') {
            this.fielddata.update = false;
        }

        if (typeof this.fielddata.update != 'undefined') {
            if(this.fielddata.update == "false") {
                this.fielddata.update = false;
            }
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_emailoctopus_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#emailoctopuspro-action-template'
});

Vue.component('pabblypro', {
    props: ["trigger", "action", "fielddata"],
    data: function () {
        return {
            listLoading: false,
            fields: [
                {type: 'text', value: 'email', title: 'Email', task: ['subscribe'], required: true},
                {type: 'text', value: 'name', title: 'Name', task: ['subscribe'], required: false},
                {type: 'text', value: 'mobile', title: 'Mobile', task: ['subscribe'], required: false},
                {type: 'text', value: 'city', title: 'City', task: ['subscribe'], required: false},
                {type: 'text', value: 'country', title: 'Country', task: ['subscribe'], required: false},
                {type: 'text', value: 'website', title: 'Website', task: ['subscribe'], required: false},
                {type: 'text', value: 'facebook', title: 'Facebook', task: ['subscribe'], required: false},
                {type: 'text', value: 'age', title: 'Age', task: ['subscribe'], required: false},
                {type: 'text', value: 'customFields', title: 'Custom Fields', task: ['subscribe'], required: false, description: 'Use key=value format, example: distance=25km. For multiple fields use pipe, example: age=25|country=USA (without space)'}
            ]

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
        var that = this;

        if (typeof this.fielddata.listId == 'undefined') {
            this.fielddata.listId = '';
        }

        if (typeof this.fielddata.email == 'undefined') {
            this.fielddata.email = '';
        }

        if (typeof this.fielddata.firstName == 'undefined') {
            this.fielddata.firstName = '';
        }

        if (typeof this.fielddata.lastName == 'undefined') {
            this.fielddata.lastName = '';
        }

        this.listLoading = true;

        var listRequestData = {
            'action': 'adfoin_get_pabbly_list',
            '_nonce': adfoin.nonce
        };

        jQuery.post( ajaxurl, listRequestData, function( response ) {
            that.fielddata.list = response.data;
            that.listLoading = false;
        });
    },
    template: '#pabblypro-action-template'
});