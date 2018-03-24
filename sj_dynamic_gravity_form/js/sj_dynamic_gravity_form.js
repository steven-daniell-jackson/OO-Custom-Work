var gf_form_id = 15;

jQuery(document).ready(function() {
    cloned_add_rider_wrapper = jQuery( ".sj_add_rider_wrapper" ).clone();

    jQuery( "#input_"+gf_form_id+"_73" ).change(function() {

        jQuery("#input_"+gf_form_id+"_150").empty();
        jQuery('#input_'+gf_form_id+'_77').empty().append(jQuery('<option>', { 
            value: "Select Bike",
            text : "Select Bike"
        }));

        jQuery('#input_'+gf_form_id+'_151').empty().append(jQuery('<option>', { 
            value: "Select Bike",
            text : "Select Bike"
        }));


        var dropdown_value = parseInt(jQuery( "select" ).val(), 0);
        var response = jQuery.getJSON( '/karoo/wp-content/plugins/sj_dynamic_gravity_form/dynamic_acf_data/acf_data.json', function(response) {

            jQuery.map(response, function(obj) {

                if(obj.id === dropdown_value) {

                    jQuery.each( obj.tourDates.date, function( i, tour_dates ) {
                        if (obj.tourDates.date[0] == "" && !obj.tourDates.date[1] == "") {


                            if (!obj.tourDates.date == "" && !tour_dates.date == "") {

                                jQuery("#gform_fields_"+gf_form_id+" li").show();

                                jQuery('#input_'+gf_form_id+'_150').append(jQuery('<option>', { 
                                    value: tour_dates.date,
                                    text : tour_dates.date 
                                }));
                            } 

                        } else {

                            jQuery("#gform_fields_"+gf_form_id+" li").hide();
                            jQuery(".gform_page_footer").hide();
                            jQuery("#field_"+gf_form_id+"_54").show();
                            jQuery("#field_"+gf_form_id+"_73").show();
                            jQuery("#field_"+gf_form_id+"_150").show();

                            jQuery('#input_'+gf_form_id+'_150').append(jQuery('<option>', { 
                                value: "No tour avaiable",
                                text : "No tour avaiable"
                            }));
                        }
                    });


                    jQuery.each( obj.tourBikes.bikes, function( i, tour_bikes ) {

                        if (!obj.tourBikes.bikes[i].bikeName == "") {


                            jQuery('#input_'+gf_form_id+'_77').append(jQuery('<option>', { 
                                value: tour_bikes.bikePrice,
                                text : tour_bikes.bikeName
                            }));

                            jQuery('#input_'+gf_form_id+'_151').append(jQuery('<option>', { 
                                value: tour_bikes.bikePrice,
                                text : tour_bikes.bikeName
                            }));
                        } 

                    });


                    jQuery(".price-name").text(obj.price);
                    jQuery(".tour-name").text(obj.tour);
                    jQuery(".date-name").text(obj.tourDates.date[1].date);



                    return obj;
                }        
            });
  // console.log( "success" );
})
        .done(function() {

        })
        .fail(function() {
    // console.log( "error" );
})
        .always(function() {
    // console.log( "complete" );
});

// Perform other work here

});


    jQuery( "#label_"+gf_form_id+"_62_0" ).click(function() {

    });



    jQuery( "#input_"+gf_form_id+"_150" ).change(function() {

        var dateChange = jQuery( "#input_"+gf_form_id+"_150" ).val();
        // console.log(dateChange);
        jQuery(".date-name").text(dateChange);

    });

    jQuery( "#input_"+gf_form_id+"_77" ).change(function() {

        var updatePrice = "";
        var bikePrice = parseInt(jQuery( "#input_"+gf_form_id+"_77" ).val());
        var priceChange = jQuery( ".price-name" ).text();
        priceChange = Number(priceChange.replace(/[^0-9\.-]+/g,""));

        priceChange = parseInt(priceChange);

        updatePrice = priceChange + bikePrice;

        jQuery(".price-name").text( "R " + updatePrice);

    });


   // });

    jQuery( "div.sj_rider_wrapper[data-rider='1']" ).change(function() {

        var roomOccupancy = jQuery( "#input_"+gf_form_id+"_78 option:selected" ).text();
        var bikeSelect = jQuery( "#input_"+gf_form_id+"_77 option:selected" ).text();

        sj_add_rider_wrapper_count = get_wrapper_count("sj_rider_wrapper");

if (roomOccupancy == "Please select" || bikeSelect == "Select Bike") {
    jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_152' ).next().remove();
}

        if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {
            jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_152' ).after('<input type="button" id="sj_add_rider" class="gform_next_button button" value="Add Rider" tabindex="12" onclick="clone_rider_options('+sj_add_rider_wrapper_count+')"> ');

        }
    });


    jQuery( "#field_"+gf_form_id+"_62" ).click(function() {
        jQuery( "#field_"+gf_form_id+"_62" ).hide();
    });


}); // document ready


function clone_rider_options(e){
    jQuery('#sj_add_rider' ).remove();
    var newRider = e + 1;
    console.log("clone_rider_options: " + newRider );

    jQuery( 'div.sj_rider_wrapper[data-rider="'+ e +'"]' ).after(cloned_add_rider_wrapper).show();

    jQuery('[rider-number="'+ e +'"]' ).attr('rider-number',newRider );
    jQuery('[rider-number="'+ e +'"]' ).find('.gfield_label').text("RIDER: " + newRider);
    jQuery('[rider-number="'+ newRider +'"]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_rider('+ newRider +')');
    jQuery('[rider-number="'+ newRider +'"]' ).show();
}




function clone_rider(e){

    sj_add_rider = e - 1;
    var cloned_rider_wrapper = jQuery( "[data-rider='1']" ).clone();
    disable_previous_rider(sj_add_rider);


    jQuery('[rider-number="'+ e +'"]' ).hide();
    // console.log(sj_add_rider);


// jQuery("div.sj_add_rider_wrapper[rider-number='1']" ).hide();

jQuery( '[data-rider="'+sj_add_rider+'"]').after(cloned_rider_wrapper);


var cloned_bike_options_first = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_77' ).clone();
var cloned_bike_options_second = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_151' ).clone();

// jQuery( "div.sj_add_rider_wrapper[data-rider=" +sj_add_rider+ "]");

jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('RIDER' + e)
jQuery( '[data-rider="1"]').eq(1).attr('data-rider', e);

jQuery( '[data-rider="'+sj_add_rider+'"]').find('#sj_add_rider').remove();
jQuery( '[data-rider="'+e+'"]').find('#sj_add_rider').remove();

jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(0).attr('onClick','dropdown_check('+e +')').attr("data-rider-choice-first", e);
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(0).attr("data-rider-choice-second", e);
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_78').eq(0).attr('onClick','dropdown_check('+e +')');

jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(1).remove();
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(1).remove();

enable_current_rider(e);

}


function dropdown_check(e){
    var data = '[data-rider="' + e + '"]';

console.log("here");

    var roomOccupancy = jQuery( data).find("#input_"+gf_form_id+"_78 option:selected").text();
    var bikeSelect = jQuery( data).find( "#input_"+gf_form_id+"_77 option:selected" ).text();

console.log("roomOccupancy " + roomOccupancy);
console.log("bikeSelect" + bikeSelect);

if (roomOccupancy == "Please select" || bikeSelect == "Select Bike") {
    console.log('remove')
    jQuery('#sj_add_rider' ).remove();
} else {

       if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {

        if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {
            jQuery('#sj_add_rider' ).remove();
            console.log("add");
            jQuery(data).find( " #field_"+gf_form_id+"_152" ).append('<input type="button" id="sj_add_rider" class="gform_next_button button sj_clicked" value="Add Rider" tabindex="12" onclick="clone_rider_options(' + e + ')"> ');
        }
        
    }

}

 


}
function disable_previous_rider(e){
    console.log("disable_previous_rider " + e);

    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#sj_add_rider").remove();
}

function enable_current_rider(e){
    console.log("disable_previous_rider " + e);

    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", false);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", false);
}


function get_wrapper_count(e){
    var sj_wrapper_count = 0;
    // console.log("clicked");
    jQuery("div." + e).each(function(){
        sj_wrapper_count += 1; 
            // console.log(sj_wrapper_count);
        });
    return sj_wrapper_count;
}





console.log('SJ - Dynamic Gravity Form JS Active');



