
function step4(){

    jQuery('.tour-cart').hide();

    var riderDetailsobj = riderDetailsObj();

    jQuery('.sj_rider_insurance_wrapper ').hide();
    jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 4 - Check and Confirm your booking');

    console.log('step4');
 // console.log(JSON.stringify(riderDetailsobj));



 Object.keys(riderDetailsobj).forEach(function(key) {

    console.log(riderDetailsobj[key]);

            // jQuery('#field_'+gf_form_id+'_40')
            // .find('.summary-wrapper').remove().end()


            jQuery('#field_'+gf_form_id+'_40')
            .after(sj_rider_booking_wrapper.clone(true)
                .find('.summary-rider-name').text(riderDetailsobj[key]['title']+ ' ' +riderDetailsobj[key]['firstNames']).end()
                .find('.summary-rider-address').text('Address Placeholder').end()
                .find('.summary-rider-birthdate').text(riderDetailsobj[key]['dateOfBirth']).end()
                .find('.summary-rider-nationality').text(riderDetailsobj[key]['nationality']).end()
                .find('.summary-rider-phone').text(riderDetailsobj[key]['phone']).end()
                .find('.summary-rider-email').text(riderDetailsobj[key]['email']).end()
                .find('.summary-rider-bikechoice').text('First Choice: '+ riderDetailsobj[key]['bikeFirst'] + ' Second Choice' + riderDetailsobj[key]['bikeSecond']).end()
                .find('.summary-rider-bonus').text('bonus - Needed?').end()
                .find('.summary-rider-measurements').text(riderDetailsobj[key]['shirtSize']).end()
                .find('.summary-rider-roomtype').text(riderDetailsobj[key]['roomOccupancy']).end()
                .find('.summary-rider-insurance').text('Insurance Placeholder').end())
            .show();


        // console.log(riderDetailsobj[key]);

    });

 var reverseRiders = jQuery(".summary");
 jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get().reverse());


 jQuery('#field_'+gf_form_id+'_40')
 .after(sj_summary_booking_wrapper.clone(true)
   .find('.summary-tour').text(riderDetailsobj[0]['riderTour']).end()
   .find('.summary-tour-date').text(riderDetailsobj[0]['riderTourDate']).end()
   .find('.summary-participants').text('Participants Placeholder').end()
   .find('.summary-date-of-booking').text("Today's Date Placeholder").end());

 jQuery('#field_'+gf_form_id+'_40').hide();
}
