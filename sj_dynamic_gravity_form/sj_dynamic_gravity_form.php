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






function sj_write_json_file($data){
  // print_r($choices);
$myfile = fopen(dirname(__FILE__) . '/dynamic_acf_data/acf_data.json', "w") or die("Unable to open file!");
      fwrite($myfile, json_encode($data));
      fclose($myfile);

}

   












?>