<?php

namespace ACP\Column\CustomField;

use AC\Settings\Column\CustomFieldType;
use ACP\Search\Comparison\Meta;

class SearchComparisonFactory {

	/**
	 * @param string $type
	 * @param string $meta_key
	 * @param string $meta_type
	 *
	 * @return Meta|false
	 */
	public static function create( $type, $meta_key, $meta_type ) {

		switch ( $type ) {

			case CustomFieldType::TYPE_ARRAY :
				return new Meta\Serialized( $meta_key, $meta_type );
			case CustomFieldType::TYPE_BOOLEAN :
				return new Meta\Checkmark( $meta_key, $meta_type );
			case CustomFieldType::TYPE_COLOR :
				return new Meta\Text( $meta_key, $meta_type );
			case CustomFieldType::TYPE_COUNT :
				return false;
			case CustomFieldType::TYPE_DATE :
				return new Meta\Text( $meta_key, $meta_type );
			case CustomFieldType::TYPE_TEXT :
				return new Meta\Text( $meta_key, $meta_type );
			case CustomFieldType::TYPE_NON_EMPTY :
				return new Meta\EmptyNotEmpty( $meta_key, $meta_type );
			case CustomFieldType::TYPE_IMAGE :
				return new Meta\Media( $meta_key, $meta_type );
			case CustomFieldType::TYPE_MEDIA :
				return new Meta\Media( $meta_key, $meta_type );
			case CustomFieldType::TYPE_URL :
				return new Meta\Text( $meta_key, $meta_type );
			case CustomFieldType::TYPE_NUMERIC :
				return new Meta\Number( $meta_key, $meta_type );
			case CustomFieldType::TYPE_POST :
				return new Meta\Post( $meta_key, $meta_type );
			case CustomFieldType::TYPE_USER :
				return new Meta\User( $meta_key, $meta_type );
			default :
				return new Meta\Text( $meta_key, $meta_type );
		}
	}

}