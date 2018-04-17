
function step4(){
    jQuery('.sj_rider_insurance_wrapper ').hide();
    jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 4 - Check and Confirm your booking');
    jQuery('#field_'+gf_form_id+'_40')
        .append('Placeholder')
        .show();
    console.log('step4');
        // jQuery('[rider-details]').hide();
        // jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 3 - Insurance Details');
        // jQuery('#field_'+gf_form_id+'_40')
        // .after(sj_rider_insurance_wrapper.clone(true)
        // .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>'))
        // .show(); 
        // .attr('rider-details', riderObjs[key]['riderNumber'])
        // .prepend('<h2 class="sj-rider-details-heading">Rider '+ riderObjs[key]['riderNumber'] + ' Passenger Details</h2>')
        // .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="prevRiderDetails()">Back</a>')
        // .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="nextRiderDetails()">Next Rider</a>'))
        // .attr('passenger', 'true')
                
    jQuery('#field_'+gf_form_id+'_40').hide();
}
