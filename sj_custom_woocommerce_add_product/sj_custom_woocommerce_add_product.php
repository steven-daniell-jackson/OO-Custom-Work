<?php
/*
Plugin Name: SJ Custom Woocommerce Add Product
description: Creates new Dashboard page to add a Woocommerce product
Author: Steven Jackson
Author Contact: stevenjackson.sanguine@gmail.com
Date Created: 10 July 2018
*/

// function register_custom_menu_page() {
//	add_menu_page('Add product', 'Add product', 'add_users', 'addproduct', '_sj_custom_menu', null, 6);
// }
// add_action('admin_menu', 'register_custom_menu_page');
// add_filter('wp_dashboard_setup', 'register_custom_menu_page');
// function _sj_custom_menu(){
//	include( plugin_dir_path( __FILE__ ) ."/template/add-product.php");
// }

// add_filter('upload_mimes', 'restrict_mime');
function restrict_mime($mimes) {
	$mimes = array(
		'jpg|jpeg|jpe' => 'image/jpeg'
	);
	return $mimes;
}

// function sjCustomWoocommerceAddProductCSS(){
//	$src =  plugins_url( ) ."/sj_custom_woocommerce_add_product/css/sj_custom_woocommerce_add_product.css";
//	$handle = "sjCustomWoocommerceAddProductCss";
//	wp_register_script($handle, $src);
//	wp_enqueue_style($handle, $src, array(), false, false);
// }
// add_action('admin_head', 'sjCustomWoocommerceAddProductCSS', 30);

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

	$small[] = array(
		'name' => $sj_product_name . '-small',
		'file' => $sj_download_small[0]
	);
	$medium[] = array(
		'name' => $sj_product_name . '-medium',
		'file' => $sj_download_medium[0]
	);
	$full[] = array(
		'name' => $sj_product_name . '-full',
		'file' => $sj_download_full[0]
	);

	// print_r(wp_get_attachment_image_src( $sj_product_image_id, 'download-small'));
	// print_r($small);

	$image_sizes = wp_get_attachment_metadata($sj_product_image_id);

	// print_r($image_sizes);
	// print_r($image_sizes['sizes']['full']);
	// insert variations post_type

	$i = 1;
	while ($i <= 3) {
		$my_post = array(
			'post_title' => 'Variation #' . $i . ' of ' . esc_attr(strip_tags($_POST['productName'])) ,
			'post_name' => 'product-' . $post_id . '-variation-' . $i,
			'post_status' => 'publish',
			'post_parent' => $post_id,
			'post_type' => 'product_variation',
			'guid' => home_url() . '/?product_variation=product-' . $post_id . '-variation-' . $i
		);

		// Insert the post into the database

		wp_insert_post($my_post);
		$variable_id = $post_id + 1;
		$variable_two = $variable_id + 1;
		$variable_three = $variable_two + 1;
		$fullDimensions = $image_sizes['width'] . 'x' . $image_sizes['height'];
		update_post_meta($variable_id, 'attribute_pa_resolution', 'large');
		update_post_meta($variable_id, '_downloadable_files', $full);
		update_post_meta($variable_id, '_downloadable', 'yes');
		update_post_meta($variable_id, '_virtual', 'yes');
		update_post_meta($variable_id, '_price', 220);
		update_post_meta($variable_id, '_regular_price', '220');
		update_post_meta($variable_id, '_credits_amount', '11');
		update_post_meta($variable_id, '_stock_status', 'instock');
		update_post_meta($variable_id, '_variation_description', $fullDimensions);
		$mediumDimensions = $image_sizes['sizes']['download-medium']['width'] . 'x' . $image_sizes['sizes']['download-medium']['height'];
		update_post_meta($variable_two, 'attribute_pa_resolution', 'medium');
		update_post_meta($variable_two, '_downloadable_files', $medium);
		update_post_meta($variable_two, '_downloadable', 'yes');
		update_post_meta($variable_two, '_virtual', 'yes');
		update_post_meta($variable_two, '_price', 180);
		update_post_meta($variable_two, '_regular_price', '180');
		update_post_meta($variable_two, '_credits_amount', '9');
		update_post_meta($variable_two, '_stock_status', 'instock');
		update_post_meta($variable_two, '_variation_description', $mediumDimensions);
		$smallDimensions = $image_sizes['sizes']['download-small']['width'] . 'x' . $image_sizes['sizes']['download-small']['height'];
		update_post_meta($variable_three, 'attribute_pa_resolution', 'small');
		update_post_meta($variable_three, '_downloadable_files', $small);
		update_post_meta($variable_three, '_downloadable', 'yes');
		update_post_meta($variable_three, '_virtual', 'yes');
		update_post_meta($variable_three, '_price', 160);
		update_post_meta($variable_three, '_regular_price', '160');
		update_post_meta($variable_three, '_credits_amount', '8');
		update_post_meta($variable_three, '_stock_status', 'instock');
		update_post_meta($variable_three, '_variation_description', $smallDimensions);
		$i++;
	}

	$upload_model_release = isset($_POST['upload_model_release']) ? $_POST['upload_model_release'] : 'N/A';
	$product = wc_get_product($post_id);
	$product->update_meta_data('sj_model_release_form', $upload_model_release);
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