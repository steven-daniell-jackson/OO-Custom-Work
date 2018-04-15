    function createRiderObjs(){


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

        // rider.Details = 'Rider ' + riderID + '- Details';
        // rider.title =  jQuery(riderDetails).find('#input_'+gf_form_id +'_3 :selected').text();
        // rider.firstNames =  jQuery(riderDetails).find('#input_'+gf_form_id +'_1').val();
        // rider.familyName =  jQuery(riderDetails).find('#input_'+gf_form_id +'_169').val();
        // rider.familyNameTitle =  jQuery(riderDetails).find('#input_'+gf_form_id +'_159').val();
        // rider.dateOfBirth =  jQuery(riderDetails).find('#input_'+gf_form_id +'_5').val();
        // rider.nationality =  jQuery(riderDetails).find('#input_'+gf_form_id +'_35').val();
        // rider.passportNo =  jQuery(riderDetails).find('#input_'+gf_form_id +'_160').val();
        // rider.passportImage =  'temp: passportImage';
        // rider.drivesLicense  =  jQuery(riderDetails).find('#input_'+gf_form_id +'_159').val();
        // rider.driversLicenseImage =  'temp: driversLicenseImage';
        // rider.email =  jQuery(riderDetails).find('#input_'+gf_form_id +'_38').val();
        // rider.phone =  jQuery(riderDetails).find('#input_'+gf_form_id +'_70').val();
        // rider.address =  'temp: address';
        // rider.profession =  jQuery(riderDetails).find('#input_'+gf_form_id +'_162').val();
        // rider.ridingExperience =  jQuery(riderDetails).find('#input_'+gf_form_id +'_163').val();
        // rider.shirtSize =  jQuery(riderDetails).find('#input_'+gf_form_id +'_37 :selected').text();
        // rider.foodRequirements =   'temp: foodRequirements';
        // rider.favouriteBikes =  jQuery(riderDetails).find('#input_'+gf_form_id +'_164 :selected').text();
        
        postData.push(rider); 

        console.log(postData);
});

 }

function add_rider_details(e) {
createRiderObjs();
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

                       console.log('here');

            if (jQuery('[data-rider='+riderDetailsNumber+']').attr('data-rider-type') == 'rider-with-passenger') {
                console.log('has passenger');
                // Has passenger

                jQuery('#field_'+gf_form_id+'_40').after(cloned_rider_details_wrapper.clone(true)).show();
                jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', riderDetailsNumber).attr('passenger', true);
                jQuery('[rider-details="'+riderDetailsNumber+'"]').append('<a href="#gform_'+gf_form_id+'" class="button sj_next" onclick="riderPassengerDetails('+riderDetailsNumber+')">Next Rider</a>').show();
            }
            else {
            jQuery('#field_'+gf_form_id+'_40').after(cloned_rider_details_wrapper.clone(true)).show();
             jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', riderDetailsNumber);
             jQuery('[rider-details="'+riderDetailsNumber+'"]').append('<a class="button sj_continue" onclick="nextRiderDetailsLast('+riderDetailsNumber+')">Continue</a>').show();
            }
          

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

function nextRiderDetails(e, passenger){
    console.log('CLICK add_rider_details: ' + e);
    var prevRider = e - 1; 

    if (validateRiderDetails(prevRider) != false) {

        jQuery('[rider-details='+prevRider+']').hide();
        jQuery('[rider-details ='+e+']').show();
        jQuery( "#field_"+gf_form_id+"_40 h2" ).text('Rider '+e+' - Details');

    }

}

function riderPassengerDetails(e){
    console.log('CLICK add_rider_details: ' + e);
    var prevRider = e - 1; 

jQuery('#field_'+gf_form_id+'_40').after(cloned_rider_details_wrapper.clone(true)).show();
jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', e).attr('passenger', 'true');
jQuery('.sj_rider_details_wrapper').eq(0).hide();
jQuery('[rider-details="'+e+'"]').append('<a href="#gform_'+gf_form_id+'" class="button sj_next" onclick="nextRiderDetails('+e+')">Next Rider</a>').show();

    // if (validateRiderDetails(e) != false) {

        // jQuery('[rider-details='+prevRider+']').hide();
        // jQuery('[rider-details ='+e+']').show();
        jQuery( "#field_"+gf_form_id+"_40 h2" ).text('Rider '+e+' Passenger - Details');

    // }

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
