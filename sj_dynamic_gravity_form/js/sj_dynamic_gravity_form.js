var gf_form_id = 15;
var cloned_cart = '';
jQuery(document).ready(function() {
    cloned_add_rider_wrapper = jQuery( ".sj_add_rider_wrapper" ).clone();
    cloned_first_rider_wrapper = "";
    
    var cloned_bike_options_first = '';
    var cloned_bike_options_second = '';
    

    jQuery('#custom_html-2 .custom-html-widget').attr('data-rider-cart', '1');
    jQuery('#custom_html-2 .custom-html-widget h4').text('Rider 1');

    cloned_cart = jQuery( "#custom_html-2 .custom-html-widget" ).clone();


    jQuery('#field_'+gf_form_id+'_60 h2').css('float', 'left');
    jQuery('#field_'+gf_form_id+'_60 ').append('<span class="sj-close" style="float:right; border-radius: 50%;padding: 4px 14px; border: 1px solid" onclick="deleteRider(1)">x</a>');

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

// console.log(obj);
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


    jQuery("#field_"+gf_form_id+"_73").attr('tour-price',obj.price);
    jQuery(".tour-name").text(obj.tour);
    jQuery(".date-name").text(obj.tourDates.date[1].date);
    jQuery(".cart-total-price").remove( );
    jQuery("#custom_html-2").after( "<span class='cart-total-price' >Total Price: R " + obj.price + "</span>").hide();



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

    jQuery( "#input_"+gf_form_id+"_62" ).click(function() { 
        var riderType = jQuery( "#input_"+gf_form_id+"_62" ).find('input:checked').val();

        if (riderType == "Add solo rider") {
          jQuery( '[data-rider="1"]').attr('data-rider-type', 'solo-rider');
      } else {
        jQuery( '[data-rider="1"]').attr('data-rider-type', 'rider-with-passenger');
    }
        // console.log("here");
    });

    jQuery( "#input_"+gf_form_id+"_150" ).change(function() {

        var dateChange = jQuery( "#input_"+gf_form_id+"_150" ).val();
        // console.log(dateChange);
        jQuery(".date-name").text(dateChange);

    });

    jQuery( "div.sj_rider_wrapper[data-rider='1']" ).change(function() {

        sj_add_rider_wrapper_count = get_wrapper_count("sj_rider_wrapper");
        var roomOccupancy = jQuery( "#input_"+gf_form_id+"_78 option:selected" ).text();
        var bikeSelect = jQuery( "#input_"+gf_form_id+"_77 option:selected" ).text();


        var rideType = jQuery('[data-rider="1"]').attr('data-rider-type');

        if (rideType == 'solo-rider') {

         if (roomOccupancy == "Please select" || roomOccupancy == "Each single room (1 person, 1 bed)") {
            jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_91' ).hide();
            jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_152' ).next().remove();
        } else {
            jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_91' ).show();
            jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_152' ).next().remove();
        }
    }


    if (roomOccupancy == "Please select" || bikeSelect == "Select Bike") {
        jQuery( "#custom_html-2" ).hide();
        jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_152' ).next().remove();
    }

    if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {
        clone_cart()
        jQuery('div.sj_rider_wrapper[data-rider="1"] #field_'+gf_form_id+'_152' ).after('<input type="button" id="sj_add_rider" class="gform_next_button button" value="Add Rider" tabindex="12" onclick="clone_rider_options('+sj_add_rider_wrapper_count+')"> ');

    }
});

    jQuery( "#field_"+gf_form_id+"_62" ).click(function() {


        jQuery( '[data-rider="1"] #field_'+gf_form_id+'_91').hide();
        jQuery( "#field_"+gf_form_id+"_62" ).hide();
    });


    jQuery( "#custom_html-2" ).hide();


   // jQuery('.sj-close ').hide();
}); // document ready


function clone_cart(e){
    // console.log(cloned_cart);
// var cloned_cart = jQuery( "#custom_html-2 .custom-html-widget" ).clone();
jQuery( '#custom_html-2 ').empty();
    // jQuery( '#custom_html-2 ').append(cloned_cart).show();
    var count = 0;
    var riderNumber = count + 1;

var tour = jQuery("#input_15_73 :selected").text();
var tourDate = jQuery("#input_15_150 :selected").text();


    jQuery("[data-rider]").each(function(){

var bike = jQuery(this).find('#input_15_77 :selected').text();
var room = jQuery(this).find('#input_15_78 :selected').text();
console.log(bike);
// var room = jQuery("#input_15_150 :selected").text();


        console.log('clone_cart: ' + count);
        console.log(jQuery( "[data-rider='"+riderNumber+"'] h2").text());

        jQuery( '#custom_html-2 ').append(cloned_cart.clone(true)).show();

        jQuery( "[data-rider-cart]").last().attr("data-rider-cart", riderNumber);
        jQuery( "[data-rider-cart] #tour_row span").last().text(tour).show(); 
        jQuery( "[data-rider-cart] #date_row span").last().text(tourDate).show();
        jQuery( "[data-rider-cart] #bike_row span").last().text(bike).show(); 
        jQuery( "[data-rider-cart] #room_row span").last().text(room).show();  
        jQuery( "[data-rider-cart] h4").last().text("Rider " + riderNumber); 
        count += 1;
        riderNumber += 1;
    });

    console.log('total clone_cart: ' + count);

total_price_update(count);

    // jQuery( "[data-rider-cart='1']").last().attr("data-rider-cart", e);
    // jQuery( "[data-rider-cart='"+e+"'] h4").text("Rider " + e); 

    
}


function total_price_update(e){
    var updatePrice = "";

    // console.log(jQuery( "[data-rider-cart='"+e+"']"));
    var priceChange = jQuery("#field_"+gf_form_id+"_73").attr('tour-price');
    // var priceChange = jQuery( ".cart-total-price" ).text();

    priceChange = Number(priceChange.replace(/[^0-9\.-]+/g,""));
    priceChange = parseInt(priceChange);

    updatePrice = e *priceChange;
    jQuery(".cart-total-price").text("Total Price: R " + updatePrice).show();

}


function deleteRider(e){
    jQuery('.sj_add_rider_wrapper' ).remove();

    cloned_first_rider_wrapper = jQuery( "[data-rider='1']" ).clone();
    cloned_bike_options_first = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_77' ).clone();
    cloned_bike_options_second = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_151' ).clone();
    
    var prev = e - 1;
    var totalRiders = 0;

    jQuery('[data-rider="'+e+'"]' ).remove();
    jQuery('[rider-number="'+e+'"]' ).remove();
    jQuery('[data-rider-cart="'+e+'"]' ).remove();

    totalRiders = countRiderWrapper('sj_rider_wrapper ');
    // console.log("totalRiders " + totalRiders);

    if (totalRiders == 0) {

        clone_first_rider_options();
    } else {
        jQuery('[data-rider="'+prev+'"]').find( " #field_"+gf_form_id+"_152" ).append('<input type="button" id="sj_add_rider" class="gform_next_button button" value="Add Rider" tabindex="12" onclick="clone_rider_options(' + prev + ')"> ');
    }

    // jQuery('.sj_add_rider_wrapper' ).remove();
    update_riders_on_delete();
    clone_cart();
}


function update_riders_on_delete(){
    var sj_wrapper_count = 0;
    var riderNumber = sj_wrapper_count+1;
    var riderType = '';
    // console.log("clicked");

    

    jQuery("div.sj_rider_wrapper ").each(function(){

        // console.log("update_riders_on_delete: " + sj_wrapper_count);
        // console.log("riderNumber: " +  riderNumber);

        riderType = jQuery("div.sj_rider_wrapper").eq(sj_wrapper_count).attr('data-rider-type');
        jQuery("div.sj_rider_wrapper").eq(sj_wrapper_count).attr('data-rider',riderNumber);
        jQuery('[data-rider-cart]').eq(sj_wrapper_count).attr('data-rider-cart',riderNumber);

        console.log('riderNumber: ' + riderNumber);

        jQuery( '[data-rider-cart="'+riderNumber+'"] h4').text('Rider' + riderNumber);


        jQuery( '[data-rider="'+riderNumber+'"]').find("h2.gsection_title").text(riderType +' ' + riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find(".sj-close").attr('onclick' , 'deleteRider('+riderNumber+')');
        jQuery( '[data-rider="'+riderNumber+'"]').find('#input_'+gf_form_id+'_77').attr('onClick','dropdown_check('+riderNumber +')').attr("data-rider-choice-first", riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find('#input_'+gf_form_id+'_151').attr("data-rider-choice-second", riderNumber);
        jQuery( '[data-rider="'+riderNumber+'"]').find('#input_'+gf_form_id+'_78').attr('onClick','dropdown_check('+riderNumber +')');



        sj_wrapper_count += 1; 
        riderNumber += 1;
        
    });
    jQuery('#sj_add_rider' ).remove();
    jQuery('#sj_add_rider' ).attr('onclick', 'clone_rider_options('+sj_wrapper_count+')')
    // jQuery('#sj_rider_wrapper ' ).eq(riderNumber).remove();
    // jQuery('#sj_rider_wrapper ' ).eq(sj_wrapper_count).remove();
    clone_cart();
    // reduce_total_price_update(riderNumber);
    enable_current_rider(sj_wrapper_count);
    // console.log(sj_wrapper_count);

    
}

function clone_first_rider_options(){
    var firstRider = 1;
    jQuery( '#field_'+gf_form_id+'_69' ).after(cloned_add_rider_wrapper).show();
    jQuery("[rider-number='"+firstRider+"']" ).show();
    jQuery('[rider-number="'+ firstRider +'"]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_first_rider('+ 1 +')');
    jQuery('[rider-number="'+ firstRider +'"]' ).find('#label_'+gf_form_id+'_62_1').attr('onClick','clone_first_rider('+ 1 +', "passenger")');

}

function clone_first_rider(e, f){
    showDelete(e);

    jQuery( '[rider-number="'+e+'"]').after(cloned_first_rider_wrapper).show();
    jQuery('[rider-number="'+e+'"]' ).hide();

    if (f == "passenger") {
        console.log("passenger clicked");
        jQuery( '[data-rider="'+e+'"]').find("h2.gsection_title").text('Rider with Passenger' + e);
        jQuery( '[data-rider="'+e+'"]').attr('data-rider-type', "rider-with-passenger");
    } else {
        console.log("solo clicked");
        jQuery( '[data-rider="'+e+'"]').find("h2.gsection_title").text('Solo Rider' + e);
        jQuery( '[data-rider="'+e+'"]').attr('data-rider-type',  "solo-rider");
    }

    jQuery( '[data-rider="'+e+'"]').attr('data-rider', e);
    jQuery( '[data-rider="'+e+'"]').find('#sj_add_rider').remove();
    jQuery( '[data-rider="'+e+'"]').find('.sj-close').attr('onclick', 'deleteRider('+e+')');

    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').attr('onClick','dropdown_check('+e +')').attr("data-rider-choice-first", e);
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').attr("data-rider-choice-second", e);
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_78').attr('onClick','dropdown_check('+e +')');

    jQuery( '[data-rider="'+e+'"]').find('#field_'+gf_form_id+'_91').hide();

    enable_current_rider(e);



}




function countRiderWrapper(e){
    var sj_wrapper_count = 0;
    // console.log("clicked");
    jQuery("div." + e).each(function(){
        sj_wrapper_count += 1; 

    });
    // console.log('countRiderWrapper: ' + sj_wrapper_count);
    return sj_wrapper_count;
}



function showDelete(e){
    jQuery('.sj-close ').show();
}


function clone_rider_options(e){
    jQuery('#sj_add_rider' ).remove();
    var wrapperCount = get_wrapper_count('sj_rider_wrapper ');
    var newRider = wrapperCount + 1;

    jQuery( '[data-rider]' ).last().after(cloned_add_rider_wrapper);
    console.log('[rider-number="'+ wrapperCount +'"]');
    jQuery('[rider-number]' ).attr('rider-number',newRider );
    // jQuery('[rider-number]' ).find('.gfield_label').text("RIDER: " + newRider);
    // jQuery('[rider-number="'+ newRider +'"]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_rider('+ newRider +')');
    jQuery('[rider-number]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_rider('+ newRider +')');
    jQuery('[rider-number]' ).find('#label_'+gf_form_id+'_62_1').attr('onClick','clone_rider('+ newRider +', "passenger")');
    jQuery('[rider-number]' ).show();

}






function clone_rider(e, f){
    showDelete(e);
// console.log(f);


sj_add_rider = e - 1;
var cloned_rider_wrapper = jQuery( "[data-rider='1']" ).clone();
disable_previous_rider(sj_add_rider);

jQuery('[rider-number="'+ e +'"]' ).eq(1).remove();
jQuery('[rider-number="'+ e +'"]' ).remove();
    // console.log(sj_add_rider);


// jQuery("div.sj_add_rider_wrapper[rider-number='1']" ).hide();

jQuery( '[data-rider="'+sj_add_rider+'"]').after(cloned_rider_wrapper);


var cloned_bike_options_first = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_77' ).clone();
var cloned_bike_options_second = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_151' ).clone();

// jQuery( "div.sj_add_rider_wrapper[data-rider=" +sj_add_rider+ "]");

jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('RIDER' + e);

if (f == "passenger") {
    console.log("passenger clicked");
    jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('Rider with Passenger' + e);
    jQuery( '[data-rider="1"]').eq(1).attr('data-rider-type', "rider-with-passenger");
} else {
    console.log("solo clicked");
    jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('Solo Rider' + e);
    jQuery( '[data-rider="1"]').eq(1).attr('data-rider-type',  "solo-rider");
}

jQuery( '[data-rider="1"]').eq(1).attr('data-rider', e);
jQuery( '[data-rider="'+sj_add_rider+'"]').find('#sj_add_rider').remove();
jQuery( '[data-rider="'+e+'"]').find('#sj_add_rider').remove();
jQuery( '[data-rider="'+e+'"]').find('.sj-close').attr('onclick', 'deleteRider('+e+')');

jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(0).attr('onClick','dropdown_check('+e +')').attr("data-rider-choice-first", e);
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(0).attr("data-rider-choice-second", e);
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_78').eq(0).attr('onClick','dropdown_check('+e +')');

jQuery( '[data-rider="'+e+'"]').find('#field_'+gf_form_id+'_91').hide();
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(1).remove();
jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(1).remove();


enable_current_rider(e);

}

function dropdown_check(e){
    var data = '[data-rider="' + e + '"]';
    var wrapperCount = get_wrapper_count('sj_rider_wrapper ');

    console.log('wrapperCount: ' + wrapperCount);

    // console.log("here");

    var roomOccupancy = jQuery( data).find("#input_"+gf_form_id+"_78 option:selected").text();
    var bikeSelect = jQuery( data).find( "#input_"+gf_form_id+"_77 option:selected" ).text();
    var rideType = jQuery('[data-rider="' + e + '"]').attr('data-rider-type');

    if (rideType == 'solo-rider') {

        if (roomOccupancy == "Please select" || roomOccupancy == "Each single room (1 person, 1 bed)") {
            jQuery(data + ' #field_'+gf_form_id+'_91' ).hide();
            jQuery('#sj_add_rider' ).remove();
        } else {
            jQuery(data + ' #field_'+gf_form_id+'_91' ).show();
            jQuery('#sj_add_rider' ).remove();
        }

    }

    jQuery('[data-rider-cart="' + e + '"]' ).remove();

    if (roomOccupancy == "Please select" || bikeSelect == "Select Bike") {

        var reduceTotalPrice = e - 1;
        jQuery('[data-rider-cart="' + e + '"]' ).remove();
        // reduce_total_price_update(e);
        jQuery('#sj_add_rider' ).remove();
    } else {

       if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {



        if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {

            jQuery('#sj_add_rider' ).remove();
            // console.log("add");
            jQuery(data).find( " #field_"+gf_form_id+"_152" ).append('<input type="button" id="sj_add_rider" class="gform_next_button button sj_clicked" value="Add Rider" tabindex="12" onclick="clone_rider_options(' + e + ')"> ');
            clone_cart();
            // update_cart_info(e,roomOccupancy,bikeSelect);
            // total_price_update(e);

        }
        
    }

}

}

function update_cart_info(e,roomOccupancy,bikeSelect){
    // console.log(e);
    // console.log("update_cart_info");
    // console.log(e+roomOccupancy+bikeSelect);
    jQuery('[data-rider-cart="' + e + '"] .bike_row' ).text(bikeSelect);
    jQuery('[data-rider-cart="' + e + '"] #room_row span' ).text(roomOccupancy);
}


function disable_previous_rider(e){
    // console.log("disable_previous_rider " + e);

    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", true);
    jQuery( '[data-rider="'+e+'"]').find("#sj_add_rider").remove();
}

function enable_current_rider(e){
    // console.log("enable_previous_rider " + e);

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

    });
    console.log(sj_wrapper_count);
    return sj_wrapper_count;
}




console.log('SJ - Dynamic Gravity Form JS Active');



