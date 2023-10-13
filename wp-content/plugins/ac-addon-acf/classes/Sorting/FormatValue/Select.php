<?php

namespace ACA\ACF\Sorting\FormatValue;

use ACP\Sorting\FormatValue;

class Select implements FormatValue {

	/**
	 * @var array
	 */
	private $options;

	public function __construct( $options ) {
		$this->options = $options;
	}

	public function format_value( $value ) {
		return isset( $this->options[ $value ] ) ? $this->options[ $value ] : $value;
	}

}