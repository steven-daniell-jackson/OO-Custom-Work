jQuery(document).ready(function($){

  console.log("sj_custom_woocommerce_quickview Running");
  var img_urls = '';


  $('tr .column-thumb').each(function(event) {

    var id = $(this).closest('tr').find('.column-sku').text();
    $(this).attr('sj-img-id', id);


    $.ajax({
      type: 'POST',
      url: ajaxurl,
      async: true,
      data: {'action' : 'ajax_request', 'id': id},
      beforeSend: function() {
    },
      success: function(data) {

        img_url = data.slice(0,-1);
      }

    })
    .done(function(){
      console.log(img_urls);
      jQuery('[sj-img-id='+id+'] a').after('<div class="sj-quickview"><a href='+img_url+' target="_blank">View</a><siv>');
    });

    // return false;
  });



});