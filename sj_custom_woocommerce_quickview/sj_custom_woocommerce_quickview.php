<?php
/*
Plugin Name: SJ Custom Woocommerce Quickview
description: Quickview in the Dashboard
Author: Steven Jackson
Author Contact: stevenjackson.sanguine@gmail.com
Date Created: 10 July 2018
*/



function sj_custom_woocommerce_quickview_js()
{
	wp_enqueue_script('sjcustomwoocommercequickviewjs', plugins_url() . "/sj_custom_woocommerce_quickview/js/sj_custom_woocommerce_quickview.js", array(
		'jquery'
	) , null, false);
  
}

add_action('admin_enqueue_scripts', 'sj_custom_woocommerce_quickview_js');


add_action('wp_ajax_nopriv_ajax_request', 'ajax_handle_request');
add_action('wp_ajax_ajax_request', 'ajax_handle_request');

function ajax_handle_request(){

    $postID = $_POST['id'];
    $product = new WC_Product($postID); 

    if (isset($_POST['id'])){
        $post_id = $_POST['id'];
        $feat_image = wp_get_attachment_url( get_post_thumbnail_id($post_id) );

        
    }else{
        $post_id = "";
    }

    global $post;
    $post = get_post($postID);

    $response = array( 
        'success' => true, 
        'post' => $post,
        'id' => $postID , 
    );

    print_r($feat_image);

    return false;
    // IMPORTANT: don't forget to "exit"
    exit;
}