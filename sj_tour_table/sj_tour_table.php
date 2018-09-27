<?php
/*
   Plugin Name: SJ - Tour Table
   description: ACF Data to Table
   Author: Steven Jackson
   Author Contact: stevenjackson.sanguine@gmail.com
   Date Created: 6 August 2018
 */

   function set_acf_data(){
   	if (is_page( 54 )) {
   		set_query_var( 'currency', 'R' );
   		return sj_get_acf_data('english-tour');
   	} else if (is_page( 960 )){
   		set_query_var( 'currency', '&euro;' );
   		return sj_get_acf_data('german-tour');
   	}

   }

// Pricelist
   function sj_tour_table_config(){
   	$acf_data = set_acf_data();
   	ob_start();
   	sj_gen_price_list_table($acf_data);
   	return ob_get_clean();

   }
   add_shortcode('sj_price_list_table', 'sj_tour_table_config');


// Tour Dates
   function sj_tour_dates_table_config(){
   	ob_start();
   	$acf_data = set_acf_data();
   	sj_gen_tour_dates_table($acf_data);
   	return ob_get_clean();
   }
   add_shortcode('sj_tour_dates_table', 'sj_tour_dates_table_config');


// Dates listed chronologically
   function sj_tour_dates_chrono_config(){
   	ob_start();
   	$acf_data = set_acf_data();
   	sj_gen_tour_dates_chrono_table($acf_data);
   	return ob_get_clean();
   }
   add_shortcode('sj_tour_dates_chrono', 'sj_tour_dates_chrono_config');




   function sj_gen_price_list_table($acf_data){
   	set_query_var( 'acf_data', $acf_data );

   	include( plugin_dir_path( __FILE__ ) ."/template_parts/price_list_table.php"); 
   }

   function sj_gen_tour_dates_table($acf_data){
   	set_query_var( 'acf_data', $acf_data );
   	include( plugin_dir_path( __FILE__ ) ."/template_parts/tour_dates_table.php"); 
   }

   function sj_gen_tour_dates_chrono_table($acf_data){
   	set_query_var( 'acf_data', $acf_data );
   	include( plugin_dir_path( __FILE__ ) ."/template_parts/tour_dates_chrono_table.php"); 

   }


   function sj_get_acf_data($terms){
   	$args = array(
   		'posts_per_page' => -1,
   		'orderby'   => 'title',
   		'order'    => 'ASC',
   		'post_type'   => 'tour',
   		'post_status'  => 'publish',
   		'tax_query' => array(
   			array(
   				'taxonomy' => 'tour_categories',
   				'field'  => 'slug',
   				'terms'  => $terms,
   			)
   		)

   	);

   	$postId = '';

// Populate tours on Custom post type

   	$posts = get_posts( $args );
   	$choices = array();

   	foreach ( $posts as $post ) {

   		$tour_dates[] ='';
   		$tour_bikes[] ='';

   		$postId = $post->ID;

   		$pillionPrice = get_field('pillion', $postId);
   		$singleRoomPrice = get_field('single_room_surcharge', $postId);

   		if ( have_rows('tour_dates', $postId) ) {


   			while ( have_rows('tour_dates', $postId) ) : the_row();

   				$tourDate = get_sub_field('tour_date');
   				$availibility = get_sub_field('availibility');

   				array_push($tour_dates, array( 'post-id' => $postId, 'date' => $tourDate, 'availibility' => $availibility ));

   			endwhile;

   		} else {

            $tourDate = get_sub_field('tour_date');
             // $availibility = get_sub_field('availibility');

               array_push($tour_dates, array( 'post-id' => $postId, 'date' => $tourDate, 'availibility' => 'N/A' ));

         }

   		if ( have_rows('tour_bikes', $postId) ) {


   			while ( have_rows('tour_bikes', $postId) ) : the_row();

   				$tourBikesName = get_sub_field('tour_bike_name');
   				$tourBikesPrice = get_sub_field('tour_bike_price');

   				array_push($tour_bikes, array( 'post-id' => $postId,  'bikeName' => $tourBikesName, 'bikePrice' => $tourBikesPrice));
   			endwhile;

   		} 


   		$tour_meta = array( 
   			'tour' => $post->post_title, 
   			'price' => $post->price, 
   			'id' => $post->ID, 
   			'pillionPrice' => $pillionPrice, 
   			'singleRoomPrice' => $singleRoomPrice, 
   			'tourDates' => array('postID' => $postId, 'date' => $tour_dates),
   			'tourBikes' => array('postID' => $postId, 'bikes' => $tour_bikes) 
   		);
// print_r($tour_meta);
   		array_push( $choices,$tour_meta);

   		$tour_dates = "";
   		$tour_bikes = "";
   	}

   	foreach ($choices as $key => $value) {
   		if (sizeof($choices[$key]['tourDates']['date']) == 1) {

   			unset($choices[$key]);
   		}
   	}
   	return $choices;

   }

   function after ($this, $inthat)
   {
   	if (!is_bool(strpos($inthat, $this)))
   		return substr($inthat, strpos($inthat,$this)+strlen($this));
   };

   function before ($this, $inthat)
   {
   	return substr($inthat, 0, strpos($inthat, $this));
   };

