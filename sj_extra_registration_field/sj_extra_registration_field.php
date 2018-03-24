<?php 
/*
   Plugin Name: SJ - Extra Registration Field
   description: Adds billing_phone Registration field
   Author: Steven Jackson
   Author Contact: stevenjackson.sanguine@gmail.com
   Date Created: 19 March 2018
   */

	//  Create Additional input field on user registration

   add_action( 'register_form', 'sj_register_form' );
   function sj_register_form() {
   	$billing_phone = ( ! empty( $_POST['billing_phone'] ) ) ? sanitize_text_field( $_POST['billing_phone'] ) : '';?>
   	<p>
   		<label for="billing_phone"><?php _e( 'Telephone Number', 'mydomain' ) ?><br />
   			<input  type="tel" pattern="^[0-9\-\+\s\(\)]*$" name="billing_phone" id="billing_phone" class="input" placeholder="+2781 234 5689" value="<?php echo esc_attr(  $billing_phone  ); ?>" required/></label>
   		</p>
   		<?php
   	}

    // Field Validation
   	add_filter( 'registration_errors', 'sj_registration_errors', 10, 3 );
   	function sj_registration_errors( $errors, $sanitized_user_login, $user_email ) {

   		if ( empty( $_POST['billing_phone'] ) || ! empty( $_POST['billing_phone'] ) && trim( $_POST['billing_phone'] ) == '' ) {
   			$errors->add( 'billing_phone_name_error', sprintf('<strong>%s</strong>: %s',__( 'ERROR', 'mydomain' ),__( 'You must include a telephone number.', 'mydomain' ) ) );

   		}

   		return $errors;
   	}

    // Update User Meta
   	add_action( 'user_register', 'sj_user_register' );
   	function sj_user_register( $user_id ) {
   		if ( ! empty( $_POST['billing_phone'] ) ) {
   			update_user_meta( $user_id, 'billing_phone', sanitize_text_field( $_POST['billing_phone'] ) );
   		}
   	}

   	// Create Custom hook for Bookly
   	function sj_bookly_custom_hook() {
   		do_action('sj_bookly_custom_hook');
   	}

   	// Action Hook and return active users phone number 
   	add_action( 'sj_bookly_custom_hook', 'sj_get_current_user_billing_phone' );

   	function sj_get_current_user_billing_phone(){
   		$current_user_id = get_current_user_id();
   		$phone = get_user_meta($current_user_id,'billing_phone',true);

   		return $phone;
   	}