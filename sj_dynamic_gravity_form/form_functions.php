<?php 

add_filter( 'gform_pre_render_15', 'sj_dynamic_gravity_form_start' );
add_filter( 'gform_pre_validation_15', 'sj_dynamic_gravity_form_start' );
add_filter( 'gform_pre_submission_filter_15', 'sj_dynamic_gravity_form_start' );
add_filter( 'gform_admin_pre_render_15', 'sj_dynamic_gravity_form_start' );

function sj_dynamic_gravity_form_start( $form ) {

   sj_create_booking_form_json();

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
            'terms'  => 'german-tour',
         )
      )

   );

   $postId = '';

// Populate tours on Custom post type

   foreach ( $form['fields'] as &$field ) {

      $test = array();

      if ( $field->type != 'select' || strpos( $field->cssClass, 'populate-posts' ) === false ) {
         continue;
      }

      $posts = get_posts( $args );
      $choices = array();

      foreach ( $posts as $post ) {
         $postId = $post->ID;


         // print_r($postId);
         $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
      }


        // update 'Select a Post' to whatever you'd like the instructive option to be
      $field->placeholder = 'Select Tour';
      $field->choices = $choices;

   }

   return $form;

} 
    // function date_list


add_filter( 'gform_pre_render_14', 'sj_dynamic_gravity_form_start_english' );
add_filter( 'gform_pre_validation_14', 'sj_dynamic_gravity_form_start_english' );
add_filter( 'gform_pre_submission_filter_14', 'sj_dynamic_gravity_form_start_english' );
add_filter( 'gform_admin_pre_render_14', 'sj_dynamic_gravity_form_start_english' );

function sj_dynamic_gravity_form_start_english( $form ) {

   sj_create_booking_form_json_english();

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
            'terms'  => 'english-tour',
         )
      )

   );

   $postId = '';

// Populate tours on Custom post type

   foreach ( $form['fields'] as &$field ) {

      $test = array();

      if ( $field->type != 'select' || strpos( $field->cssClass, 'populate-posts' ) === false ) {
         continue;
      }

      $posts = get_posts( $args );
      $choices = array();

      foreach ( $posts as $post ) {
         $postId = $post->ID;


         // print_r($postId);
         $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
      }


        // update 'Select a Post' to whatever you'd like the instructive option to be
      $field->placeholder = 'Select Tour';
      $field->choices = $choices;

   }

   return $form;

} 
    // function date_list




add_action('init', 'myStartSession', 1);
function myStartSession() {
   if(!session_id()) {
      session_start();
   }
}

function sj_create_booking_form_json(){
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
            'terms'  => 'german-tour',
         )
      )

   );

   $postId = '';

// Populate tours on Custom post type

   $posts = get_posts( $args );
   $choices = array();

// print_r($posts);

   foreach ( $posts as $post ) {

      $tour_dates[] ='';
      $tour_bikes[] ='';

      $postId = $post->ID;

      $pillionPrice = get_field('pillion', $postId);
      $singleRoomPrice = get_field('single_room_surcharge', $postId);

      if ( have_rows('tour_dates', $postId) ) {


         while ( have_rows('tour_dates', $postId) ) : the_row();

            $tourDate = get_sub_field('tour_date');
            array_push($tour_dates, array( 'post-id' => $postId, 'date' => $tourDate ));

         endwhile;

      } 

      if ( have_rows('tour_bikes', $postId) ) {


         while ( have_rows('tour_bikes', $postId) ) : the_row();

            $tourBikesName = get_sub_field('tour_bike_name');
            $tourBikesPrice = get_sub_field('tour_bike_price');
            array_push($tour_bikes, array( 'post-id' => $postId, 'bikeName' => $tourBikesName, 'bikePrice' => $tourBikesPrice));
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

      array_push( $choices,$tour_meta);

      $tour_dates = "";
      $tour_bikes = "";
   }

// print_r($choices);

   foreach ($choices as $key => $value) {
      if (sizeof($choices[$key]['tourDates']['date']) == 1) {

       unset($choices[$key]);
    }
 }
// print_r($choices);

// print_r($choices);
 sj_write_json_file($choices);

}


function sj_create_booking_form_json_english(){
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
            'terms'  => 'english-tour',
         )
      )

   );

   $postId = '';

// Populate tours on Custom post type

   $posts = get_posts( $args );
   $choices = array();

// print_r($posts);

   foreach ( $posts as $post ) {

      $tour_dates[] ='';
      $tour_bikes[] ='';

      $postId = $post->ID;

      $pillionPrice = get_field('pillion', $postId);
      $singleRoomPrice = get_field('single_room_surcharge', $postId);

      if ( have_rows('tour_dates', $postId) ) {


         while ( have_rows('tour_dates', $postId) ) : the_row();

            $tourDate = get_sub_field('tour_date');

            
            array_push($tour_dates, array( 'post-id' => $postId, 'date' => $tourDate ));

         endwhile;

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

// print_r($choices);

   foreach ($choices as $key => $value) {
      if (sizeof($choices[$key]['tourDates']['date']) == 1) {

       unset($choices[$key]);
    }
 }
// print_r($choices);

// print_r($choices);
 sj_write_json_file_english($choices);

}


