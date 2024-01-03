/* global wpforms_dashboard_widget, ajaxurl, moment, Chart */
/**
 * WPForms Dashboard Widget function.
 *
 * @since 1.5.0
 */

'use strict';

var WPFormsDashboardWidget = window.WPFormsDashboardWidget || ( function( document, window, $ ) {

	/**
	 * Elements reference.
	 *
	 * @since 1.5.0
	 *
	 * @type {object}
	 */
	var el = {
		$widget              : $( '#wpforms_reports_widget_pro' ),
		$chartResetBtn       : $( '#wpforms-dash-widget-reset-chart' ),
		$DaysSelect          : $( '#wpforms-dash-widget-timespan' ),
		$settingsBtn         : $( '#wpforms-dash-widget-settings-button' ),
		$canvas              : $( '#wpforms-dash-widget-chart' ),
		$formsListBlock      : $( '#wpforms-dash-widget-forms-list-block' ),
		$recomBlockDismissBtn: $( '#wpforms-dash-widget-dismiss-recommended-plugin-block' ),
	};

	/**
	 * WPForms color scheme.
	 *
	 * @since 1.7.4
	 *
	 * @type {{pointBackgroundColor: string, backgroundColor: string, borderColor: string}}
	 */
	let wpformsColors = {
		backgroundColor      : 'rgb(226, 119, 48)',
		hoverBackgroundColor : '#da691f',
		borderColor          : 'rgb(226, 119, 48)',
		hoverBorderColor     : '#da691f',
		pointBackgroundColor : 'rgba(255, 255, 255, 1)',
	};

	/**
	 * WordPress color scheme.
	 *
	 * @since 1.7.4
	 *
	 * @type {{pointBackgroundColor: string, backgroundColor: string, borderColor: string}}
	 */
	let wpColors = {
		backgroundColor      : 'rgba(34, 113, 177, 1)',
		hoverBackgroundColor : '#135e96',
		borderColor          : 'rgba(34, 113, 177, 1)',
		hoverBorderColor     : '#135e96',
		pointBackgroundColor : 'rgba(255, 255, 255, 1)',
	};

	if ( wpforms_dashboard_widget.chart_type === 'line' ) {
		wpColors.backgroundColor      = '#E2ECF5';
		wpformsColors.backgroundColor = 'rgba(255, 129, 0, 0.135)';
	}

	/**
	 * Color scheme in use.
	 *
	 * @since 1.7.4
	 *
	 * @type {{pointBackgroundColor: string, backgroundColor: string, borderColor: string}}
	 */
	let colorScheme = wpforms_dashboard_widget.color_scheme === 'wp' ? wpColors : wpformsColors;

	/**
	 * Chart.js functions and properties.
	 *
	 * @since 1.5.0
	 *
	 * @type {object}
	 */
	var chart = {

		/**
		 * Chart.js instance.
		 *
		 * @since 1.5.0
		 */
		instance: null,

		/**
		 * Chart.js settings.
		 *
		 * @since 1.5.0
		 */
		settings: {
			type   : wpforms_dashboard_widget.chart_type,
			data   : {
				labels  : [],
				datasets: [ { ...{
					label: wpforms_dashboard_widget.i18n.entries,
					data: [],
					borderWidth: 2,
					pointRadius: 4,
					pointBorderWidth: 1,
				}, ...colorScheme,
				} ],
			},
			options: {
				maintainAspectRatio        : false,
				scales                     : {
					xAxes: [ {
						type        : 'time',
						time        : {
							unit: 'day',
							tooltipFormat: wpforms_dashboard_widget.date_format,
						},
						distribution: 'series',
						ticks       : {
							beginAtZero: true,
							source     : 'labels',
							padding    : 10,
							minRotation: 25,
							maxRotation: 25,
							callback   : function( value, index, values ) {

								// Distribute the ticks equally starting from a right side of xAxis.
								var gap = Math.floor( values.length / 7 );

								if ( gap < 1 ) {
									return value;
								}
								if ( ( values.length - index - 1 ) % gap === 0 ) {
									return value;
								}
							},
						},
					} ],
					yAxes: [ {
						ticks: {
							beginAtZero  : true,
							maxTicksLimit: 6,
							padding      : 20,
							callback     : function( value ) {

								// Make sure the tick value has no decimals.
								if ( Math.floor( value ) === value ) {
									return value;
								}
							},
						},
					} ],
				},
				elements                   : {
					line: {
						tension: 0,
					},
				},
				animation                  : {
					duration: 0,
				},
				hover                      : {
					animationDuration: 0,
				},
				legend                     : {
					display: false,
				},
				tooltips                   : {
					displayColors: false,
				},
				responsiveAnimationDuration: 0,
			},
		},

		/**
		 * Init Chart.js.
		 *
		 * @since 1.5.0
		 */
		init: function() {

			var ctx;

			if ( ! el.$canvas.length ) {
				return;
			}

			ctx = el.$canvas[ 0 ].getContext( '2d' );

			chart.instance = new Chart( ctx, chart.settings );

			chart.updateUI( wpforms_dashboard_widget.chart_data );
		},

		/**
		 * Update Chart.js with a new AJAX data.
		 *
		 * @since 1.5.0
		 *
		 * @param {Number} days Timespan (in days) to fetch the data for.
		 * @param {Number} formId
		 */
		ajaxUpdate: function( days, formId ) {

			var data = {
				_wpnonce: wpforms_dashboard_widget.nonce,
				action  : 'wpforms_' + wpforms_dashboard_widget.slug + '_get_chart_data',
				days    : days,
				form_id : formId,
			};

			app.addOverlay( $( chart.instance.canvas ) );

			$.post( ajaxurl, data, function( response ) {
				chart.updateUI( response );
			} );
		},

		/**
		 * Update Chart.js canvas.
		 *
		 * @since 1.5.0
		 *
		 * @param {object} data Dataset for the chart.
		 */
		updateUI: function( data ) {

			app.removeOverlay( el.$canvas );

			if ( $.isEmptyObject( data ) ) {
				chart.updateWithDummyData();
				chart.showEmptyDataMessage();
			} else {
				chart.updateData( data );
				chart.removeEmptyDataMessage();
			}

			chart.instance.data.labels = chart.settings.data.labels;
			chart.instance.data.datasets[ 0 ].data = chart.settings.data.datasets[ 0 ].data;

			chart.instance.update();
		},

		/**
		 * Update Chart.js settings data.
		 *
		 * @since 1.5.0
		 *
		 * @param {object} data Dataset for the chart.
		 */
		updateData: function( data ) {

			chart.settings.data.labels = [];
			chart.settings.data.datasets[ 0 ].data = [];

			chart.updateTotal( data );
		},

		/**
		 * Updates total entries number in table title.
		 *
		 * @since 1.7.4
		 *
		 * @param {object} data Dataset for the chart.
		 */
		updateTotal: function( data ) {

			let totalCount = 0;

			$.each( data, function( index, value ) {

				totalCount = Number( totalCount ) + Number( value.count );

				var date = moment( value.day );

				chart.settings.data.labels.push( date );
				chart.settings.data.datasets[ 0 ].data.push( {
					t: date,
					y: value.count,
				} );
			} );
			$( '#entry-count-value' ).text( totalCount );
		},

		/**
		 * Update Chart.js settings with dummy data.
		 *
		 * @since 1.5.0
		 */
		updateWithDummyData: function() {

			chart.settings.data.labels = [];
			chart.settings.data.datasets[ 0 ].data = [];

			var end = moment().startOf( 'day' );
			var days = el.$DaysSelect.val() || 7;
			var date;

			var minY = 5;
			var maxY = 20;
			var i;

			for ( i = 1; i <= days; i ++ ) {

				date = end.clone().subtract( i, 'days' );

				chart.settings.data.labels.push( date );
				chart.settings.data.datasets[ 0 ].data.push( {
					t: date,
					y: Math.floor( Math.random() * ( maxY - minY + 1 ) ) + minY,
				} );
			}
		},

		/**
		 * Display an error message if the chart data is empty.
		 *
		 * @since 1.5.0
		 */
		showEmptyDataMessage: function() {

			chart.removeEmptyDataMessage();
			el.$canvas.after( wpforms_dashboard_widget.empty_chart_html );
		},

		/**
		 * Remove all empty data error messages.
		 *
		 * @since 1.5.0
		 */
		removeEmptyDataMessage: function() {

			el.$canvas.siblings( '.wpforms-error' ).remove();
		},

		/**
		 * Chart related event callbacks.
		 *
		 * @since 1.5.0
		 */
		events: {

			/**
			 * Update a chart on a timespan change.
			 *
			 * @since 1.5.0
			 */
			daysChanged: function() {

				var days = el.$DaysSelect.val();
				var formId = el.$DaysSelect.attr( 'data-active-form-id' ) || 0;

				chart.ajaxUpdate( days, formId );
				app.saveWidgetMeta( 'timespan', days );
			},

			/**
			 * Display a single for data only.
			 *
			 * @since 1.5.0
			 *
			 * @param {object} $el Forms list "single form chart" button jQuery element.
			 */
			singleFormView: function( $el ) {

				$( '.wpforms-dash-widget-single-chart-btn' ).show();

				var days = el.$DaysSelect.val();
				var formId = $el.closest( 'tr' ).attr( 'data-form-id' );
				var formTitle = $el.closest( 'tr' ).find( '.wpforms-dash-widget-form-title' ).text();

				$( '#wpforms-dash-widget-chart-title' ).text( formTitle );

				el.$DaysSelect.attr( 'data-active-form-id', formId );
				el.$chartResetBtn.appendTo( $el.closest( 'td' ) );
				$el.hide();
				el.$chartResetBtn.show();

				// update text in table header.
				$( '#entry-count-text' ).text( wpforms_dashboard_widget.i18n.form_entries );

				chart.ajaxUpdate( days, formId );
				app.saveWidgetMeta( 'active_form_id', formId );
			},

			/**
			 * Reset a chart to display all forms data.
			 *
			 * @since 1.5.0
			 */
			resetToGeneralView: function() {

				var days = el.$DaysSelect.val();

				el.$DaysSelect.removeAttr( 'data-active-form-id' );
				el.$chartResetBtn.hide();
				el.$chartResetBtn.closest( 'td' ).find( '.wpforms-dash-widget-single-chart-btn' ).show();

				// update text in table header.
				$( '#entry-count-text' ).text( wpforms_dashboard_widget.i18n.total_entries );
				$( '#wpforms-dash-widget-chart-title' ).text( wpforms_dashboard_widget.i18n.total_entries );

				chart.ajaxUpdate( days, 0 );
				app.saveWidgetMeta( 'active_form_id', 0 );
			},
		},
	};

	/**
	 * Public functions and properties.
	 *
	 * @since 1.5.0
	 *
	 * @type {object}
	 */
	var app = {

		/**
		 * Publicly accessible Chart.js functions and properties.
		 *
		 * @since 1.5.0
		 */
		chart: chart,

		/**
		 * Start the engine.
		 *
		 * @since 1.5.0
		 */
		init: function() {
			$( app.ready );
		},

		/**
		 * Document ready.
		 *
		 * @since 1.5.0
		 */
		ready: function() {

			chart.init();
			app.events();
			app.graphSettings();
		},

		/**
		 * Graph settings related events.
		 *
		 * @since 1.7.4
		 */
		graphSettings: function() {

			el.$settingsBtn.on( 'click', function() {

				$( this ).siblings( '.wpforms-dash-widget-settings-menu' ).toggle();
			} );

			el.$widget.find( '.wpforms-dash-widget-settings-menu-save' ).on( 'click', function() {

				app.saveSettings();
			} );
		},

		/**
		 * Save the widgets settings and update the view.
		 *
		 * @since 1.7.4
		 */
		saveSettings: function() {

			const style = el.$widget.find( '.wpforms-dash-widget-settings-menu input[name=wpforms-style]:checked' ).val();
			const color = el.$widget.find( '.wpforms-dash-widget-settings-menu input[name=wpforms-color]:checked' ).val();

			if ( style ) {
				app.saveWidgetMeta( 'graph_style', style );
				if ( style === '2' ) {
					chart.settings.type = 'line';
					wpColors.backgroundColor      = 'rgba(34, 113, 177, 0.135)';
					wpformsColors.backgroundColor = 'rgba(255, 129, 0, 0.135)';
				} else {
					chart.settings.type = 'bar';
					wpColors.backgroundColor      = 'rgba(34, 113, 177, 1)';
					wpformsColors.backgroundColor = '#E27730';
				}
			}

			if ( color ) {
				app.saveWidgetMeta( 'color_scheme', color );
				if ( color === '2' ) {
					chart.settings.data.datasets[ 0 ] = { ...chart.settings.data.datasets[ 0 ], ...wpColors };
				} else {
					chart.settings.data.datasets[ 0 ] = { ...chart.settings.data.datasets[ 0 ], ...wpformsColors };
				}
			}

			chart.instance.update();

			el.$widget.find( '.wpforms-dash-widget-settings-menu' ).hide();
		},

		/**
		 * Register JS events.
		 *
		 * @since 1.5.0
		 */
		events: function() {

			app.chartEvents();
			app.formsListEvents();
			app.miscEvents();
		},

		/**
		 * Register chart area JS events.
		 *
		 * @since 1.5.0
		 */
		chartEvents: function() {

			el.$DaysSelect.on( 'change', function() {
				chart.events.daysChanged();
			} );
		},

		/**
		 * Register forms list area JS events.
		 *
		 * @since 1.5.0
		 */
		formsListEvents: function() {

			el.$DaysSelect.on( 'change', function() {
				app.updateFormsList( $( this ).val() );
			} );

			el.$widget.on( 'click', '.wpforms-dash-widget-single-chart-btn', function() {
				var $t = $( this ),
					$tr = $t.closest( 'tr' );
				chart.events.singleFormView( $t );
				$tr.closest( 'table' ).find( 'tr.wpforms-dash-widget-form-active' ).removeClass( 'wpforms-dash-widget-form-active' );
				$tr.addClass( 'wpforms-dash-widget-form-active' );
			} );

			el.$formsListBlock.on( 'click', '.wpforms-dash-widget-reset-chart', function() {
				$( '.wpforms-dash-widget-reset-chart' ).hide();
				chart.events.resetToGeneralView();
				el.$formsListBlock.find( 'tr.wpforms-dash-widget-form-active' ).removeClass( 'wpforms-dash-widget-form-active' );

			} );

			el.$widget.on( 'click', '#wpforms-dash-widget-forms-more', function() {
				app.toggleCompleteFormsList();
			} );
		},

		/**
		 * Register other JS events.
		 *
		 * @since 1.5.0.4
		 */
		miscEvents: function() {

			el.$recomBlockDismissBtn.on( 'click', function() {
				app.dismissRecommendedBlock();
			} );
		},

		/**
		 * Update forms list with a new AJAX data.
		 *
		 * @since 1.5.0
		 *
		 * @param {Number} days Timespan (in days) to fetch the data for.
		 */
		updateFormsList: function( days ) {

			var data = {
				_wpnonce: wpforms_dashboard_widget.nonce,
				action  : 'wpforms_' + wpforms_dashboard_widget.slug + '_get_forms_list',
				days    : days,
			};

			app.addOverlay( el.$formsListBlock.children().first() );

			$.post( ajaxurl, data, function( response ) {

				el.$formsListBlock.html( response );
				app.saveWidgetMeta( 'timespan', days );
			} );
		},

		/**
		 * Toggle forms list hidden entries.
		 *
		 * @since 1.5.0.4
		 */
		toggleCompleteFormsList: function() {

			$( '#wpforms-dash-widget-forms-list-table .wpforms-dash-widget-forms-list-hidden-el' ).toggle();
			$( '#wpforms-dash-widget-forms-more' ).html( function( i, html ) {
				return html === wpforms_dashboard_widget.show_less_html ? wpforms_dashboard_widget.show_more_html : wpforms_dashboard_widget.show_less_html;
			} );
		},

		/**
		 * Save dashboard widget meta on a backend.
		 *
		 * @since 1.5.0
		 *
		 * @param {string} meta Meta name to save.
		 * @param {number} value Value to save.
		 */
		saveWidgetMeta: function( meta, value ) {

			var data = {
				_wpnonce: wpforms_dashboard_widget.nonce,
				action  : 'wpforms_' + wpforms_dashboard_widget.slug + '_save_widget_meta',
				meta    : meta,
				value   : value,
			};

			$.post( ajaxurl, data );
		},

		/**
		 * Add an overlay to a widget block containing $el.
		 *
		 * @since 1.5.0
		 *
		 * @param {object} $el jQuery element inside a widget block.
		 */
		addOverlay: function( $el ) {

			if ( ! $el.parent().closest( '.wpforms-dash-widget-block' ).length ) {
				return;
			}

			app.removeOverlay( $el );
			$el.after( '<div class="wpforms-dash-widget-overlay"></div>' );
		},

		/**
		 * Remove an overlay from a widget block containing $el.
		 *
		 * @since 1.5.0
		 *
		 * @param {object} $el jQuery element inside a widget block.
		 */
		removeOverlay: function( $el ) {
			$el.siblings( '.wpforms-dash-widget-overlay' ).remove();
		},

		/**
		 * Dismiss recommended plugin block.
		 *
		 * @since 1.5.0.4
		 */
		dismissRecommendedBlock: function() {

			$( '.wpforms-dash-widget-recommended-plugin-block' ).remove();
			app.saveWidgetMeta( 'hide_recommended_block', 1 );
		},
	};

	// Provide access to public functions/properties.
	return app;

}( document, window, jQuery ) );

// Initialize.
WPFormsDashboardWidget.init();
