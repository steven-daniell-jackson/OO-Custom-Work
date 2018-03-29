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
            'terms'  => 'english-tour',
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

         // print_r($postId);

      $choices[] = array( 
         'tour' => $post->post_title, 
         'price' => $post->price, 
         'id' => $post->ID, 
         'tourDates' => array('postID' => $postId, 'date' => $tour_dates),
         'tourBikes' => array('postID' => $postId, 'bikes' => $tour_bikes) 
      );

      $tour_dates = "";
      $tour_bikes = "";
   }


// print_r($choices);

   sj_write_json_file($choices);

}



