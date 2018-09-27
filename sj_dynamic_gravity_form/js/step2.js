

function add_rider_details(e) {
    var riderType = '';
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
    riderType = 'solo';

    if (riderObjs[key]['riderNumber'] > 0) { 

        jQuery('#field_'+gf_form_id+'_40').
        after(cloned_rider_details_wrapper.clone(true)
            .attr('rider-details', riderObjs[key]['riderNumber'])
            .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Details</h2>')
            .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
            .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails('+riderObjs[key]['riderNumber']+',false)">Next Rider</a>'))
        .show();
    // riderCount += 1;

    if (riderObjs[key]['dataRiderType'] == "rider-with-passenger") {
        console.log('with passenger');

        riderType = 'passenger';
        jQuery('#field_'+gf_form_id+'_40')
        .after(cloned_rider_details_wrapper.clone(true)
            .attr('rider-details', riderObjs[key]['riderNumber'])
            .attr('passenger', 'true')
            .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Passenger Details</h2>')
            .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
            .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails('+riderObjs[key]['riderNumber']+',true)">Next Rider</a>'))
        .show();
    }            

} 

else {

    // Back button for First Step
    jQuery('#field_'+gf_form_id+'_40').
    after(cloned_rider_details_wrapper.clone(true)
        .attr('rider-details', riderObjs[key]['riderNumber'])
        .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Details</h2>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="backToStart()">Back</a>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails('+riderObjs[key]['riderNumber']+')">Next Rider</a>'))
    .show();
}

riderCount++;

});


var reverseRiders = jQuery(".sj_rider_details_wrapper");
jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get().reverse());

jQuery('#field_'+gf_form_id+'_73').hide();
jQuery('#field_'+gf_form_id+'_150').hide();

jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 2 - Enter participant information');
jQuery('#field_'+gf_form_id+'_54 .gsection_description').text('');

jQuery('[rider-details]').hide();
jQuery('[rider-details]').first().show();

jQuery('[rider-details="1"] .sj_back').attr('onclick', 'backToStart()');
jQuery('.sj_next').last().text('NEXT STEP').attr('onclick', 'lastRiderValidation('+riderCount+', "last")');
jQuery('#field_'+gf_form_id+'_40').hide();
// jQuery('.gform_footer').append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>').show();
// jQuery('.gform_footer').append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>').show();


}


function lastRiderValidation(riderNumber, last){
    console.log('lastRiderValidation' + last);
    if (validateRiderDetails(riderNumber, last)){
        step4();
    }

}



function nextRiderDetails(riderNumber, passenger){

    if (validateRiderDetails(riderNumber, passenger)){
        jQuery('[rider-details]:visible').hide().next().show();
    }



}


function prevRiderDetails(){

    jQuery('[rider-details]:visible').hide().prev().show();

}


function backToStart(){
    jQuery('[rider-details]').hide();

    jQuery('.sj_rider_wrapper ').show();
    jQuery('.sj_add_rider_wrapper').show();
    jQuery('#field_'+gf_form_id+'_69').show();
    jQuery('#field_'+gf_form_id+'_54').show();
    jQuery('#field_'+gf_form_id+'_73').show();
    jQuery('#field_'+gf_form_id+'_150').show();
    jQuery('#field_'+gf_form_id+'_150').show();
// jQuery( ".gform_footer" ).show();


jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('STEP 1 - CHOOSE TOUR AND DATE');
jQuery('#field_'+gf_form_id+'_54 .gsection_description').html('<br>Karoo-Biking tour booking can be completed in 5 easy steps. <br><br>If you face any troubles sending in your tour booking or if you need any additional information in order to complete the booking, please do not hesitate to let us know at jurgen@karoo-biking.de.');


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



function validateRiderDetails(e, passenger){


    console.log(passenger);
    var data = '';

    if (passenger) {
        data = '[rider-details="'+e+'"][passenger="true"]';
   }
   else {
        data = '[rider-details="'+e+'"]';
   }

   console.log('last running');

if (passenger == 'last') {

   if (jQuery('[rider-details]').last().attr('passenger') == 'true') {
       data = '[rider-details="'+e+'"][passenger="true"]';
   } else {
    data = '[rider-details="'+e+'"]';

}

}

console.log("validateRiderDetails running");
console.log("validateRiderDetails " + e);
console.log(data);

valid = true;

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


    // if (jQuery(data + " #input_"+gf_form_id+"_5").val() == '') {
    //     jQuery(data + " #input_"+gf_form_id+"_5" ).css('border-color', 'red');
    //     valid = false;

    // } else {
    //     jQuery(data).find( " #input_"+gf_form_id+"_5" ).css('border-color', '#424242');

    // }


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

