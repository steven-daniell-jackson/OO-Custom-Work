<?php 
/*
   Plugin Name: SJ - Dynamic Gravity Form
   description: Custom changes to the functionality of the Booking form
   Author: Steven Jackson
   Author Contact: stevenjackson.sanguine@gmail.com
   Date Created: 19 March 2018
   */

include( plugin_dir_path( __FILE__ ) . '/form_functions.php');


// Enqueue scripts
add_action( 'wp_enqueue_scripts', 'sj_dynamic_gravity_form_plugin_enqueue_script' );
function sj_dynamic_gravity_form_plugin_enqueue_script() {
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js', plugins_url( 'js/sj_dynamic_gravity_form.js', __FILE__ ) );
   
}



add_action('wp_head', 'myplugin_ajaxurl');

function myplugin_ajaxurl() {

   echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
         </script>';
}


function sj_write_json_file($data){
  // print_r($choices);
$myfile = fopen(dirname(__FILE__) . '/dynamic_acf_data/acf_data.json', "w") or die("Unable to open file!");
      fwrite($myfile, json_encode($data));
      fclose($myfile);

}

   
add_action( 'gform_pre_submission_15', 'pre_submission' ); 
function pre_submission( $form ) {

print_r($_SESSION['myKey']);
var_dump($_SESSION['myKey']);

$postData = $_SESSION['myKey'];

$buildString = '';

foreach ($postData   as $key => $value) {

  foreach ($postData["$key"]   as $key => $value) {

  
  $buildString = $buildString . "$key => $value\n";
}

  // $buildString = $buildString . "$key => $value\n";
}


echo $buildString;

   $_POST['input_172'] = $buildString;
}
  

add_action('wp_ajax_sj_rider', 'sj_rider_ajax_handler'); // add action for logged users
add_action( 'wp_ajax_nopriv_sj_rider', 'sj_rider_ajax_handler' ); // add action for unlogged users

function sj_rider_ajax_handler() {
global $post;
$postData = $_POST['riderData'];

$test = json_decode(stripslashes($postData),true);
$_SESSION['myKey'] = $test;
}











?>