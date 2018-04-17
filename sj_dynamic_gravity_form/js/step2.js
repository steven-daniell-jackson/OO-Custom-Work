

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
    // console.log(key, riderObjs[key]);
    // console.log(riderObjs[key]['riderNumber']);

    // console.log('riderObjs[key] ' + riderObjs[key]['riderNumber']);

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
        .attr('passenger', 'true')
        .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Passenger Details</h2>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
        .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>'))
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




function prevRiderDetails(){

jQuery('[rider-details]:visible').hide().prev().show();

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
