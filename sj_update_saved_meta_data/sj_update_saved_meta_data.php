<?php 
/*
   Plugin Name: SJ - Update Saved Meta Data
   description: Updates Bookly form's Custom Field addon to autofill saved user data
   Author: Steven Jackson
   Author Contact: stevenjackson.sanguine@gmail.com
   Date Created: 19 March 2018
   */

  //  Create Additional input field on user registration


   add_action( 'show_user_profile', 'extra_user_profile_fields' );
   add_action( 'edit_user_profile', 'extra_user_profile_fields' );

   function extra_user_profile_fields( $user ) { ?>
   <h3 style="color:#414042; padding-top: 20px;"><?php _e("Additional Profile Information", "blank"); ?></h3>

   <table class="form-table">
    <tr>
        <th><label for="parkingBayNumber"><?php _e("Parking Bay Number"); ?></label></th>
        <td>
            <input type="text" name="parkingBayNumber" id="parkingBayNumber" value="<?php echo esc_attr( get_the_author_meta( 'parkingBayNumber', $user->ID ) ); ?>" class="regular-text" /><br />
            <span class="description"><?php _e("Update Parking Bay Number."); ?></span>
        </td>
    </tr>
    <tr>
        <th><label for="carMake"><?php _e("Car Make"); ?></label></th>
        <td>
            <input type="text" name="carMake" id="carMake" value="<?php echo esc_attr( get_the_author_meta( 'carMake', $user->ID ) ); ?>" class="regular-text" /><br />
            <span class="description"><?php _e("Update Car Make."); ?></span>
        </td>
    </tr>
    <tr>
        <th><label for="carColour"><?php _e("Car Colour"); ?></label></th>
        <td>
            <input type="text" name="carColour" id="carColour" value="<?php echo esc_attr( get_the_author_meta( 'carColour', $user->ID ) ); ?>" class="regular-text" /><br />
            <span class="description"><?php _e("Update Car Colour."); ?></span>
        </td>
    </tr>
    <tr>
        <th><label for="plateNumber"><?php _e("Plate Number"); ?></label></th>
        <td>
            <input type="text" name="plateNumber" id="plateNumber" value="<?php echo esc_attr( get_the_author_meta( 'plateNumber', $user->ID ) ); ?>" class="regular-text" /><br />
            <span class="description"><?php _e("Update Plate Number."); ?></span>
        </td>
    </tr>
</table>
<?php }

add_action( 'personal_options_update', 'save_extra_user_profile_fields' );
add_action( 'edit_user_profile_update', 'save_extra_user_profile_fields' );

function save_extra_user_profile_fields( $user_id ) {
    if ( !current_user_can( 'edit_user', $user_id ) ) { 
        return false; 
    }
    update_user_meta( $user_id, 'parkingBayNumber', $_POST['parkingBayNumber'] );
    update_user_meta( $user_id, 'carMake', $_POST['carMake'] );
    update_user_meta( $user_id, 'carColour', $_POST['carColour'] );
    update_user_meta( $user_id, 'plateNumber', $_POST['plateNumber'] );
}

    // Create Custom hook for Bookly Addon Custom Fields
function sj_bookly_addon_custom_fields_hook() {
    do_action('sj_bookly_addon_custom_fields_hook');
}

    // Action Hook and return active users phone number 
add_action( 'sj_bookly_addon_custom_fields_hook', 'sj_get_user_meta_data' );

function sj_get_user_meta_data($meta){
    $current_user_id = get_current_user_id();
    $user_meta_data = get_user_meta($current_user_id,$meta,true);

    return $user_meta_data;
}

function get_prev_ajax_handler() {

$current_user_id = get_current_user_id();

update_user_meta( $current_user_id, 'parkingBayNumber', $_COOKIE['parkingBayNumber']);
update_user_meta( $current_user_id, 'plateNumber', $_COOKIE['plateNumber']);
update_user_meta( $current_user_id, 'carMake', $_COOKIE['carMake']);
update_user_meta( $current_user_id, 'carColour', $_COOKIE['carColour']);
update_user_meta( $current_user_id, 'billing_phone', $_COOKIE['billing_phone']);

}

add_action('wp_ajax_get_prev', 'get_prev_ajax_handler'); // add action for logged users
add_action( 'wp_ajax_nopriv_get_prev', 'get_prev_ajax_handler' ); // add action for unlogged users


function update_name_ajax_handler() {

$current_user_id = get_current_user_id();

update_user_meta( $current_user_id, 'first_name', $_COOKIE['firstName']);
update_user_meta( $current_user_id, 'last_name', $_COOKIE['lastName']);


}

add_action('wp_ajax_update_name', 'update_name_ajax_handler'); // add action for logged users
add_action( 'wp_ajax_nopriv_update_name', 'update_name_ajax_handler' ); // add action for unlogged users

add_action('wp_head', 'myplugin_ajaxurl');

function myplugin_ajaxurl() {
    echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
         </script>';
}

// 