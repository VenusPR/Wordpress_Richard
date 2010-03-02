<?php
/**
 * Options Management Administration Panel.
 *
 * If accessed directly in a browser this page shows a list of all saved options
 * along with editable fields for their values. Serialized data is not supported
 * and there is no way to remove options via this page. It is not linked to from
 * anywhere else in the admin.
 *
 * This file is also the target of the forms in core and custom options pages
 * that use the Settings API. In this case it saves the new option values
 * and returns the user to their page of origin.
 *
 * @package WordPress
 * @subpackage Administration
 */

/** WordPress Administration Bootstrap */
require_once('admin.php');

$title = __('Settings');
$this_file = 'options.php';
$parent_file = 'options-general.php';

wp_reset_vars(array('action'));

$whitelist_options = array(
	'general' => array( 'blogname', 'blogdescription', 'gmt_offset', 'date_format', 'time_format', 'start_of_week', 'timezone_string' ),
	'discussion' => array( 'default_pingback_flag', 'default_ping_status', 'default_comment_status', 'comments_notify', 'moderation_notify', 'comment_moderation', 'require_name_email', 'comment_whitelist', 'comment_max_links', 'moderation_keys', 'blacklist_keys', 'show_avatars', 'avatar_rating', 'avatar_default', 'close_comments_for_old_posts', 'close_comments_days_old', 'thread_comments', 'thread_comments_depth', 'page_comments', 'comments_per_page', 'default_comments_page', 'comment_order', 'comment_registration' ),
	'misc' => array( 'use_linksupdate' ),
	'media' => array( 'thumbnail_size_w', 'thumbnail_size_h', 'thumbnail_crop', 'medium_size_w', 'medium_size_h', 'large_size_w', 'large_size_h', 'image_default_size', 'image_default_align', 'image_default_link_type', 'embed_autourls', 'embed_size_w', 'embed_size_h', 'uploads_use_yearmonth_folders', 'upload_path', 'upload_url_path' ),
	'privacy' => array( 'blog_public' ),
	'reading' => array( 'posts_per_page', 'posts_per_rss', 'rss_use_excerpt', 'blog_charset', 'show_on_front', 'page_on_front', 'page_for_posts' ),
	'writing' => array( 'default_post_edit_rows', 'use_smilies', 'default_category', 'default_email_category', 'use_balanceTags', 'default_link_category', 'enable_app', 'enable_xmlrpc' ),
	'options' => array( '' ) );

$mail_options = array('mailserver_url', 'mailserver_port', 'mailserver_login', 'mailserver_pass');
$uploads_options = array('uploads_use_yearmonth_folders', 'upload_path', 'upload_url_path');

if ( !is_multisite() ) {
	if ( !defined( 'WP_SITEURL' ) ) $whitelist_options['general'][] = 'siteurl';
	if ( !defined( 'WP_HOME' ) ) $whitelist_options['general'][] = 'home';
	$whitelist_options['general'][] = 'admin_email';
	$whitelist_options['general'][] = 'users_can_register';
	$whitelist_options['general'][] = 'default_role';

	$whitelist_options['writing'] = array_merge($whitelist_options['writing'], $mail_options);
	$whitelist_options['writing'][] = 'ping_sites';

	$whitelist_options['media'] = array_merge($whitelist_options['media'], $uploads_options);
} else {
	$whitelist_options['general'][] = 'new_admin_email';
	$whitelist_options['general'][] = 'WPLANG';
	$whitelist_options['general'][] = 'language';

	$whitelist_options[ 'misc' ] = array();

	if ( defined( 'POST_BY_EMAIL' ) )
		$whitelist_options['writing'] = array_merge($whitelist_options['writing'], $mail_options);

	$whitelist_options[ 'misc' ] = array();
}

$whitelist_options = apply_filters( 'whitelist_options', $whitelist_options );

if ( !current_user_can('manage_options') )
	wp_die(__('Cheatin&#8217; uh?'));

if ( is_multisite() && is_super_admin() && isset($_GET[ 'adminhash' ]) && $_GET[ 'adminhash' ] ) {
	$new_admin_details = get_option( 'adminhash' );
	if ( is_array( $new_admin_details ) && $new_admin_details[ 'hash' ] == $_GET[ 'adminhash' ] && $new_admin_details[ 'newemail' ] != '' ) {
		update_option( "admin_email", $new_admin_details[ 'newemail' ] );
		delete_option( "adminhash" );
		delete_option( "new_admin_email" );
		wp_redirect( get_option( "siteurl" ) . "/wp-admin/options-general.php?updated=true" );
		exit;
	} else {
		wp_redirect( get_option( "siteurl" ) . "/wp-admin/options-general.php?updated=false" );
		exit;
	}
}

switch($action) {

/**
 * If $_GET['action'] == 'update' we are saving settings sent from a settings page
 */
case 'update':
	if ( isset($_POST[ 'option_page' ]) ) {
		$option_page = $_POST[ 'option_page' ];
		check_admin_referer( $option_page . '-options' );
	} else {
		// This is for back compat and will eventually be removed.
		$option_page = 'options';
		check_admin_referer( 'update-options' );
	}

	if ( !isset( $whitelist_options[ $option_page ] ) )
		wp_die( __( 'Error: options page not found.' ) );

	if ( 'options' == $option_page ) {
		$options = explode(',', stripslashes( $_POST[ 'page_options' ] ));
		if ( !is_super_admin() )
			wp_die( __( 'Not allowed here' ) );
	} else {
		$options = $whitelist_options[ $option_page ];
	}

	// Handle custom date/time formats
	if ( 'general' == $option_page ) {
		if ( !empty($_POST['date_format']) && isset($_POST['date_format_custom']) && '\c\u\s\t\o\m' == stripslashes( $_POST['date_format'] ) )
			$_POST['date_format'] = $_POST['date_format_custom'];
		if ( !empty($_POST['time_format']) && isset($_POST['time_format_custom']) && '\c\u\s\t\o\m' == stripslashes( $_POST['time_format'] ) )
			$_POST['time_format'] = $_POST['time_format_custom'];
		// Map UTC+- timezones to gmt_offsets and set timezone_string to empty.
		if ( !empty($_POST['timezone_string']) && preg_match('/^UTC[+-]/', $_POST['timezone_string']) ) {
			$_POST['gmt_offset'] = $_POST['timezone_string'];
			$_POST['gmt_offset'] = preg_replace('/UTC\+?/', '', $_POST['gmt_offset']);
			$_POST['timezone_string'] = '';
		}
	}

	if ( $options ) {
		foreach ( $options as $option ) {
			$option = trim($option);
			$value = null;
			if ( isset($_POST[$option]) )
				$value = $_POST[$option];
			if ( !is_array($value) ) $value = trim($value);
			$value = stripslashes_deep($value);
			update_option($option, $value);
		}
	}

	/**
	 *  Handle settings errors and return to options page
	 */
	// If no settings errors were registered add a general 'updated' message.
	if ( !count( get_settings_errors() ) )
		add_settings_error('general', 'settings_updated', __('Settings saved.'), 'updated');
	set_transient('settings_errors', get_settings_errors(), 30);

	/**
	 * Redirect back to the settings page that was submitted
	 */
	$goback = add_query_arg( 'updated', 'true',  wp_get_referer() );
	wp_redirect( $goback );
	break;

default:
	if ( !is_super_admin() )
		wp_die( __( 'Not admin' ) );

	include('admin-header.php'); ?>

<div class="wrap">
<?php screen_icon(); ?>
  <h2><?php esc_html_e('All Settings'); ?></h2>
  <form name="form" action="options.php" method="post" id="all-options">
  <?php wp_nonce_field('options-options') ?>
  <input type="hidden" name="action" value="update" />
  <input type='hidden' name='option_page' value='options' />
  <table class="form-table">
<?php
$options = $wpdb->get_results( "SELECT * FROM $wpdb->options ORDER BY option_name" );

foreach ( (array) $options as $option ) :
	$disabled = '';
	if ( $option->option_name == '' )
		continue;
	if ( is_serialized( $option->option_value ) ) {
		if ( is_serialized_string( $option->option_value ) ) {
			// this is a serialized string, so we should display it
			$value = maybe_unserialize( $option->option_value );
			$options_to_update[] = $option->option_name;
			$class = 'all-options';
		} else {
			$value = 'SERIALIZED DATA';
			$disabled = ' disabled="disabled"';
			$class = 'all-options disabled';
		}
	} else {
		$value = $option->option_value;
		$options_to_update[] = $option->option_name;
		$class = 'all-options';
	}
	$name = esc_attr( $option->option_name );
	echo "
<tr>
	<th scope='row'><label for='$name'>" . esc_html( $option->option_name ) . "</label></th>
<td>";
	if ( strpos( $value, "\n" ) !== false )
		echo "<textarea class='$class' name='$name' id='$name' cols='30' rows='5'>" . wp_htmledit_pre( $value ) . "</textarea>";
	else
		echo "<input class='regular-text $class' type='text' name='$name' id='$name' value='" . esc_attr( $value ) . "'$disabled />";
	echo "</td>
</tr>";
endforeach;
?>
  </table>
<p class="submit"><input type="hidden" name="page_options" value="<?php echo esc_attr( implode( ',', $options_to_update ) ); ?>" /><input type="submit" name="Update" value="<?php esc_attr_e( 'Save Changes' ); ?>" class="button-primary" /></p>
  </form>
</div>


<?php
include('admin-footer.php');
break;
} // end switch

?>
