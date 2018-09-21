jQuery(document).ready(function($){

  console.log("SJ Running");

  jQuery('.vendor.post-new-php .wrap').html('<div class="sj-form-container left"><form id="sj-add-product-form" action="" method="post"><div class="product-name"><h2>Product Name</h2><input class="sj-input-full" name="productName" type="text" id="productName" required></div><div class="product-categories"><h2>Product Categories</h2><fieldset class="categories-radio" required><?php getWoocommerceCategories() ?><fieldset></div><div class="product-tags"><h2>Product tags</h2><input class="sj-input-full" type="text" name="tags" id="productTags" placeholder="tag1, tag2, tag3" required><br><label>Seperate tags with commas</label></div><div class="product-description"><h2>Description</h2><textarea class="sj-input-full" type="text" name="description" id="description" placeholder=""></textarea></div><div class="product-upload"><h2>Upload image</h2><label for="upload_image"><input id="upload_image" type="text" size="36" name="image" value="" disabled="disabled" required/> <input id="upload_image_button" class="button" type="button" value="Select File"/><br/>Minimum resolution is 3.8 MP (2400 x 1600 pixels)</label></div><div class="license-upload"><div class="sj-half"><h2>Model release form</h2><label for="upload_image"><input id="upload_model_release" type="text" size="36" name="image" value="" disabled="disabled" required/> <input id="upload_model_release_button" class="button" type="button" value="Select File"/></label></div><div class="sj-half"><h2>Property release form</h2><label for="upload_image"><input id="upload_property_release" type="text" size="36" name="image" value="" disabled="disabled" required/> <input id="upload_property_release_button" class="button" type="button" value="Select File"/></label></div></div><br><br><input type="checkbox" name="terms" value="" required> I verify that I have read the <a href="https://braveart.com.na/legal/licence-agreement/"  target="_blank">Terms and Conditions</a> and agree on them.<br><br><br><input type="submit" value="Submit Photo"></form></div><div class="sj-requirements-container left"><div class="sj-block"><div class="sj-block-header">Photo requirements:</div><div class="sj-block-content">Photo\'s must be in JPEG/JPG format with an RGB colour space <br><br>Minimum resolution is 3.8 MP (2400x1600) <br><br>Photos may not be larger than 50 MB</div></div><div class="sj-block"><div class="sj-block-header">Downloads:</div><div class="sj-block-content"><div class="downloads-block"><span>Model release form:</span> <a  target="_blank" href="https://s3-eu-west-1.amazonaws.com/braveartwpmedia-irl/wp-content/uploads/2018/07/Model-release-form-2018.pdf"><img src="http://braveart.openorigin.co.za/wp-content/plugins/sj_custom_woocommerce_add_product/assests/download-btn.png" alt=""></a></div><div class="downloads-block"><span>Property release form:</span><a target="_blank" href="https://s3-eu-west-1.amazonaws.com/braveartwpmedia-irl/wp-content/uploads/2018/07/Property-release-form-2018.pdf"><img src="http://braveart.openorigin.co.za/wp-content/plugins/sj_custom_woocommerce_add_product/assests/download-btn.png" alt=""></a></div></div></div></div>');


  jQuery('.vendor.post-new-php .wrap').html(function(){ 

   $.ajax({
    url: '/wp-content/themes/dt-the7-child/woocommerce/categories/export.html',
    success: function(data) {
      jQuery('.product-categories fieldset').html(data);
    }
  });

 });


  var custom_uploader;


  $('#upload_image_button').click(function(e) {

   e.preventDefault();

        //If the uploader object has already been created, reopen the dialog
        // if (custom_uploader) {
        //  custom_uploader.open();
        //  return;
        // }

        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
          title: 'Choose Image',
          button: {
            text: 'Choose Image'
          },
          multiple: false
        });

        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
          console.log(custom_uploader.state().get('selection').toJSON());
          attachment = custom_uploader.state().get('selection').first().toJSON();
          $('#upload_image').attr( "data-img-id", attachment.id ).val(attachment.url);
        });

        //Open the uploader dialog
        custom_uploader.open();

      });

  $('#upload_model_release_button').click(function(e) {

   e.preventDefault();

        //If the uploader object has already been created, reopen the dialog
        // if (custom_uploader) {
        //   custom_uploader.open();
        //   return;
        // }

        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
          title: 'Choose Model Release Form',
          button: {
            text: 'Choose Model Release Form'
          },
          multiple: false
        });

        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
          console.log(custom_uploader.state().get('selection').toJSON());
          attachment = custom_uploader.state().get('selection').first().toJSON();
          $('#upload_model_release').val(attachment.url);
        });

        //Open the uploader dialog
        custom_uploader.open();

      });


  $('#upload_property_release_button').click(function(e) {

   e.preventDefault();

        //If the uploader object has already been created, reopen the dialog
        // if (custom_uploader) {
        //   custom_uploader.open();
        //   return;
        // }

        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
          title: 'Choose Property Release Form',
          button: {
            text: 'Choose Property Release Form'
          },
          multiple: false
        });

        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
          console.log(custom_uploader.state().get('selection').toJSON());
          attachment = custom_uploader.state().get('selection').first().toJSON();
          $('#upload_property_release').val(attachment.url);
        });

        //Open the uploader dialog
        custom_uploader.open();

      });


  $('#sj-add-product-form').submit(function (e) {
     e.preventDefault(); // Prevent the default form submit



     var valid = true;
     var _productName = jQuery('#productName').val();
     var _productTags = jQuery('#productTags').val();
     var _productTagsArray = _productTags.split(',');
     var _productDescription = jQuery('#description').val();
     var _productImage = jQuery('#upload_image').val();
     var _productImageId = jQuery('#upload_image').attr('data-img-id');
     var _upload_model_release = jQuery('#upload_model_release').val();
     var _upload_property_release = jQuery('#upload_property_release').val();
     var _terms_and_conditions = jQuery('[name="terms"]').is(':checked');

if (!_terms_and_conditions) {
   valid = false;
   jQuery('.product-upload').after('<span class="error image-upload-error">Please accept the terms and conditions<span>');
} else {
  jQuery('.image-upload-error').remove();
}


     if (!_productName ) {valid = false;jQuery('#productName').append('<span class="error">Product Name cannot be empty<span>');} 
// if (!_productTags ) {valid = false;jQuery('#productTags').append('<span class="error">Product Tags cannot be empty<span>');} 
// if (!_productDescription ) {valid = false;jQuery('#description').append('<span class="error">Product Description cannot be empty<span>');} 
if (!_productImageId) {
  valid = false;
  jQuery('.image-upload-error').remove();
  jQuery('.product-upload').after('<span class="error image-upload-error">Please upload an image<span>');
} else {
  jQuery('.image-upload-error').remove();
}



     // Product Category validation
     var _productCategory = new Array();
     typeof _productCategory == "undefined";

     $("#sj-add-product-form input[type=checkbox]:checked").each(function() {
      _productCategory.push($(this).val());
     });


     if (typeof _productCategory == "undefined" || _productCategory.length == 0) {
      jQuery('.product-category-error').remove();
      jQuery('.product-categories').append('<span class="error product-category-error">Please select atleast 1 category<span>');
     } else {
      jQuery('.product-category-error').remove();
    }



    if (valid) {
      jQuery('.form-error').remove();

      $.ajax({
    url: ajaxurl, // this is the object instantiated in wp_localize_script function
    type: 'POST',
    data:{ 
      action: 'myaction', // this is the function in your functions.php that will be triggered
      productName: _productName,
      productTagsArray: _productTagsArray,
      productDescription: _productDescription,
      productCategory: _productCategory,
      productImage: _productImage,
      productImageId: _productImageId,
      upload_model_release: _upload_model_release,
      upload_property_release: _upload_property_release
    },
    success: function( data ){
      //Do something with the result from server
      // alert('Product created successfully');
      window.location.href = "/wp-admin/edit.php?post_type=product";
      // location.reload();
      // console.log( data );
    }
  });


    }
    else {
      jQuery('.form-error').remove();
      jQuery('.sj-form-container').append('<span class="error form-error">There was an error in your submission</span>');
    }





  });


});