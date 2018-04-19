var gf_form_id = 15;
var cloned_cart = '';
var cloned_rider_details_wrapper = '';
var sj_rider_insurance_wrapper = '';
var sj_summary_booking_wrapper = '';
var sj_rider_booking_wrapper = '';


jQuery(document).ready(function() {

  cloned_add_rider_wrapper = jQuery( ".sj_add_rider_wrapper" ).clone();
  cloned_rider_details_wrapper = jQuery( ".sj_rider_details_wrapper" ).clone();
  sj_rider_insurance_wrapper  = jQuery( ".sj_rider_insurance_wrapper" ).clone();
  sj_summary_booking_wrapper  = jQuery( ".summary-wrapper" ).clone();
  sj_rider_booking_wrapper  = jQuery( ".summary-rider-wrapper" ).clone();
  
  cloned_first_rider_wrapper = "";
  var cloned_bike_options_first = '';
  var cloned_bike_options_second = '';

  jQuery( ".sj_rider_details_wrapper " ).hide();
  jQuery( "#field_"+gf_form_id+"_40" ).hide();
  jQuery('#gform_wrapper_'+gf_form_id+' .gform_footer #gform_submit_button_'+gf_form_id+'').hide();
  jQuery('.cart-total-price').hide()
  

  jQuery('#custom_html-2 .custom-html-widget').attr('data-rider-cart', '1');
  jQuery('#custom_html-2 .custom-html-widget h4').text('Rider 1');

  cloned_cart = jQuery( "#custom_html-2 .custom-html-widget" ).clone();


  jQuery('#field_'+gf_form_id+'_60 h2').css('float', 'left');
  jQuery('#field_'+gf_form_id+'_60 ').append('<span class="sj-close" style="float:right; border-radius: 50%;padding: 4px 14px; border: 1px solid" onclick="deleteRider(1)">x</a>');

  jQuery( "#input_"+gf_form_id+"_73" ).change(function() {
    jQuery(".cart-total-price").hide( );
    jQuery("#input_"+gf_form_id+"_150").empty();
    jQuery('#input_'+gf_form_id+'_77').empty().append(jQuery('<option>', { 
        value: "Select Bike",
        text : "Select Bike"
    }));

    jQuery('#input_'+gf_form_id+'_151').empty().append(jQuery('<option>', { 
        value: "Select Bike",
        text : "Select Bike"
    }));


    var dropdown_value = parseInt(jQuery( "select" ).val(), 0);
    var response = jQuery.getJSON( '/karoo/wp-content/plugins/sj_dynamic_gravity_form/dynamic_acf_data/acf_data.json', function(response) {

        jQuery.map(response, function(obj) {

// console.log(obj);
if(obj.id === dropdown_value) {

    jQuery.each( obj.tourDates.date, function( i, tour_dates ) {
        if (obj.tourDates.date[0] == "" && !obj.tourDates.date[1] == "") {


            if (!obj.tourDates.date == "" && !tour_dates.date == "") {

                jQuery("#gform_fields_"+gf_form_id+" li").show();

                jQuery('#input_'+gf_form_id+'_150').append(jQuery('<option>', { 
                    value: tour_dates.date,
                    text : tour_dates.date 
                }));
            } 

        } else {

            jQuery("#gform_fields_"+gf_form_id+" li").hide();
            jQuery(".gform_page_footer").hide();
            jQuery("#field_"+gf_form_id+"_54").show();
            jQuery("#field_"+gf_form_id+"_73").show();
            jQuery("#field_"+gf_form_id+"_150").show();

            jQuery('#input_'+gf_form_id+'_150').append(jQuery('<option>', { 
                value: "No tour avaiable",
                text : "No tour avaiable"
            }));
        }
    });


    jQuery.each( obj.tourBikes.bikes, function( i, tour_bikes ) {

        if (!obj.tourBikes.bikes[i].bikeName == "") {


            jQuery('#input_'+gf_form_id+'_77').append(jQuery('<option>', { 
                value: tour_bikes.bikePrice,
                text : tour_bikes.bikeName
            }));

            jQuery('#input_'+gf_form_id+'_151').append(jQuery('<option>', { 
                value: tour_bikes.bikePrice,
                text : tour_bikes.bikeName
            }));
        } 

    });


    jQuery("#field_"+gf_form_id+"_73").attr('tour-price',obj.price);
    jQuery(".tour-name").text(obj.tour);
    jQuery(".date-name").text(obj.tourDates.date[1].date);
    jQuery(".cart-total-price").hide( );
    jQuery("#custom_html-2").after( "<span class='cart-total-price' ></span>");



    return obj;
}        
});
  // console.log( "success" );
})
    .done(function() {

    })
    .fail(function() {
    // console.log( "error" );
})
    .always(function() {
    // console.log( "complete" );
});

// Perform other work here

});

  jQuery( "#input_"+gf_form_id+"_62" ).click(function() { 


    var riderType = jQuery( "#input_"+gf_form_id+"_62" ).find('input:checked').val();

    if (riderType == "Add solo rider") {
      jQuery( '[data-rider="1"]').attr('data-rider-type', 'solo-rider');
  } else {
    jQuery( '[data-rider="1"]').attr('data-rider-type', 'rider-with-passenger');
}
});

  jQuery( "#input_"+gf_form_id+"_150" ).change(function() {

    var dateChange = jQuery( "#input_"+gf_form_id+"_150" ).val();
    jQuery(".date-name").text(dateChange);

});

  jQuery( "div.sj_rider_wrapper[data-rider='1']" ).change(function() {

    var data = 'div.sj_rider_wrapper[data-rider="1"]';
    sj_add_rider_wrapper_count = get_wrapper_count("sj_rider_wrapper");
    var roomOccupancy = jQuery( "#input_"+gf_form_id+"_78 option:selected" ).text();
    var bikeSelect = jQuery( "#input_"+gf_form_id+"_77 option:selected" ).text();
    var rideType = jQuery('[data-rider="1"]').attr('data-rider-type');
    var roommateCheck = false;

    if (rideType == 'solo-rider') {

       if (roomOccupancy == "Please select" || roomOccupancy == "Each single room (1 person, 1 bed)") {
        jQuery(data + ' #field_'+gf_form_id+'_91' ).hide();
        jQuery(data + ' #field_'+gf_form_id+'_152' ).next().remove();
        roommateCheck = false;
    } else {
        jQuery(data + ' #field_'+gf_form_id+'_91' ).show();
        jQuery(data + ' #field_'+gf_form_id+'_152' ).next().remove();
        roommateCheck = true;
    }
}


if (roomOccupancy == "Please select" || bikeSelect == "Select Bike") {
    jQuery( "#custom_html-2" ).hide();
    jQuery(data + ' #field_'+gf_form_id+'_152' ).next().remove();



}

if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {

    if (roommateCheck == true) {
     if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {
        console.log(roommateCheck);
        

        if (jQuery(data + ' #input_'+gf_form_id+'_91' ).val() == "") {
         alert("Error: Room mate name is required");
         jQuery(data).find( " #input_"+gf_form_id+"_91" ).css('border-color', 'red');
         jQuery(data).focus();
         jQuery( "#input_"+gf_form_id+"_77" ).prop("selectedIndex", 0);
         roommateCheck = true;
     } else {

        jQuery('#sj_add_rider' ).remove();
        jQuery(data).find( " #input_"+gf_form_id+"_91" ).css('border-color', '#424242');
        clone_cart();
        clone_rider_options(sj_add_rider_wrapper_count);

    }


} 

}
else {

 if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {
    console.log(roommateCheck);
    jQuery('#sj_add_rider' ).remove();
    clone_cart();
    clone_rider_options(sj_add_rider_wrapper_count);

} 
}


}

});

  jQuery( "#field_"+gf_form_id+"_62" ).click(function() {


    jQuery( '[data-rider="1"] #field_'+gf_form_id+'_91').hide();
    jQuery( "#field_"+gf_form_id+"_62" ).hide();
});


  jQuery( "#custom_html-2" ).hide();
  jQuery( ".sj_rider_insurance_wrapper" ).remove();
  jQuery( ".sj_confirm_booking_wrapper" ).remove();
}); // document ready



console.log('SJ - Dynamic Gravity Form JS Active');

