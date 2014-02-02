/*!
 * Custom scripts for Zimperium
 * ----------------------------
 * Developed by Collective Ray <http://www.collectiveray.com/>
 */
jQuery(function($){

/******************************************************************************
 * ---------------------------------------------------------------------------
 * DEVELOPMENT NOTE: It's strongly recommended you use CodeKit for development
 * On Mac, get it here: http://incident57.com/codekit/
 *
 * For Windows, there's a very similar tool called Prepros that should do the
 * same kind of minification for CSS/JS.
 * Get it here: http://alphapixels.com/prepros/
 * ---------------------------------------------------------------------------
 *****************************************************************************/

/*
 * SCREEN SIZE DETECTION FOR JS VIA CSS
 * More info on how this works: http://adactio.com/journal/5429/
 *****************************************************************************/
var size = window.getComputedStyle(document.body,':after')
            .getPropertyValue('content').replace(/\W/g, '');


/*
 * CUSTOM THEME JS
 *****************************************************************************/

	var i = 0;


	// $("a.moreinfo").click(launchModal);
	// // alert("hi");
	// var launchModal = function(event){
	// 	// alert("hi");
	// 	event.preventDefault();
	// 	console.log("launch popup");
	// 	var blackout = $('<div id="blackout"></div>');
	// 	$("#footer").prev().append(blackout);
	// 	return 0;
	// }

	// var closeModal = function(){

	// }

	$('.management .profile').each(function(){
		managementHeight = $(this).height();
		advisoryHeight = $('.advisory-board .profile:eq(' + i +')').height();
		if (managementHeight >= advisoryHeight) {
			$(this).css('min-height',managementHeight+'px');
			$('.advisory-board .profile:eq(' + i +')').css('min-height',managementHeight+'px');
		} else {
			$(this).css('min-height',advisoryHeight+'px');
			$('.advisory-board .profile:eq(' + i +')').css('min-height',advisoryHeight+'px');
		}
		i++;
	});

	$('.selectpicker').selectpicker();

    $('input:radio').screwDefaultButtons({
        image: 'url("assets/images/radio.png")',
        width: 44,
        height: 44
    });

    $('input:checkbox').screwDefaultButtons({
        image: 'url("assets/images/checkbox.png")',
        width: 44,
        height: 44
    });

	/*
	 * CUSTOM NUMBER PICKER
	 *****************************************************************************/

	var number_inputs = $('input[type=number]'),

		// This is the number by which the input will be incremented
		increment = 1,

		// Updates the table with new quantity pricing
		update_prices = function(el) {

			var target = el.data('target');
			var current_value = parseInt(el.val());

			var cost_per_unit = parseInt($("#cost-per-device-" + target).data('cost'));

			var new_monthly = format_price(current_value*cost_per_unit);
			var new_annual  = format_price(current_value*cost_per_unit*12);
			$('#cost-per-month-' + target).text(new_monthly);
			$('#cost-per-year-' + target).text(new_annual);
		},

		// Adds the dollar sign and comma separation
		format_price  = function( val ) {
		    while (/(\d+)(\d{3})/.test(val.toString())){
		        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		    }
		    return '$' + val;
		}

		// Creates the up/down buttons and assigns click handlers
		inc_up = $('<span></span>', {
			"class": "number-buttons up",
			text: "+",
			on: {
				click: function() {
					current_value = parseInt($(this).siblings('input[type=number]').val());

					var newval = current_value+increment;
					current_value = newval;
					
					$(this).siblings('input[type=number]').val(newval);
					target = $(this).siblings('input[type=number]');
					update_prices(target);
				}
			}
		}),
		inc_down = $('<span></span>', {
			"class": "number-buttons down",
			text: "-",
			on: {
				click: function() {
					current_value = parseInt($(this).siblings('input[type=number]').val());
					// Prevents the count from dropping below 1
					
					var newval = (current_value-increment)>=1 ? current_value-increment : 1;
					current_value = newval;
					
					$(this).siblings('input[type=number]').val(newval);
					target = $(this).siblings('input[type=number]');
					update_prices(target);
				}
			}
		});

	number_inputs.on('change', function(){
		target = $(this);
		update_prices(target);
	}).before(inc_down).after(inc_up);
	



});
