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
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js_step1', plugins_url( 'js/step1.js', __FILE__ ) );
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js_step2', plugins_url( 'js/step2.js', __FILE__ ) );
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js_step3', plugins_url( 'js/step3.js', __FILE__ ) );
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js_step4', plugins_url( 'js/step4.js', __FILE__ ) );
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js_rider-objects', plugins_url( 'js/rider-objects.js', __FILE__ ) );
   wp_enqueue_script( 'sj_dynamic_gravity_form_custom_js_wordpress-uploader', plugins_url( 'js/wordpress-uploader.js', __FILE__ ) );
   wp_enqueue_style( 'sj_dynamic_gravity_form_custom_css', plugins_url( 'css/sj_dynamic_gravity_form.css', __FILE__ ) );
   
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

function sj_write_json_file_english($data){
  // print_r($choices);
$myfile = fopen(dirname(__FILE__) . '/dynamic_acf_data/acf_data_english.json', "w") or die("Unable to open file!");
      fwrite($myfile, json_encode($data));
      fclose($myfile);

}


add_action('wp_ajax_sj_rider', 'sj_rider_ajax_handler'); // add action for logged users
add_action( 'wp_ajax_nopriv_sj_rider', 'sj_rider_ajax_handler' ); // add action for unlogged users

function sj_rider_ajax_handler() {
global $post;
$postData = $_POST['riderData'];

print_r($postData);

$test = json_decode(stripslashes($postData),true);
$_SESSION['myKey'] = $test;
}

   
add_action( 'gform_pre_submission_14', 'pre_submission_14' ); 
function pre_submission_14( $form ) {

// print_r($_SESSION['myKey']);
// var_dump($_SESSION['myKey']);

$postData = $_SESSION['myKey'];

$buildString = '';
$emailHeading = 0;

foreach ($postData   as $key => $value) {

if (!$emailHeading > 0) {
	
$buildString .= 'Tour: ' . $postData["$key"]["riderTour"] . "\r\n";
$buildString .= 'Tour Date: ' . $postData["$key"]["riderTourDate"] . "\r\n";
$buildString .= 'Number of Participants: ' . $postData["$key"]["participants"] . "\r\n";
$buildString .=  $postData["$key"]["riderTotalPrice"] . "\r\n\r\n";

// $buildString .= 'Rider Type: ' . $postData["$key"]["dataRiderType"] . "\r\n";
// $buildString .= 'Room Occupancy: ' . $postData["$key"]["roomOccupancy"] . "\r\n\r\n";

}


$buildString .= 'Details: ' . $postData["$key"]["details"] . "\r\n";
$buildString .= 'Rider Name: '  . $postData["$key"]["titile"] . " " . $postData["$key"]["firstNames"] . " " . $postData["$key"]["familyName"] .   "\r\n";
$buildString .= 'Email: ' . $postData["$key"]["email"] . "\r\n";
$buildString .= 'Phone: ' . $postData["$key"]["phone"] . "\r\n";
$buildString .= 'Date of Birth: ' . $postData["$key"]["dateOfBirth"] . "\r\n";
$buildString .= 'Nationality: ' . $postData["$key"]["nationality"] . "\r\n";
$buildString .= 'Passport No: ' . $postData["$key"]["passportNo"] . "\r\n";
$buildString .= 'Drives License No: ' . $postData["$key"]["drivesLicense"] . "\r\n";
$buildString .= 'Address: ' . $postData["$key"]["addressPhysical"] . ", " . $postData["$key"]["addressCity"]  . ", " . $postData["$key"]["addressProvince"] . ", " . $postData["$key"]["addressCountry"] . ", " . $postData["$key"]["addressZipcode"] .  "\r\n";
// $buildString .= 'Rider Number: ' . $postData["$key"]["riderNumber"] . "\r\n";
$buildString .= 'Room Occupancy: ' . $postData["$key"]["roomOccupancy"] . "\r\n";
$buildString .= 'Motorcycle 1st choice: ' . $postData["$key"]["bikeFirst"] . "\r\n";
$buildString .= 'Motorcycle 2nd choice: ' . $postData["$key"]["bikeSecond"] . "\r\n";

$buildString .= 'Shirt Size: ' . $postData["$key"]["shirtSize"] . "\r\n";
$buildString .= 'Food Requirements: ' . $postData["$key"]["foodRequirements"] . "\r\n";
$buildString .= 'Profession: ' . $postData["$key"]["profession"] . "\r\n";
$buildString .= 'Riding Experience: ' . $postData["$key"]["ridingExperience"] . "\r\n\r\n";


$emailHeading++;
//   foreach ($postData["$key"]   as $key => $value) {
// }

  // $buildString = $buildString . "$key => $value\n";
}

   $_POST['input_192'] = html_entity_decode($buildString);

   return $form;
}
  
add_action( 'gform_pre_submission_15', 'pre_submission_15' ); 
function pre_submission_15( $form ) {

// print_r($_SESSION['myKey']);
// var_dump($_SESSION['myKey']);

$postData = $_SESSION['myKey'];

$buildString = '';
$emailHeading = 0;

foreach ($postData   as $key => $value) {

if (!$emailHeading > 0) {
  
$buildString .= 'Tour: ' . $postData["$key"]["riderTour"] . "\r\n";
$buildString .= 'Tour Date: ' . $postData["$key"]["riderTourDate"] . "\r\n";
$buildString .= 'Number of Participants: ' . $postData["$key"]["participants"] . "\r\n";
$buildString .=  $postData["$key"]["riderTotalPrice"] . "\r\n\r\n";

// $buildString .= 'Rider Type: ' . $postData["$key"]["dataRiderType"] . "\r\n";
// $buildString .= 'Room Occupancy: ' . $postData["$key"]["roomOccupancy"] . "\r\n\r\n";

}


$buildString .= 'Details: ' . $postData["$key"]["details"] . "\r\n";
$buildString .= 'Rider Name: '  . $postData["$key"]["titile"] . " " . $postData["$key"]["firstNames"] . " " . $postData["$key"]["familyName"] .   "\r\n";
$buildString .= 'Email: ' . $postData["$key"]["email"] . "\r\n";
$buildString .= 'Phone: ' . $postData["$key"]["phone"] . "\r\n";
$buildString .= 'Date of Birth: ' . $postData["$key"]["dateOfBirth"] . "\r\n";
$buildString .= 'Nationality: ' . $postData["$key"]["nationality"] . "\r\n";
$buildString .= 'Passport No: ' . $postData["$key"]["passportNo"] . "\r\n";
$buildString .= 'Drives License No: ' . $postData["$key"]["drivesLicense"] . "\r\n";
$buildString .= 'Address: ' . $postData["$key"]["addressPhysical"] . ", " . $postData["$key"]["addressCity"]  . ", " . $postData["$key"]["addressProvince"] . ", " . $postData["$key"]["addressCountry"] . ", " . $postData["$key"]["addressZipcode"] .  "\r\n";
// $buildString .= 'Rider Number: ' . $postData["$key"]["riderNumber"] . "\r\n";
$buildString .= 'Room Occupancy: ' . $postData["$key"]["roomOccupancy"] . "\r\n";
$buildString .= 'Motorcycle 1st choice: ' . $postData["$key"]["bikeFirst"] . "\r\n";
$buildString .= 'Motorcycle 2nd choice: ' . $postData["$key"]["bikeSecond"] . "\r\n";

$buildString .= 'Shirt Size: ' . $postData["$key"]["shirtSize"] . "\r\n";
$buildString .= 'Food Requirements: ' . $postData["$key"]["foodRequirements"] . "\r\n";
$buildString .= 'Profession: ' . $postData["$key"]["profession"] . "\r\n";
$buildString .= 'Riding Experience: ' . $postData["$key"]["ridingExperience"] . "\r\n\r\n";


$emailHeading++;
//   foreach ($postData["$key"]   as $key => $value) {
// }

  // $buildString = $buildString . "$key => $value\n";
}

   $_POST['input_192'] = html_entity_decode($buildString);

   return $form;
}
  




