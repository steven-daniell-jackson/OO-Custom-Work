
function step4(){
    jQuery('[rider-details]').hide();
    jQuery('.tour-cart').hide();

    var riderDetailsobj = riderDetailsObj();

    jQuery('.sj_rider_insurance_wrapper ').hide();
    jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('Step 4 - Check and Confirm your booking');

    console.log('step4');
 // console.log(JSON.stringify(riderDetailsobj));
 var totalParticipants = 0;


 Object.keys(riderDetailsobj).forEach(function(key) {

    // console.log(riderDetailsobj[key]);

            // jQuery('#field_'+gf_form_id+'_40')
            // .find('.summary-wrapper').remove().end()

            var fullAddress = riderDetailsobj[key]['addressPhysical'] + ', ' +
            riderDetailsobj[key]['addressCity'] + ', ' +
            riderDetailsobj[key]['addressProvince'] + ', ' +
            riderDetailsobj[key]['addressZipcode'] + ', ' +
            riderDetailsobj[key]['addressCountry'];

            var summaryRiderTitle = riderDetailsobj[key]['title']+ ' ' +
            riderDetailsobj[key]['firstNames']+ ' ' +
            riderDetailsobj[key]['familyName'];

            if (riderDetailsobj[key]['bikeSecond'] == 'Select Bike') {
               bikeSecondText = 'Not Selected';

           } else {

            bikeSecondText = riderDetailsobj[key]['bikeSecond'];
        }

        jQuery('#field_'+gf_form_id+'_40')
        .after(sj_rider_booking_wrapper.clone(true)
            .addClass('sj-summary-booking')
            .find('.summary-rider-title').text(summaryRiderTitle).end()
            .find('.summary-rider-name').text(riderDetailsobj[key]['title']+ ' ' +riderDetailsobj[key]['firstNames']).end()
            .find('.summary-rider-address').text(fullAddress).end()
            .find('.summary-rider-birthdate').text(riderDetailsobj[key]['dateOfBirth']).end()
            .find('.summary-rider-nationality').text(riderDetailsobj[key]['nationality']).end()
            .find('.summary-rider-phone').text(riderDetailsobj[key]['phone']).end()
            .find('.summary-rider-email').text(riderDetailsobj[key]['email']).end()
            .find('.summary-bike-choice-first').text(riderDetailsobj[key]['bikeFirst']).end()
            .find('.summary-bike-choice-second').text(bikeSecondText).end()
            .find('.summary-rider-measurements').text(riderDetailsobj[key]['shirtSize']).end()
            .find('.summary-rider-roomtype').text(riderDetailsobj[key]['roomOccupancy']).end()
            .find('.summary-rider-miles').text(riderDetailsobj[key]['ridingExperience']).end()
            .find('.summary-rider-profession').text(riderDetailsobj[key]['profession']).end()
            .find('.summary-rider-passport-no').text(riderDetailsobj[key]['passportNo']).end()
            .find('.summary-rider-license-no').text(riderDetailsobj[key]['drivesLicense']).end()
            .find('.summary-rider-food-req').text(riderDetailsobj[key]['foodRequirements']).end()
            .show());


        // console.log(riderDetailsobj[key]);

        totalParticipants += 1;

    });

 var reverseRiders = jQuery(".sj-summary-booking");
 jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get().reverse());
 // jQuery('#field_'+gf_form_id+'_40').after(reverseRiders.get());

 jQuery('#field_'+gf_form_id+'_40')
 .after(sj_summary_booking_wrapper.clone(true)
   .find('.summary-tour').text(riderDetailsobj[0]['riderTour']).end()
   .find('.summary-tour-date').text(riderDetailsobj[0]['riderTourDate']).end()
   .find('.summary-email').text(riderDetailsobj[0]['email']).end()
   .find('.summary-participants').text(totalParticipants).end()
   .find('.summary-date-of-booking').text(currentDate()).end());

 jQuery('#field_'+gf_form_id+'_40').hide();

 jQuery('#gform_submit_button_'+gf_form_id).show();
 jQuery('.gform_footer').prepend('<a href="#gform_'+gf_form_id+'" class="button sj_back sj_from_summary" onclick="backToRiderDetails()">Back</a>')

}

function backToRiderDetails(){

    jQuery('.sj-summary-booking').hide();
    jQuery('#field_'+gf_form_id+'_185').hide();
    jQuery('#field_'+gf_form_id+'_188').hide();
    jQuery('.gform_footer').show();
    jQuery('#gform_submit_button_'+gf_form_id+'').hide();
    jQuery('.sj_from_summary').remove();
    jQuery('.tour-cart').show();
    jQuery('[rider-details]').last().show();



    jQuery('#field_'+gf_form_id+'_54 .gsection_title').text('STEP 2 - ENTER PARTICIPANT INFORMATION');
    jQuery('#field_'+gf_form_id+'_54 .gsection_description').html('');

}


function currentDate() {
    return new Date(jQuery.now());
}