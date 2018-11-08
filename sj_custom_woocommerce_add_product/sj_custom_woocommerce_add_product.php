<?php
/*
Plugin Name: SJ Custom Woocommerce Add Product
description: Creates new Dashboard page to add a Woocommerce product
Author: Steven Jackson
Author Contact: stevenjackson.sanguine@gmail.com
Date Created: 10 July 2018
*/

function register_custom_menu_page() {
	add_menu_page('Add product', 'Add product', 'add_users', 'addproduct', '_sj_custom_menu', null, 6);
}
add_action('admin_menu', 'register_custom_menu_page');
add_filter('wp_dashboard_setup', 'register_custom_menu_page');
function _sj_custom_menu(){
	include( plugin_dir_path( __FILE__ ) ."/template/add-product.php");
}

// add_filter('upload_mimes', 'restrict_mime');
function restrict_mime($mimes) {
	$mimes = array(
		'jpg|jpeg|jpe' => 'image/jpeg'
	);
	return $mimes;
}


add_action('admin_enqueue_scripts', 'sjCustomWoocommerceAddProductCSS');
function sjCustomWoocommerceAddProductCSS() {
	wp_enqueue_style('sjadmincss', plugins_url('css/sj_custom_woocommerce_add_product.css', __FILE__));
}

add_action('admin_enqueue_scripts', 'sj_uploadscript');
function sj_uploadscript() {
	if (!did_action('wp_enqueue_media')) {
		wp_enqueue_media();
	}

	// wp_register_script( 'ajaxHandle', plugins_url( ) ."/sj_custom_woocommerce_add_product/js/sj_custom_woocommerce_add_product.js", array(), false, true );

	wp_enqueue_script('sjadminscript', plugins_url() . "/sj_custom_woocommerce_add_product/js/sj_custom_woocommerce_add_product.js", array(
		'jquery'
	) , null, false);
}


add_action('admin_enqueue_scripts', 'myplugin_ajaxurl');
function myplugin_ajaxurl() {
	echo '<script type="text/javascript">
	var ajaxurl = "' . admin_url('admin-ajax.php') . '";
	</script>';
}

// add_filter('wp_handle_upload_prefilter', 'upload_image_validation');
function upload_image_validation($file) {

	// Mime type with dimensions, check to exit earlier

	$mimes = array(
		'image/jpeg'
	);
	if (!in_array($file['type'], $mimes)) return $file;
	$img = getimagesize($file['tmp_name']);
	$minimum = array(
		'width' => 2400,
		'height' => 1000
	);
	if ($img[0] < $minimum['width']) $file['error'] = 'Image too small. Minimum width is ' . $minimum['width'] . 'px. Uploaded image width is ' . $img[0] . 'px';
	elseif ($img[1] < $minimum['height']) $file['error'] = 'Image too small. Minimum height is ' . $minimum['height'] . 'px. Uploaded image height is ' . $img[1] . 'px';
	return $file;
}

function getWoocommerceCategories() {
	$taxonomy = 'product_cat';
	$orderby = 'name';
	$show_count = 0; // 1 for yes, 0 for no
	$pad_counts = 0; // 1 for yes, 0 for no
	$hierarchical = 1; // 1 for yes, 0 for no
	$title = '';
	$empty = 0;
	$args = array(
		'taxonomy' => $taxonomy,
		'orderby' => $orderby,
		'show_count' => $show_count,
		'pad_counts' => $pad_counts,
		'hierarchical' => $hierarchical,
		'title_li' => $title,
		'hide_empty' => $empty
	);
	$all_categories = get_categories($args);
	foreach($all_categories as $cat) {
		if ($cat->category_parent == 0) {
			$category_id = $cat->term_id;
			echo '<span class="sj-radio-button ' . $cat->name . '" ><input id= "' . $cat->name . '" type="checkbox" class="sj-product-category" value="' . $cat->name . '"><label for= "' . $cat->name . '">' . $cat->name . '</label></span>';
		}
	}
}

add_action("wp_ajax_myaction", "so_wp_ajax_function");
add_action("wp_ajax_nopriv_myaction", "so_wp_ajax_function");
function so_wp_ajax_function() {
	$sj_product_name = $_POST['productName'];
	$sj_product_image = $_POST['productImage'];
	$sj_product_image_id = $_POST['productImageId'];
	$sj_product_category = $_POST['productCategory'];
	$sj_product_tags = $_POST['productTagsArray'];
	$sj_test = $_POST['test'];
	print_r($sj_test);
	$new_post = array(
		'post_title' => esc_attr(strip_tags($sj_product_name)) ,
		'post_content' => $_POST['productDescription'],
		'post_status' => 'pending',
		// 'post_status' => 'publish',
		'post_type' => 'product',
		'tags_input' => array(
			'tag1',
			'tag2',
			'tag3'
		)
	);

	// print_r($sj_product_category);

	$post_id = wp_insert_post($new_post);
	wp_set_object_terms($post_id, $sj_product_category, 'product_cat');

	// SET THE PRODUCT TAGS

	wp_set_object_terms($post_id, $sj_product_tags, 'product_tag');

	// print_r($sj_product_category);
	// print_r($sj_product_tags);

	update_post_meta($post_id, '_sku', $post_id);

	// my array for setting the attributes

	$avail_attributes = array(
		'large',
		'medium',
		'small'
	);

	// Sets the attributes up to be used as variations but doesnt actually set them up as variations

	wp_set_object_terms($post_id, 'variable', 'product_type');
	wp_set_object_terms($post_id, $avail_attributes, 'pa_resolution');
	$thedata = array(
		'pa_resolution' => array(
			'name' => 'pa_resolution',
			'value' => '',
			'is_visible' => '1',
			'is_variation' => '1',
			'is_taxonomy' => '1'
		)
	);
	update_post_meta($post_id, '_product_attributes', $thedata);
	update_post_meta($post_id, '_visibility', 'search');
	update_post_meta($post_id, '_stock_status', 'instock');
	set_post_thumbnail($post_id, $sj_product_image_id);
	the_post_thumbnail('large');

	// update_post_meta( $post_id, '_product_image', '2383');

	$sj_download_small = wp_get_attachment_image_src($sj_product_image_id, 'download-small');
	$sj_download_medium = wp_get_attachment_image_src($sj_product_image_id, 'download-medium');
	$sj_download_full = wp_get_attachment_image_src($sj_product_image_id, 'full');

	// print_r ($sj_download_full[0]);

	$small[md5( $sj_download_small) ] = array(
		'name' => $sj_product_name . '-small',
		'file' => $sj_download_small[0]
	);
	$medium[md5( $sj_download_medium) ] = array(
		'name' => $sj_product_name . '-medium',
		'file' => $sj_download_medium[0]
	);
	$full[md5( $sj_download_full) ] = array(
		'name' => $sj_product_name . '-full',
		'file' => $sj_download_full[0]
	);


	$image_sizes = wp_get_attachment_metadata($sj_product_image_id);

	// print_r($image_sizes);
	// print_r($image_sizes['sizes']['full']);
	// insert variations post_type

	$my_post = array(
		'post_title' => 'Variation #' . $i . ' of ' . esc_attr(strip_tags($_POST['productName'])) ,
		'post_name' => 'product-' . $post_id . '-variation-' . $i,
		'post_status' => 'publish',
		'post_parent' => $post_id,
		'post_type' => 'product_variation',
		'guid' => home_url() . '/?product_variation=product-' . $post_id . '-variation-' . $i
	);

		// Insert the post into the database

	$variable_id = wp_insert_post($my_post);
	$fullDimensions = $image_sizes['width'] . 'x' . $image_sizes['height'];
	update_post_meta($variable_id, 'attribute_pa_resolution', 'large');
	update_post_meta($variable_id, '_downloadable', 'yes');
	update_post_meta($variable_id, '_virtual', 'yes');
	update_post_meta($variable_id, '_price', 220);
	update_post_meta($variable_id, '_regular_price', '220');
	update_post_meta($variable_id, '_credits_amount', 11);
	update_post_meta($variable_id, '_stock_status', 'instock');
	update_post_meta($variable_id, '_variation_description', $fullDimensions);
	update_post_meta( $variable_id, '_download_permissions_granted', 1 );

	$file_name = $sj_product_name . '-full';
	sj_add_download_id($post_id, $variable_id, $sj_download_full[0], $file_name);

	$variable_two = wp_insert_post($my_post);
	$mediumDimensions = $image_sizes['sizes']['download-medium']['width'] . 'x' . $image_sizes['sizes']['download-medium']['height'];
	update_post_meta($variable_two, 'attribute_pa_resolution', 'medium');
	update_post_meta($variable_two, '_downloadable_files', $medium);
	update_post_meta($variable_two, '_downloadable', 'yes');
	update_post_meta($variable_two, '_virtual', 'yes');
	update_post_meta($variable_two, '_price', 180);
	update_post_meta($variable_two, '_regular_price', '180');
	update_post_meta($variable_two, '_credits_amount', 9);
	update_post_meta($variable_two, '_stock_status', 'instock');
	update_post_meta($variable_two, '_variation_description', $mediumDimensions);
	update_post_meta( $variable_two, '_download_permissions_granted', 1 );


	$file_name = $sj_product_name . '-medium';
	sj_add_download_id($post_id, $variable_two, $sj_download_medium[0], $file_name);

	$variable_three = wp_insert_post($my_post);
	$smallDimensions = $image_sizes['sizes']['download-small']['width'] . 'x' . $image_sizes['sizes']['download-small']['height'];
	update_post_meta($variable_three, 'attribute_pa_resolution', 'small');
	update_post_meta($variable_three, '_downloadable_files', $small);
	update_post_meta($variable_three, '_downloadable', 'yes');
	update_post_meta($variable_three, '_virtual', 'yes');
	update_post_meta($variable_three, '_price', 160);
	update_post_meta($variable_three, '_regular_price', '160');
	update_post_meta($variable_three, '_credits_amount', 8);
	update_post_meta($variable_three, '_stock_status', 'instock');
	update_post_meta($variable_three, '_variation_description', $smallDimensions);
	update_post_meta( $variable_three, '_download_permissions_granted', 1 );

	$file_name = $sj_product_name . '-small';
	sj_add_download_id($post_id, $variable_three, $sj_download_small[0], $file_name);

	WC_Product_Variable::sync( $post_id, true );



	$upload_model_release = isset($_POST['upload_model_release']) ? $_POST['upload_model_release'] : 'N/A';
	$product = wc_get_product($post_id);
	$product->update_meta_data('sj_model_release_form', $upload_model_release);
	$product->update_meta_data('download_id', 123);
	$product->save();
	$upload_property_release = isset($_POST['upload_property_release']) ? $_POST['upload_property_release'] : 'N/A';
	$product = wc_get_product($post_id);
	$product->update_meta_data('sj_property_release_form', $upload_property_release);
	$product->save();
	wp_die(); // ajax call must die to avoid trailing 0 in your response
}

// Adding a custom tab
add_action('woocommerce_product_write_panel_tabs', 'sj_license_tab');
function sj_license_tab() {
	?>
	<li class="sj_license">
		<a href="#sj_license_info">
			<span><?php
			_e('License', 'textdomain'); ?></span>
		</a>
	</li>
	<?php
}

add_action('woocommerce_product_data_panels', 'sj_license_tab_info');
function sj_license_tab_info() {
	?>
	<div id="sj_license_info" class="panel woocommerce_options_panel">
		<div class="options_group">
			<?php
			$field = array(
				'id' => 'sj_model_release_form',
				'label' => __('Model Release Form:', 'textdomain') ,
			);
			woocommerce_wp_text_input($field);
			$field = array(
				'id' => 'sj_property_release_form',
				'label' => __('Property Release Form:', 'textdomain') ,
			);
			woocommerce_wp_text_input($field);
			?>
		</div>
	</div>

	<?php
}


function sj_add_download_id($post_id, $variable_id, $sj_img_url, $file_name){
$sj_file = get_post_meta($post_id, '_downloadable_files'); // removed "true"

        // NEW FILE: Setting the name, getting the url and and Md5 hash number
$file_name = $file_name;
$file_url  = $sj_img_url;
$md5_num = md5( $file_url );

        // Inserting new file in the exiting array of downloadable files
$sj_file[0][$md5_num] = array(
	'name'   =>  $file_name,
	'file'   =>  $file_url
);

        // Updating database with the new array
update_post_meta( $variable_id, '_downloadable_files', $sj_file[0] );

}