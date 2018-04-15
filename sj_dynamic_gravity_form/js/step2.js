    function createRiderObjs(){


        var tour = jQuery('#input_'+gf_form_id +'_73 :selected').text();
        var tourDate = jQuery('#input_'+gf_form_id +'_150 :selected').text();
        var riderObjs = [];

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
        
        riderObjs.push(rider); 

        // console.log(postData);
    });

        return riderObjs;

    }

    function add_rider_details(e) {

        var riderObjs = createRiderObjs();
        jQuery('.sj_rider_wrapper ').hide();
        jQuery('.sj_add_rider_wrapper ').hide();
        jQuery('#field_'+gf_form_id+'_69 ').hide();
        jQuery( "#field_"+gf_form_id+"_40" ).show();
        jQuery('[rider-details]').remove();
        jQuery('.sj_next').remove();


// console.log(riderObjs);

var totalRiders = riderObjs.length;   
var riderDetailsNumber = riderObjs.length;
var riderCount = 0;


Object.keys(riderObjs).forEach(function(key) {
    console.log(key, riderObjs[key]);
    // console.log(riderObjs[key]['riderNumber']);

    console.log('riderObjs[key] ' + riderObjs[key]['riderNumber']);

    jQuery('#field_'+gf_form_id+'_40').
    after(cloned_rider_details_wrapper.clone(true)
        .attr('rider-details', riderObjs[key]['riderNumber'])
        .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Details</h2>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>'))
        .show();
    riderCount += 1;

    if (riderObjs[key]['dataRiderType'] == "rider-with-passenger") {
        jQuery('#field_'+gf_form_id+'_40')
        .after(cloned_rider_details_wrapper.clone(true)
        .attr('rider-details', riderObjs[key]['riderNumber'])
        .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Passenger Details</h2>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>'))
        .attr('passenger', 'true')
        .show();
    }            


});


var reverseRiders = jQuery(".sj_rider_details_wrapper");
jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get().reverse());

jQuery('#field_'+gf_form_id+'_73').hide();
jQuery('#field_'+gf_form_id+'_150').hide();

jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 2 - Rider Details');
jQuery('#field_'+gf_form_id+'_54 .gsection_description').text('');

jQuery('[rider-details]').hide();
jQuery('[rider-details]').first().show();
jQuery('.sj_next').last().text('NEXT STEP').attr('onclick', 'step3();');
jQuery('#field_'+gf_form_id+'_40').hide();
// jQuery('.gform_footer').append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>').show();
// jQuery('.gform_footer').append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>').show();


}


function nextRiderDetails(){

jQuery('[rider-details]:visible').hide().next().show();

}

function step3(){
        jQuery('[rider-details]').hide();
        jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 3 - Insurance Details');
        jQuery('#field_'+gf_form_id+'_40')
        .after(sj_rider_insurance_wrapper.clone(true))
        .show(); 
        // .attr('rider-details', riderObjs[key]['riderNumber'])
        // .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Passenger Details</h2>')
        // .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
        // .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>'))
        // .attr('passenger', 'true')
                

    console.log('step3');
    jQuery('#field_'+gf_form_id+'_40').hide();
}


function prevRiderDetails(){

jQuery('[rider-details]:visible').hide().prev().show();

}




// function nextRiderDetailsLast(e) {

//     if (validateRiderDetails(e) != false) {

//         jQuery('.sj_continue').remove();
//         jQuery('#gform_wrapper_'+gf_form_id+' .gform_footer #gform_submit_button_'+gf_form_id+'').show();
//     }
    
// }



// function nextRiderDetails(e, passenger){
//     console.log('CLICK add_rider_details: ' + e);
//     var prevRider = e - 1; 

//     if (validateRiderDetails(prevRider) != false) {

//         jQuery('[rider-details='+prevRider+']').hide();
//         jQuery('[rider-details ='+e+']').show();
//         jQuery( "#field_"+gf_form_id+"_40 h2" ).text('Rider '+e+' - Details');

//     }

// }

// function riderPassengerDetails(e){
//     console.log('CLICK add_rider_details: ' + e);
//     var prevRider = e - 1; 

//     jQuery('#field_'+gf_form_id+'_40').after(cloned_rider_details_wrapper.clone(true)).show();
//     jQuery('.sj_rider_details_wrapper').eq(1).attr('rider-details', e).attr('passenger', 'true');
//     jQuery('.sj_rider_details_wrapper').eq(0).hide();
//     jQuery('[rider-details="'+e+'"]').append('<a href="#gform_'+gf_form_id+'" class="button sj_next" onclick="nextRiderDetails('+e+')">Next Rider</a>').show();

//     // if (validateRiderDetails(e) != false) {

//         // jQuery('[rider-details='+prevRider+']').hide();
//         // jQuery('[rider-details ='+e+']').show();
//         jQuery( "#field_"+gf_form_id+"_40 h2" ).text('Rider '+e+' Passenger - Details');

//     // }

// }

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
