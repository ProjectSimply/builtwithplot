<?php

namespace AC;

class Integrations extends ArrayIterator {

	public function __construct() {
		$integrations = [
			new Integration\ACF(),
			new Integration\BuddyPress(),
			new Integration\EventsCalendar(),
			new Integration\NinjaForms(),
			new Integration\Pods(),
			new Integration\Types(),
			new Integration\WooCommerce(),
		];

		parent::__construct( $integrations );
	}

	/**
	 * @return Integration[]
	 */
	public function all() {
		return $this->array;
	}

}