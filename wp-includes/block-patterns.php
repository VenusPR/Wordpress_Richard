<?php
/**
 * Register the block patterns and block patterns categories
 *
 * @package WordPress
 * @since 5.5.0
 */

add_theme_support( 'core-block-patterns' );

/**
 * Registers the core block patterns and categories.
 *
 * @since 5.5.0
 * @private
 */
function _register_core_block_patterns_and_categories() {
	$should_register_core_patterns = get_theme_support( 'core-block-patterns' );

	if ( $should_register_core_patterns ) {
		$core_block_patterns = array(
			'media-text-nature',
			'two-images-gallery',
			'three-columns-media-text',
			'quote',
			'large-header-left',
			'large-header-text-button',
			'media-text-art',
			'text-two-columns-title',
			'three-columns-text',
			'text-two-columns-title-offset',
			'heading',
			'three-images-gallery',
			'text-two-columns',
			'media-text-arquitecture',
			'two-buttons',
			'query-standard-posts',
			'query-medium-posts',
			'query-small-posts',
			'query-grid-posts',
			'query-large-title-posts',
			'query-offset-posts',
			'social-links-shared-background-color',
		);

		foreach ( $core_block_patterns as $core_block_pattern ) {
			register_block_pattern(
				'core/' . $core_block_pattern,
				require __DIR__ . '/block-patterns/' . $core_block_pattern . '.php'
			);
		}
	}

	register_block_pattern_category( 'buttons', array( 'label' => _x( 'Buttons', 'Block pattern category' ) ) );
	register_block_pattern_category( 'columns', array( 'label' => _x( 'Columns', 'Block pattern category' ) ) );
	register_block_pattern_category( 'gallery', array( 'label' => _x( 'Gallery', 'Block pattern category' ) ) );
	register_block_pattern_category( 'header', array( 'label' => _x( 'Headers', 'Block pattern category' ) ) );
	register_block_pattern_category( 'text', array( 'label' => _x( 'Text', 'Block pattern category' ) ) );
	register_block_pattern_category( 'query', array( 'label' => __( 'Query', 'Block pattern category' ) ) );
}
