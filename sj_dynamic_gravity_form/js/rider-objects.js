function riderDetailsObj(){
    var tour = jQuery('#input_'+gf_form_id +'_73 :selected').text();
    var tourDate = jQuery('#input_'+gf_form_id +'_150 :selected').text();
    var foodRequirementString = '';
    var postData = [];

    var tour = jQuery('#input_'+gf_form_id +'_73 :selected').text()
    jQuery('#input_'+gf_form_id +'_73 :selected')
    jQuery('.sj_rider_details_wrapper').each(function(){ 

        var foodRequirements = jQuery( '#input_'+gf_form_id +'_165' ).find( 'li' ).has( 'input[type=checkbox]:checked' );

       foodRequirements.each(function(){ 
        foodRequirementString += jQuery(this).text().trim() + ', ';
       });


        var riderID = jQuery(this).attr('rider-details');
        var sharingCheckbox = jQuery('[data-rider="'+riderID+'"]').find('#choice_'+gf_form_id +'_79_1').is(':checked');
        var roommateName = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_91').val();
        var riderRemarks = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_152').val();   
        var hasPassenger = jQuery(this).attr('passenger');
        var riderDetails = '';
        var riderTitle = '';

        console.log(hasPassenger);
if (hasPassenger) {
    riderDetails = jQuery('[rider-details="'+riderID+'"][passenger="true"]');
      
} else {
     riderDetails = jQuery('[rider-details="'+riderID+'"]:first');
}

        var dateOfBirth = jQuery('#input_'+gf_form_id +'_5_2').val() + '/' + jQuery('#input_'+gf_form_id +'_5_1').val() + '/' + jQuery('#input_'+gf_form_id +'_5_3').val() ;

        var rider = new Object();

        rider.riderTour = tour;
        rider.riderTourDate = tourDate;
        rider.riderNumber = riderID;
        rider.dataRiderType = jQuery('[data-rider="'+riderID+'"]').attr('data-rider-type');
        rider.roomOccupancy = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_78 :selected').text();
        rider.bikeFirst = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_77 :selected').text();
        rider.bikeFirstPrice = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_77 :selected').val();
        rider.bikeSecond = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_151 :selected').text();
        // rider.bikeSecondPrice = jQuery('[data-rider="'+riderID+'"]').find('#input_'+gf_form_id +'_151 :selected').val();

        (riderRemarks != "") ? rider.riderRemarks = riderRemarks : '';
        (roommateName != "") ? rider.roommateName = roommateName : '';
        (sharingCheckbox) ? rider.sharing = jQuery('[data-rider="'+riderID+'"]').find('#label_'+gf_form_id +'_79_1').text() : '';

        (hasPassenger) ? rider.Details = 'Rider ' + riderID + ' Passenger - Details' : rider.Details = 'Rider ' + riderID + '- Details';
        (hasPassenger) ? rider.passenger = hasPassenger : '';
        (hasPassenger) ? riderTitle =  jQuery(riderDetails).find('#input_'+gf_form_id +'_3 :selected').text() : riderTitle =  jQuery(riderDetails).find('#input_'+gf_form_id +'_3 :selected').text();

rider.title = riderTitle;

        // rider.title =  jQuery(riderDetails).find('#input_'+gf_form_id +'_3 :selected').text();
        rider.firstNames =  jQuery(riderDetails).find('#input_'+gf_form_id +'_1').val();
        rider.familyName =  jQuery(riderDetails).find('#input_'+gf_form_id +'_169').val();
        // rider.familyNameTitle =  jQuery(riderDetails).find('#input_'+gf_form_id +'_159').val();
        rider.dateOfBirth =  dateOfBirth;
        rider.nationality =  jQuery(riderDetails).find('#input_'+gf_form_id +'_35').val();
        rider.passportNo =  jQuery(riderDetails).find('#input_'+gf_form_id +'_160').val();
        // rider.passportImage =  'temp: passportImage';
        rider.drivesLicense  =  jQuery(riderDetails).find('#input_'+gf_form_id +'_161').val();
        // rider.driversLicenseImage =  'temp: driversLicenseImage';
        rider.email =  jQuery(riderDetails).find('#input_'+gf_form_id +'_38').val();
        rider.phone =  jQuery(riderDetails).find('#input_'+gf_form_id +'_70').val();

        rider.addressPhysical =  jQuery(riderDetails).find('#input_'+gf_form_id +'_18_1').val();
        rider.addressCity =  jQuery(riderDetails).find('#input_'+gf_form_id +'_18_3').val();
        rider.addressProvince =  jQuery(riderDetails).find('#input_'+gf_form_id +'_18_4').val();
        rider.addressZipcode =  jQuery(riderDetails).find('#input_'+gf_form_id +'_18_5').val();
        rider.addressCountry =  jQuery(riderDetails).find('#input_'+gf_form_id +'_18_6').val();


        rider.profession =  jQuery(riderDetails).find('#input_'+gf_form_id +'_162').val();
        rider.ridingExperience =  jQuery(riderDetails).find('#input_'+gf_form_id +'_163').val();
        rider.shirtSize =  jQuery(riderDetails).find('#input_'+gf_form_id +'_37 :selected').text();
        rider.foodRequirements =   foodRequirementString;
        // rider.favouriteBikes =  jQuery(riderDetails).find('#input_'+gf_form_id +'_164 :selected').text();

        
        postData.push(rider); 
    });

   return postData;
}


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
        
        riderObjs.push(rider); 

        // console.log(postData);
    });

        return riderObjs;

    }



    