



function step3(){

    var riderDetailsobj = riderDetailsObj();
    jQuery('[rider-details]').hide();
    jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 3 - Insurance Details');

    Object.keys(riderDetailsobj).forEach(function(key) {

        console.log(riderDetailsobj[key]);
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

        uniqueRadioId();
        


    });

    var reverseRiders = jQuery(".sj_rider_insurance_wrapper");
    jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get().reverse());
    // console.log('step3');
    jQuery('#field_'+gf_form_id+'_40').hide();
}


function uniqueRadioId(){
    jQuery("#field_"+gf_form_id+"_173").each(function(){
        var randomID = getRandomRadioId ();

        jQuery(this).find('input').attr('name', 'input_'+gf_form_id+'_' + randomID);
        jQuery(this).find('ul').attr('id', 'input_' + randomID);

        jQuery(this).find('input').eq(0).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_0').on('click', updateCart);
        jQuery(this).find('input').eq(1).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_1').on('click', updateCart);
        jQuery(this).find('label').eq(1).attr('id', 'label_'+gf_form_id+'_' + randomID + '_0');
        jQuery(this).find('label').eq(2).attr('id', 'label_'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(1).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_0');
        jQuery(this).find('label').eq(2).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_1');


        
    });

    jQuery(".rider-solo-insurance").each(function(){
        var randomID = getRandomRadioId ();

        jQuery(this).find('input').attr('name', 'input_'+gf_form_id+'_' + randomID);
        jQuery(this).find('ul').attr('id', 'input_' + randomID);

        jQuery(this).find('input').eq(0).attr('id', 'choice_1'+gf_form_id+'_' + randomID + '_0').on('click', updateSoloCart);
        jQuery(this).find('input').eq(1).attr('id', 'choice_1'+gf_form_id+'_' + randomID + '_1').on('click', updateSoloCart);
        jQuery(this).find('label').eq(1).attr('id', 'label_1'+gf_form_id+'_' + randomID + '_0');
        jQuery(this).find('label').eq(2).attr('id', 'label_1'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(1).attr('for', 'choice_1'+gf_form_id+'_' + randomID + '_0');
        jQuery(this).find('label').eq(2).attr('for', 'choice_1'+gf_form_id+'_' + randomID + '_1');


        
    });

    jQuery(".rider-passenger-insurance").each(function(){
        var randomID = getRandomRadioId ();

        jQuery(this).find('input').attr('name', 'input_'+gf_form_id+'_' + randomID);
        jQuery(this).find('ul').attr('id', 'input_' + randomID);

        jQuery(this).find('input').eq(0).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_0').on('click', updatePassengerCart);
        jQuery(this).find('input').eq(1).attr('id', 'choice_'+gf_form_id+'_' + randomID + '_1').on('click', updatePassengerCart);
        jQuery(this).find('label').eq(1).attr('id', 'label_'+gf_form_id+'_' + randomID + '_0');
        jQuery(this).find('label').eq(2).attr('id', 'label_'+gf_form_id+'_' + randomID + '_1');
        jQuery(this).find('label').eq(1).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_0');
        jQuery(this).find('label').eq(2).attr('for', 'choice_'+gf_form_id+'_' + randomID + '_1');


        
    });


}

function updateCart(){

    var riderNumber = jQuery(this).closest('.sj_rider_insurance_wrapper').attr('rider-insurance-number');
    var priceUpdate = jQuery(this).val();
    var radioText = jQuery(this).next().text();

    jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-first-id .insurance-option').text(radioText);
}

function updateSoloCart(){

    var riderNumber = jQuery(this).closest('.sj_rider_insurance_wrapper').attr('rider-insurance-number');
    var priceUpdate = jQuery(this).val();
    var radioText = jQuery(this).next().text();

    jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-second-id .insurance-option').text(radioText);
}

function updatePassengerCart(){

    var riderNumber = jQuery(this).closest('.sj_rider_insurance_wrapper').attr('rider-insurance-number');
    var priceUpdate = jQuery(this).val();
    var radioText = jQuery(this).next().text();

    jQuery('[data-rider-cart= '+ riderNumber +'] #insurance-option-second-id .insurance-option').text(radioText);
}



function getRandomRadioId (){

    return Math.floor(Math.random() * 1000000) + 300;
}