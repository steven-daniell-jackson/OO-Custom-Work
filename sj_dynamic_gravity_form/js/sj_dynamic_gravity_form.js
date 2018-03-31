var gf_form_id = 15;
var cloned_cart = '';
var cloned_rider_details_wrapper = '';
jQuery(document).ready(function() {






  jQuery('#gform_submit_button_'+gf_form_id).click(function(e) { 

    var tour = jQuery('#input_'+gf_form_id +'_73 :selected').text();
    var tourDate = jQuery('#input_'+gf_form_id +'_150 :selected').text();
    var postData = [];

    var tour = jQuery('#input_'+gf_form_id +'_73 :selected').text()
    jQuery('#input_'+gf_form_id +'_73 :selected')
    jQuery('.sj_rider_wrapper').each(function(){ 

        var sharingCheckbox = jQuery(this).find('#choice_'+gf_form_id +'_79_1').is(':checked');
        var roommateName = jQuery(this).find('#input_'+gf_form_id +'_91').val();
        var riderRemarks = jQuery(this).find('#input_'+gf_form_id +'_152').val();
        var riderID = jQuery(this).attr('data-rider');
        var riderDetails = jQuery('[rider-details="'+riderID+'"]');

        var rider = new Object();
        rider.riderTour = tour;
        rider.riderTourDate = tourDate;
        rider.riderNumber = riderID;
        rider.dataRiderType = jQuery(this).attr('data-rider-type');
        rider.roomOccupancy = jQuery(this).find('#input_'+gf_form_id +'_78 :selected').text();
        rider.bikeFirst = jQuery(this).find('#input_'+gf_form_id +'_77 :selected').text();
        rider.bikeSecond = jQuery(this).find('#input_'+gf_form_id +'_151 :selected').text();

        (riderRemarks != "") ? rider.riderRemarks = riderRemarks : '';
        (roommateName != "") ? rider.roommateName = roommateName : '';
        (sharingCheckbox) ? rider.sharing = jQuery(this).find('#label_'+gf_form_id +'_79_1').text() : '';

        rider.Details = 'Rider ' + riderID + '- Details';
        rider.title =  jQuery(riderDetails).find('#input_'+gf_form_id +'_3 :selected').text();
        rider.firstNames =  jQuery(riderDetails).find('#input_'+gf_form_id +'_1').val();
        rider.familyName =  jQuery(riderDetails).find('#input_'+gf_form_id +'_169').val();
        rider.familyNameTitle =  jQuery(riderDetails).find('#input_'+gf_form_id +'_159').val();
        rider.dateOfBirth =  jQuery(riderDetails).find('#input_'+gf_form_id +'_5').val();
        rider.nationality =  jQuery(riderDetails).find('#input_'+gf_form_id +'_35').val();
        rider.passportNo =  jQuery(riderDetails).find('#input_'+gf_form_id +'_160').val();
        rider.passportImage =  'temp: passportImage';
        rider.drivesLicense  =  jQuery(riderDetails).find('#input_'+gf_form_id +'_159').val();
        rider.driversLicenseImage =  'temp: driversLicenseImage';
        rider.email =  jQuery(riderDetails).find('#input_'+gf_form_id +'_38').val();
        rider.phone =  jQuery(riderDetails).find('#input_'+gf_form_id +'_70').val();
        rider.address =  'temp: address';
        rider.profession =  jQuery(riderDetails).find('#input_'+gf_form_id +'_162').val();
        rider.ridingExperience =  jQuery(riderDetails).find('#input_'+gf_form_id +'_163').val();
        rider.shirtSize =  jQuery(riderDetails).find('#input_'+gf_form_id +'_37 :selected').text();
        rider.foodRequirements =   'temp: foodRequirements';
        rider.favouriteBikes =  jQuery(riderDetails).find('#input_'+gf_form_id +'_164 :selected').text();
        
        postData.push(rider); 
    });

// console.log(postData);
// e.preventDefault();
var postData = JSON.stringify(postData);
console.log(postData);
var test2 = "ajax post test";


jQuery.ajax({
   type: "POST",
   dataType: 'json',
   data: {
    action:'sj_rider', 
    riderData : postData
       // 'id': {'test': 166323}
   },
   url: ajaxurl,
   success: function(responseData) {
        // consider using console.log for these kind of things.
    // jQuery('#gform_confirmation_wrapper_15').html(responseData);
    console.log('success');
}
});
});




  cloned_add_rider_wrapper = jQuery( ".sj_add_rider_wrapper" ).clone();
  cloned_rider_details_wrapper = jQuery( ".sj_rider_details_wrapper " ).clone();
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

}); // document ready


function add_rider_details(e) {

    jQuery('.sj_rider_wrapper ').hide();
    jQuery('.sj_add_rider_wrapper ').hide();
    jQuery('#field_'+gf_form_id+'_69 ').hide();
    jQuery( "#field_"+gf_form_id+"_40" ).show();
    jQuery('[rider-details]').remove();
    jQuery('.sj_next').remove();

    var totalRiders = e;   
    var riderDetailsNumber = 1;

    for (e; e > 0; e--) {

        if (riderDetailsNumber == totalRiders) {

            if (riderDetailsNumber == 1) {
               jQuery('#field_'+gf_form_id+'_40').after(cloned_rider_details_wrapper.clone(true)).show();
               jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', riderDetailsNumber);

               jQuery('[rider-details="'+riderDetailsNumber+'"]').append('<a class="button sj_continue" onclick="nextRiderDetailsLast('+riderDetailsNumber+')">Continue</a>').show();

           } else {
            jQuery('[rider-details]').after(cloned_rider_details_wrapper.clone(true)).show()
            jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', riderDetailsNumber);
            jQuery('[rider-details="'+riderDetailsNumber+'"]').append('<a class="button sj_continue" onclick="nextRiderDetailsLast('+riderDetailsNumber+')">Continue</a>').show();

        }
    } else {


       if (riderDetailsNumber == 1) {

           jQuery('#field_'+gf_form_id+'_40').after(cloned_rider_details_wrapper.clone(true)).show();
           jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', riderDetailsNumber);
           jQuery('[rider-details="'+riderDetailsNumber+'"] .sj_next').remove();

       } else {

        jQuery('[rider-details]').after(cloned_rider_details_wrapper.clone(true)).show()
        jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', riderDetailsNumber);
        jQuery('[rider-details="'+riderDetailsNumber+'"]').append('<a href="#gform_'+gf_form_id+'" class="button sj_next" onclick="nextRiderDetails('+e+')">Next Rider</a>').show();
    }

    jQuery('[rider-details='+riderDetailsNumber+']').append('<a href="#gform_'+gf_form_id+'" class="button sj_next " onclick="nextRiderDetails('+e+')">Next Rider</a>').show();
    riderDetailsNumber += 1;
}

}

jQuery('[rider-details='+totalRiders+'] .sj-next').remove();
jQuery('[rider-details]').hide();
jQuery( "#field_"+gf_form_id+"_40 h2" ).text('Rider 1 - Details');
jQuery('[rider-details]').first().show();

}


function nextRiderDetailsLast(e) {

    if (validateRiderDetails(e) != false) {

        jQuery('.sj_continue').remove();
        jQuery('#gform_wrapper_'+gf_form_id+' .gform_footer #gform_submit_button_'+gf_form_id+'').show();
    }
    
}

function nextRiderDetails(e){
    console.log('CLICK add_rider_details: ' + e);
    var prevRider = e - 1; 

    if (validateRiderDetails(prevRider) != false) {

    jQuery('[rider-details='+prevRider+']').hide();
    jQuery('[rider-details ='+e+']').show();
    jQuery( "#field_"+gf_form_id+"_40 h2" ).text('Rider '+e+' - Details');

     }

}


function validateRiderDetails(e){

    var valid = true;
    var data = '[rider-details="'+e+'"]';
    console.log("validateRiderDetails running");
    console.log("validateRiderDetails " + e);
    console.log(data);

    if (jQuery(data + " #input_"+gf_form_id+"_1").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_1" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_1" ).css('border-color', '#424242');

    }

    if (jQuery(data + " #input_"+gf_form_id+"_169").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_169" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_169" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_5").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_5" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_5" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_35").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_35" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_35" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_38").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_38" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_38" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_18_1").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_18_1" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_18_1" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_18_3").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_18_3" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_18_3" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_18_4").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_18_4" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_18_4" ).css('border-color', '#424242');

    }


    if (jQuery(data + " #input_"+gf_form_id+"_18_5").val() == '') {
        jQuery(data + " #input_"+gf_form_id+"_18_5" ).css('border-color', 'red');
        valid = false;
        
    } else {
        jQuery(data).find( " #input_"+gf_form_id+"_18_5" ).css('border-color', '#424242');

    }


if (valid == false) {
    jQuery(data + " #input_"+gf_form_id+"_1" ).focus();
    alert ('Missing required fields');
}

return valid;
}

function clone_cart(e){

    jQuery( '#custom_html-2 ').empty();
    var count = 0;
    var riderNumber = count + 1;

    var tour = jQuery("#input_"+gf_form_id+"_73 :selected").text();
    var tourDate = jQuery("#input_"+gf_form_id+"_150 :selected").text();


    jQuery("[data-rider]").each(function(){

        var bike = jQuery(this).find('#input_'+gf_form_id+'_77 :selected').text();
        var room = jQuery(this).find('#input_'+gf_form_id+'_78 :selected').text();

        jQuery( '#custom_html-2 ').append(cloned_cart.clone(true)).show();

        jQuery( "[data-rider-cart]").last().attr("data-rider-cart", riderNumber);
        jQuery( "[data-rider-cart] #tour_row span").last().text(tour).show(); 
        jQuery( "[data-rider-cart] #date_row span").last().text(tourDate).show();
        jQuery( "[data-rider-cart] #bike_row span").last().text(bike).show(); 
        jQuery( "[data-rider-cart] #room_row span").last().text(room).show();  
        jQuery( "[data-rider-cart] h4").last().text("Rider " + riderNumber); 
        count += 1;
        riderNumber += 1;
    });

    total_price_update(count);
    jQuery('.sj_next').remove();
    jQuery('#gform_wrapper_'+gf_form_id+' .gform_footer').append('<a class="button sj_next" onclick="add_rider_details('+count+')">Next step</a>');
}




function total_price_update(e){
    var updatePrice = "";
    var priceChange = jQuery("#field_"+gf_form_id+"_73").attr('tour-price');

    priceChange = Number(priceChange.replace(/[^0-9\.-]+/g,""));
    priceChange = parseInt(priceChange);

    updatePrice = e *priceChange;
    jQuery(".cart-total-price").text("Total Price: R " + updatePrice).show();

}


function deleteRider(e){
    jQuery('.sj_add_rider_wrapper' ).remove();

    cloned_first_rider_wrapper = jQuery( "[data-rider='1']" ).clone();
    cloned_bike_options_first = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_77' ).clone();
    cloned_bike_options_second = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_151' ).clone();
    
    var prev = e - 1;
    var totalRiders = 0;

    jQuery('[data-rider="'+e+'"]' ).remove();
    jQuery('[rider-number="'+e+'"]' ).remove();
    jQuery('[data-rider-cart="'+e+'"]' ).remove();

    totalRiders = countRiderWrapper('sj_rider_wrapper ');

    if (totalRiders == 0) {

        clone_first_rider_options();
    } else {
       clone_rider_options(prev);
   }

   update_riders_on_delete();
   clone_cart();
}


function update_riders_on_delete(){
    var sj_wrapper_count = 0;
    var riderNumber = sj_wrapper_count+1;
    var riderType = '';

    jQuery("div.sj_rider_wrapper ").each(function(){
        riderType = jQuery("div.sj_rider_wrapper").eq(sj_wrapper_count).attr('data-rider-type');
        jQuery("div.sj_rider_wrapper").eq(sj_wrapper_count).attr('data-rider',riderNumber);
        jQuery('[data-rider-cart]').eq(sj_wrapper_count).attr('data-rider-cart',riderNumber);

        jQuery( '[data-rider-cart="'+riderNumber+'"] h4').text('Rider' + riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find("h2.gsection_title").text(riderType +' ' + riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find(".sj-close").attr('onclick' , 'deleteRider('+riderNumber+')');
        jQuery( '[data-rider="'+riderNumber+'"]').find('#input_'+gf_form_id+'_77').attr('onClick','dropdown_check('+riderNumber +')').attr("data-rider-choice-first", riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find('#input_'+gf_form_id+'_151').attr("data-rider-choice-second", riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find('#input_'+gf_form_id+'_78').attr('onClick','dropdown_check('+riderNumber +')');

        sj_wrapper_count += 1; 
        riderNumber += 1;
        
    });
    jQuery('#sj_add_rider' ).remove();
    jQuery('#sj_add_rider' ).attr('onclick', 'clone_rider_options('+sj_wrapper_count+')')
    clone_cart();
    enable_current_rider(sj_wrapper_count);

    
}

function clone_first_rider_options(){
    var firstRider = 1;
    jQuery( '#field_'+gf_form_id+'_69' ).after(cloned_add_rider_wrapper).show();
    jQuery("#sj_add_rider_wrapper" ).attr('rider-number', '1')
    jQuery("[rider-number='"+firstRider+"']" ).show();
    jQuery('[rider-number="'+ firstRider +'"]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_first_rider('+ 1 +')');
    jQuery('[rider-number="'+ firstRider +'"]' ).find('#label_'+gf_form_id+'_62_1').attr('onClick','clone_first_rider('+ 1 +', "passenger")');

}

function clone_first_rider(e, f){
    showDelete(e);

    jQuery( '[rider-number="'+e+'"]').after(cloned_first_rider_wrapper).show();
    jQuery('[rider-number="'+e+'"]' ).hide();

    if (f == "passenger") {
        console.log("passenger clicked");
        jQuery( '[data-rider="'+e+'"]').find("h2.gsection_title").text('Rider with Passenger' + e);
        jQuery( '[data-rider="'+e+'"]').attr('data-rider-type', "rider-with-passenger");
    } else {
        console.log("solo clicked");
        jQuery( '[data-rider="'+e+'"]').find("h2.gsection_title").text('Solo Rider' + e);
        jQuery( '[data-rider="'+e+'"]').attr('data-rider-type',  "solo-rider");
    }

    jQuery( '[data-rider="'+e+'"]').attr('data-rider', e);
    jQuery( '[data-rider="'+e+'"]').find('#sj_add_rider').remove();
    jQuery( '[data-rider="'+e+'"]').find('.sj-close').attr('onclick', 'deleteRider('+e+')');

    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').attr('onClick','dropdown_check('+e +')').attr("data-rider-choice-first", e);
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').attr("data-rider-choice-second", e);
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_78').attr('onClick','dropdown_check('+e +')');

    jQuery( '[data-rider="'+e+'"]').find('#field_'+gf_form_id+'_91').hide();

    enable_current_rider(e);



}

function countRiderWrapper(e){
    var sj_wrapper_count = 0;
    jQuery("div." + e).each(function(){
        sj_wrapper_count += 1; 

    });
    return sj_wrapper_count;
}


function showDelete(e){
    jQuery('.sj-close ').show();
}


function clone_rider_options(e){
    jQuery('#sj_add_rider' ).remove();
    var wrapperCount = get_wrapper_count('sj_rider_wrapper ');
    var newRider = wrapperCount + 1;

    jQuery( '[data-rider]' ).last().after(cloned_add_rider_wrapper);
    console.log('[rider-number="'+ wrapperCount +'"]');
    jQuery('[rider-number]' ).attr('rider-number',newRider );
    jQuery('[rider-number]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_rider('+ newRider +')');
    jQuery('[rider-number]' ).find('#label_'+gf_form_id+'_62_1').attr('onClick','clone_rider('+ newRider +', "passenger")');
    jQuery('[rider-number]' ).show();

}


function clone_rider(e, f){
    showDelete(e);

    sj_add_rider = e - 1;
    var cloned_rider_wrapper = jQuery( "[data-rider='1']" ).clone();
    disable_previous_rider(sj_add_rider);

    jQuery('[rider-number="'+ e +'"]' ).eq(1).remove();
    jQuery('[rider-number="'+ e +'"]' ).remove();
    jQuery( '[data-rider="'+sj_add_rider+'"]').after(cloned_rider_wrapper);


    var cloned_bike_options_first = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_77' ).clone();
    var cloned_bike_options_second = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_151' ).clone();

    jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('RIDER' + e);
    jQuery( '[data-rider="1"]').eq(1).find('input_'+gf_form_id+'_91').val("");

    if (f == "passenger") {
        console.log("passenger clicked");
        jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('Rider with Passenger' + e);
        jQuery( '[data-rider="1"]').eq(1).attr('data-rider-type', "rider-with-passenger");
    } else {
        console.log("solo clicked");
        jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('Solo Rider' + e);
        jQuery( '[data-rider="1"]').eq(1).attr('data-rider-type',  "solo-rider");
    }

    jQuery( '[data-rider="1"]').eq(1).attr('data-rider', e);
    jQuery( '[data-rider="'+sj_add_rider+'"]').find('#sj_add_rider').remove();
    jQuery( '[data-rider="'+e+'"]').find('#sj_add_rider').remove();
    jQuery( '[data-rider="'+e+'"]').find('.sj-close').attr('onclick', 'deleteRider('+e+')');

    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(0).attr('onClick','dropdown_check('+e +')').attr("data-rider-choice-first", e);
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(0).attr("data-rider-choice-second", e);
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_78').eq(0).attr('onClick','dropdown_check('+e +')');

    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_91').val("");
    jQuery( '[data-rider="'+e+'"]').find('#field_'+gf_form_id+'_91').hide();
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(1).remove();
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(1).remove();


    enable_current_rider(e);

}

function dropdown_check(e){
    var data = '[data-rider="' + e + '"]';
    var wrapperCount = get_wrapper_count('sj_rider_wrapper ');

    var roomOccupancy = jQuery( data).find("#input_"+gf_form_id+"_78 option:selected").text();
    var bikeSelect = jQuery( data).find( "#input_"+gf_form_id+"_77 option:selected" ).text();
    var rideType = jQuery('[data-rider="' + e + '"]').attr('data-rider-type');
    var roommateCheck = false;

    if (rideType == 'solo-rider') {

        if (roomOccupancy == "Please select" || roomOccupancy == "Each single room (1 person, 1 bed)") {
            jQuery(data + ' #field_'+gf_form_id+'_91' ).hide();
            jQuery('#sj_add_rider' ).remove();

            roommateCheck = false;
        } else {
            jQuery(data + ' #field_'+gf_form_id+'_91' ).show();
            jQuery('#sj_add_rider' ).remove();

            roommateCheck = true;
        }

    }

    jQuery('[data-rider-cart="' + e + '"]' ).remove();

    if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {

        if (roommateCheck == true) {
           if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {
            console.log(roommateCheck);


            if (jQuery(data + ' #input_'+gf_form_id+'_91' ).val() == "") {
               alert("Error: Room mate name is required");
               jQuery(data).find( " #input_"+gf_form_id+"_91" ).css('border-color', 'red');
               jQuery(data).focus();
               jQuery( data+ " #input_"+gf_form_id+"_77" ).prop("selectedIndex", 0);
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

}

function update_cart_info(e,roomOccupancy,bikeSelect){
    jQuery('[data-rider-cart="' + e + '"] .bike_row' ).text(bikeSelect);
    jQuery('[data-rider-cart="' + e + '"] #room_row span' ).text(roomOccupancy);
}


function disable_previous_rider(e){
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#sj_add_rider").remove();
}

function enable_current_rider(e){

    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", false);
}


function get_wrapper_count(e){
    var sj_wrapper_count = 0;
    jQuery("div." + e).each(function(){
        sj_wrapper_count += 1; 

    });
    console.log(sj_wrapper_count);
    return sj_wrapper_count;
}

console.log('SJ - Dynamic Gravity Form JS Active');



