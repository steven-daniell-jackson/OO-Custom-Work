function clone_cart(e){

	jQuery( '#custom_html-2 ').empty();
	var count = 0;
	var riderNumber = count + 1;
	var bikePrice = 0;
	var tour = jQuery("#input_"+gf_form_id+"_73 :selected").text();
	var tourDate = jQuery("#input_"+gf_form_id+"_150 :selected").text();
	var totalPrice = 0;

	jQuery("[data-rider]").each(function(){

		bikeFixedPrice = parseInt(jQuery(this).find('#input_'+gf_form_id+'_77 :selected').val());
		bike2FixedPrice = parseInt(jQuery(this).find('#input_'+gf_form_id+'_151 :selected').val());

		bikePrice += parseInt(jQuery(this).find('#input_'+gf_form_id+'_77 :selected').val());
		var bike = jQuery(this).find('#input_'+gf_form_id+'_77 :selected').text();
		var bike2 = jQuery(this).find('#input_'+gf_form_id+'_151 :selected').text();
		var singleRoomPrice = parseInt(jQuery(this).find( "#input_"+gf_form_id+"_78").attr('roomPrice'));
		var pillion = parseInt(jQuery(this).find( "#input_"+gf_form_id+"_78").attr('pillion'));
		var displayPrice = singleRoomPrice;
		

		if (!pillion) { 
			pillion = 0;
		} 

		if (!singleRoomPrice) { 
			singleRoomPrice = 0;
		} 


		var room = jQuery(this).find('#input_'+gf_form_id+'_78 :selected').text();
		var riderType = jQuery(this).attr('data-rider-type');

		if (riderType == 'rider-with-passenger') {
			displayPrice = singleRoomPrice/2;
		}

		jQuery( '#custom_html-2 ').append(cloned_cart.clone(true)).show();

		jQuery( "[data-rider-cart]").last().attr("data-rider-cart", riderNumber);
		jQuery( "[data-rider-cart] #tour_row span").last().text(tour).show(); 
		jQuery( "[data-rider-cart] #date_row span").last().text(tourDate).show();

		if (bike2 != "Select Bike") {
			bike2Price = jQuery(this).find('#input_'+gf_form_id+'_151 :selected').val(); 
			jQuery( "[data-rider-cart] #bike_row span").last().html("First Choice: "  + bike  + " - " + currency + " " + bikeFixedPrice.toLocaleString() + ".00<br> Second Choice: "  + bike2  + " - " + currency + " " + bike2Price.toLocaleString() + ".00" ).show(); 

		} else {
			jQuery( "[data-rider-cart] #bike_row span").last().html(bike  + " - "+ currency + " " + bikePrice.toLocaleString() + ".00").show(); 

		}
		
		if (room == "Single room") {
			jQuery( "[data-rider-cart] #room_row span").last().html(room + " - " + currency + " " + displayPrice.toLocaleString() + ".00").show(); 
		} else {
			jQuery( "[data-rider-cart] #room_row span").last().html(room + " - " + currency + " " + singleRoomPrice.toLocaleString() + ".00").show(); 
		}

        // jQuery( "[data-rider-cart] #room_row span").last().text(room).show();  
        jQuery( "[data-rider-cart] h4").last().text("Rider " + riderNumber); 

        console.log(jQuery(this).attr('data-rider-type'));
        if (riderType == 'rider-with-passenger') {
        	jQuery( '#custom_html-2 ').append(cloned_cart.clone(true)).show();

        	jQuery( "[data-rider-cart]").last().attr("data-rider-cart", riderNumber);
        	jQuery( "[data-rider-cart] #tour_row span").last().text(tour).show();  
        	jQuery( "[data-rider-cart] #date_row span").last().text(tourDate).show();
        	jQuery( "[data-rider-cart] #date_row span").last().append("<br>Pillion Price: " + pillion).show();
        	if (bike2 != "Select Bike") {
        		jQuery( "[data-rider-cart] #bike_row span").last().html("First Choice: Passenger on "  + bike  + "<br>Second Choice: Passenger on "  + bike2 ).show(); 
            // jQuery( "[data-rider-cart] #bike_row span").append("Second Choice: Passenger on "  + bike2 ).show(); 

        } else {
        	jQuery( "[data-rider-cart] #bike_row span").last().text("Passenger on " + bike).show(); 

        }

        jQuery( "[data-rider-cart] #room_row span").last().text(room + ' - ' + currency + " " + displayPrice).show();  
        jQuery( "[data-rider-cart] h4").last().text("Passenger of rider " + riderNumber);
    }

    count += 1;
    riderNumber += 1;

    totalPrice += singleRoomPrice + pillion;

    // console.log("singleRoomPrice: " + singleRoomPrice);
    // console.log("pillion: " + pillion );

});


	// console.log("bikePrice: " + bikePrice );
	// console.log("singleRoomPrice + pillion: " + totalPrice );
	// console.log("//////////////////////////////////////////////");


	total_price_update(totalPrice, bikePrice);
	jQuery('.sj_next').remove();
	jQuery('#gform_wrapper_'+gf_form_id+' .gform_footer').append('<a class="button sj_next" onclick="add_rider_details('+count+')">Next step</a>');

}




function total_price_update(e, f){
	var updatePrice = "";
    // var priceChange = jQuery("#field_"+gf_form_id+"_73").attr('tour-price');

    // priceChange = Number(priceChange.replace(/[^0-9\.-]+/g,""));
    // priceChange = parseInt(priceChange);
    bikePrice = parseInt(f);
    updatePrice = e + bikePrice;

    // console.log("Cart Price: " + currency + updatePrice);
    // console.log("//////////////////////////////////////////////");
    jQuery("#custom_html-2").append("<span class='cart-total-price'>Total Price: " + currency + " " + updatePrice.toLocaleString() + ".00</span>").show();

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



	if (totalRiders == 0) {
		clone_first_rider_options();
		update_riders_on_delete();
		clone_cart();
		jQuery('.cart-total-price').hide();
		jQuery('#custom_html-2').hide();
	} else {
		update_riders_on_delete();
		clone_cart();
		clone_rider_options(prev);
	}

}


function update_riders_on_delete(){
	var sj_wrapper_count = 0;
	var riderNumber = sj_wrapper_count+1;
	var riderType = '';

	jQuery("div.sj_rider_wrapper ").each(function(){
		riderType = jQuery("div.sj_rider_wrapper").eq(sj_wrapper_count).attr('data-rider-type');
		jQuery("div.sj_rider_wrapper").eq(sj_wrapper_count).attr('data-rider',riderNumber);
		jQuery('[data-rider-cart]').eq(sj_wrapper_count).attr('data-rider-cart',riderNumber);

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
	clone_cart();
	enable_current_rider(sj_wrapper_count);

	
}

function clone_first_rider_options(){
	var firstRider = 1;
	jQuery( '#field_'+gf_form_id+'_69' ).after(cloned_add_rider_wrapper).show();
	jQuery(".sj_add_rider_wrapper" ).attr('rider-number', '1')
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
	jQuery("div." + e).each(function(){
		sj_wrapper_count += 1; 

	});
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
    // console.log('[rider-number="'+ wrapperCount +'"]');
    jQuery('[rider-number]' ).attr('rider-number',newRider );
    jQuery('[rider-number]' ).find('#label_'+gf_form_id+'_62_0').attr('onClick','clone_rider('+ newRider +')');
    jQuery('[rider-number]' ).find('#label_'+gf_form_id+'_62_1').attr('onClick','clone_rider('+ newRider +', "passenger")');
    jQuery('[rider-number]' ).show();

}


function clone_rider(e, f){
	showDelete(e);

	sj_add_rider = e - 1;
	var cloned_rider_wrapper = jQuery( "[data-rider='1']" ).clone();
	disable_previous_rider(sj_add_rider);

	jQuery('[rider-number="'+ e +'"]' ).eq(1).remove();
	jQuery('[rider-number="'+ e +'"]' ).remove();
	jQuery( '[data-rider="'+sj_add_rider+'"]').after(cloned_rider_wrapper);


	var cloned_bike_options_first = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_77' ).clone();
	var cloned_bike_options_second = jQuery( '[data-rider="1"] #input_'+gf_form_id+'_151' ).clone();

	jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('RIDER' + e);
	jQuery( '[data-rider="1"]').eq(1).find('input_'+gf_form_id+'_91').val("");

	if (f == "passenger") {
        // console.log("passenger clicked");
        jQuery( '[data-rider="1"]').eq(1).find("h2.gsection_title").text('Rider with Passenger' + e);
        jQuery( '[data-rider="1"]').eq(1).attr('data-rider-type', "rider-with-passenger");
    } else {
        // console.log("solo clicked");
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

    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_91').val("");
    jQuery( '[data-rider="'+e+'"]').find('#field_'+gf_form_id+'_91').hide();
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_77').eq(1).remove();
    jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_151').eq(1).remove();


    enable_current_rider(e);

}

function dropdown_check(e){
	var data = '[data-rider="' + e + '"]';
	var wrapperCount = get_wrapper_count('sj_rider_wrapper ');


	var roomOccupancy = jQuery( data).find("#input_"+gf_form_id+"_78 option:selected").text();
	var bikeSelect = jQuery( data).find( "#input_"+gf_form_id+"_77 option:selected" ).text();
	var rideType = jQuery('[data-rider="' + e + '"]').attr('data-rider-type');
	var roommateCheck = false;
	var passengerCheck = jQuery('[data-rider="2"]').attr('data-rider-type');


	if (rideType == 'solo-rider') {

		if (roomOccupancy == "Single room") {
			jQuery(data +  " #input_"+gf_form_id+"_78").attr('roomPrice', singleRoomPrice);
		} else {
			jQuery(data +  " #input_"+gf_form_id+"_78").attr('roomPrice', 0);
		}
	}

	if (rideType == 'rider-with-passenger') {
		jQuery(data +  " #input_"+gf_form_id+"_78").attr('pillion', pillionPrice);
		if (roomOccupancy == "Single room") {
			var passengerSingleRoomPrice = singleRoomPrice * 2;
			jQuery(data +  " #input_"+gf_form_id+"_78").attr('roomPrice', passengerSingleRoomPrice);
		} else {
			jQuery(data +  " #input_"+gf_form_id+"_78").attr('roomPrice', 0);
		}
	}


	if (rideType == 'solo-rider') {

		if (roomOccupancy == "Please select" || roomOccupancy == "Single room") {
			jQuery( "#input_"+gf_form_id+"_78").attr('roomPrice', singleRoomPrice);
			jQuery(data + ' #field_'+gf_form_id+'_91' ).hide();
			jQuery('#sj_add_rider' ).remove();

			roommateCheck = false;
		} else {
			jQuery( "#input_"+gf_form_id+"_78").attr('roomPrice', 0);
			jQuery(data + ' #field_'+gf_form_id+'_91' ).show();
			jQuery('#sj_add_rider' ).remove();

			roommateCheck = true;
		}

	}


	jQuery('[data-rider-cart="' + e + '"]' ).remove();

	if (roomOccupancy != "Please select" && bikeSelect != "Select Bike") {

		if (roommateCheck == true) {
			if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {

				if (jQuery(data + ' #input_'+gf_form_id+'_91' ).val() == "") {
					alert("Error: Room mate name is required");
					jQuery(data).find( " #input_"+gf_form_id+"_91" ).addClass('add-border-red');
					jQuery(data).find( "#input_"+gf_form_id+"_77" ).addClass('add-border-red');


					jQuery(data).focus();
					jQuery( data+ " #input_"+gf_form_id+"_77" ).prop("selectedIndex", 0);
					roommateCheck = true;
				} else {

					jQuery('#sj_add_rider' ).remove();
					jQuery(data).find( " #input_"+gf_form_id+"_91" ).css('border-color', '#424242');

					clone_cart();
					clone_rider_options(sj_add_rider_wrapper_count);

				}


			} 

		}
		else {

			if (!jQuery(data).find( " #field_"+gf_form_id+"_152" ).hasClass("sj_clicked")) {
    // console.log(roommateCheck);
    jQuery('#sj_add_rider' ).remove();
    clone_cart();
    clone_rider_options(sj_add_rider_wrapper_count);

} 
}

}

}

function update_cart_info(e,roomOccupancy,bikeSelect){
	jQuery('[data-rider-cart="' + e + '"] .bike_row' ).text(bikeSelect);
	jQuery('[data-rider-cart="' + e + '"] #room_row span' ).text(roomOccupancy);
}


function disable_previous_rider(e){
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", true);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", true);
	jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", true);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", true);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", true);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", true);
	jQuery( '[data-rider="'+e+'"]').find("#sj_add_rider").remove();
}

function enable_current_rider(e){

	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_78").attr("disabled", false);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_91").attr("disabled", false);
	jQuery( '[data-rider="'+e+'"]').find("#choice_"+gf_form_id+"_79_1").attr("disabled", false);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_77").attr("disabled", false);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_151").attr("disabled", false);
	jQuery( '[data-rider="'+e+'"]').find("#input_"+gf_form_id+"_152").attr("disabled", false);
	console.log('[data-rider="'+e+'"]');
	jQuery( '[data-rider="'+e+'"]').find('#input_'+gf_form_id+'_152').val(' ');
}

function get_wrapper_count(e){
	var sj_wrapper_count = 0;
	jQuery("div." + e).each(function(){
		sj_wrapper_count += 1; 

	});
    // console.log(sj_wrapper_count);
    return sj_wrapper_count;
}



