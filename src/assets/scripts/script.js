$(document).ready(function () {
	"use strict";
	if (jQuery.isFunction(jQuery.fn.paroller) && screen.width > 800 ) {
		$("[data-paroller-factor]").paroller();
	}
});