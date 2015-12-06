function onLoad( jQuery ) {

	var tempIntervalId = -1;
	var temp = 30;
	function myCallback() {
		$("#weather-current .temp-high .value").text(temp++);
		if (temp > 40 && tempIntervalId > 0) {
			clearInterval(tempIntervalId);
		}
	}
	
	tempIntervalId = window.setInterval(myCallback, 1500);
}
 
$( document ).ready( onLoad );