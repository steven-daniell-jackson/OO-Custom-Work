



function step3(){

    var riderDetailsobj = riderDetailsObj();
    jQuery('[rider-details]').hide();
    jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 3 - Insurance Details');

    Object.keys(riderDetailsobj).forEach(function(key) {

        // console.log(riderDetailsobj[key]);
        // console.log('riderObjs[key] ' + riderDetailsobj[key]['passenger']);
        getRandomRadioId ();
        if (riderDetailsobj[key]['passenger'] == 'true') {
            jQuery('#field_'+gf_form_id+'_40')
            .after(sj_rider_insurance_wrapper.clone(true)
                .attr('rider-insurance-number', riderDetailsobj[key]['riderNumber'])
                .prepend('<h3 class="rider-insurance-heading">Passenger of rider ' + riderDetailsobj[key]['riderNumber'] + ": " + riderDetailsobj[key]['title'] + " " + riderDetailsobj[key]['firstNames'] + '<h3>')
                .find('.rider-solo-insurance').remove().end()
                .find('.rider-bike-insurance').remove().end())
            .show();

            // jQuery('[rider-insurance-number=' + riderDetailsobj[key]['riderNumber'] + ']').eq(1).find('.rider-solo-insurance').remove();

        } else {
            jQuery('#field_'+gf_form_id+'_40')
            .after(sj_rider_insurance_wrapper.clone(true)
                .attr('rider-insurance-number', riderDetailsobj[key]['riderNumber'])
                .prepend('<h3 class="rider-insurance-heading">Rider ' + riderDetailsobj[key]['riderNumber'] + ": " + riderDetailsobj[key]['title'] + " " + riderDetailsobj[key]['firstNames']  + '<h3>'))
            .find('.rider-passenger-insurance').remove().end()
            .show(); 

            jQuery('[rider-insurance-number=' + riderDetailsobj[key]['riderNumber'] + '] .rider-passenger-insurance').remove();
        }

        uniqueCheckboxID();
        


    });

    var reverseRiders = jQuery(".sj_rider_insurance_wrapper");
    jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get().reverse());
    // console.log('step3');
    jQuery('.sj_rider_insurance_wrapper').last()
    .append('<a href="#gform_'+gf_form_id+'" class="button sj_back" onclick="insurancePrevStep()">Back</a>')
    .append('<a href="#gform_'+gf_form_id+'" class="button sj_next" style="float:right;" onclick="step4()">Next Step</a>').show();
    jQuery('#field_'+gf_form_id+'_40').hide();
}

function insurancePrevStep(){
jQuery('.sj_rider_insurance_wrapper').remove();
jQuery('[rider-details="1"]').show();
}

function uniqueCheckboxID(){
    jQuery(".rider-bike-insurance").each(function(){
        var randomID = getRandomRadioId ();

        jQuery(this).find('input').attr('name', 'input_'+gf_form_id+'_' + randomID);
        jQuery(this).find('ul').attr('id', 'input_' + randomID);

        jQuery(this).find('input').eq(0).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_1').on('click', updateCart);
        jQuery(this).find('input').eq(1).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_2').on('click', updateCart);
        jQuery(this).find('label').eq(1).attr('id', 'label_'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(2).attr('id', 'label_'+gf_form_id+'_' + randomID + '_2');
        jQuery(this).find('label').eq(1).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(2).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_2');


        
    });

    jQuery(".rider-solo-insurance").each(function(){
        var randomID = getRandomRadioId ();

        jQuery(this).find('input').attr('name', 'input_'+gf_form_id+'_' + randomID);
        jQuery(this).find('ul').attr('id', 'input_' + randomID);

        jQuery(this).find('input').eq(0).attr('id', 'choice_1'+gf_form_id+'_' + randomID + '_1').on('click', updateSoloCart);
        jQuery(this).find('input').eq(1).attr('id', 'choice_1'+gf_form_id+'_' + randomID + '_2').on('click', updateSoloCart);
        jQuery(this).find('label').eq(1).attr('id', 'label_1'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(2).attr('id', 'label_1'+gf_form_id+'_' + randomID + '_2');
        jQuery(this).find('label').eq(1).attr('for', 'choice_1'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(2).attr('for', 'choice_1'+gf_form_id+'_' + randomID + '_2');


        
    });

    jQuery(".rider-passenger-insurance").each(function(){
        var randomID = getRandomRadioId ();

        jQuery(this).find('input').attr('name', 'input_'+gf_form_id+'_' + randomID);
        jQuery(this).find('ul').attr('id', 'input_' + randomID);

        jQuery(this).find('input').eq(0).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_1').on('click', updatePassengerCart);
        jQuery(this).find('input').eq(1).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_2').on('click', updatePassengerCart);
        jQuery(this).find('label').eq(0).attr('id', 'label_'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(1).attr('id', 'label_'+gf_form_id+'_' + randomID + '_2');
        jQuery(this).find('label').eq(0).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(1).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_2');


        
    });


}

function updateCart(){

    var riderNumber = jQuery(this).closest('.sj_rider_insurance_wrapper').attr('rider-insurance-number');
    var priceUpdate = jQuery(this).val();
    var checkboxText = jQuery(this).next().text();
    var checkboxLength = jQuery(this).closest('.gfield_checkbox').find(':checked').length;


    // if (jQuery(this).is(':checked') == 'false') {
    //     jQuery(this).closest('.gfield_checkbox').find('input').prop('checked',false);
    //     jQuery(this).prop('checked',false);
    //     jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-first-id .insurance-option').text(checkboxText);
    // } 

    // if (checkboxLength <= 0) {
    //     // jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-second-id .insurance-option').text('');
    //     checkboxText = '';
    //     console.log('here');
    // }
    //  else if (checkboxLength >= 2) {
    //     jQuery(this).closest('.gfield_checkbox').find(':checked').prop('checked',false);
    //     jQuery(this).prop('checked',true);
        
    // }
    
  
jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-first-id .insurance-option').text(checkboxText);

}

function updateSoloCart(){

    var riderNumber = jQuery(this).closest('.sj_rider_insurance_wrapper').attr('rider-insurance-number');
    var priceUpdate = jQuery(this).val();
    var checkboxText = jQuery(this).next().text();
    var checkboxLength = jQuery(this).closest('.gfield_checkbox').find(':checked').length;

    if (jQuery(this).is(':checked') == 'false') {
        jQuery(this).closest('.gfield_checkbox').find('input').prop('checked',false);
        jQuery(this).prop('checked',false);

    } 

    if (checkboxLength <= 0) {
        // jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-second-id .insurance-option').text('');
        checkboxText = '';
        console.log('here');
    }
     else if (checkboxLength >= 2) {
        jQuery(this).closest('.gfield_checkbox').find(':checked').prop('checked',false);
        jQuery(this).prop('checked',true);
        
    }

jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-second-id .insurance-option').text(checkboxText);

    
}

function updatePassengerCart(){

    var riderNumber = jQuery(this).closest('.sj_rider_insurance_wrapper').attr('rider-insurance-number');
    var priceUpdate = jQuery(this).val();
    var checkboxText = jQuery(this).next().text();
    var checkboxLength = jQuery(this).closest('.gfield_checkbox').find(':checked').length;

    if (jQuery(this).is(':checked') == 'false') {
        jQuery(this).closest('.gfield_checkbox').find('input').prop('checked',false);
        jQuery(this).prop('checked',false);
    } 

   
     if (checkboxLength <= 0) {
        // jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-second-id .insurance-option').text('');
        checkboxText = '';
        console.log('here');
    }
     else if (checkboxLength >= 2) {
        jQuery(this).closest('.gfield_checkbox').find(':checked').prop('checked',false);
        jQuery(this).prop('checked',true);
        
    }


    jQuery('[data-rider-cart= '+ riderNumber +']').eq(1).find('#insurance-option-second-id .insurance-option').text(checkboxText);
}



function getRandomRadioId (){

    return Math.floor(Math.random() * 1000000) + 300;
}