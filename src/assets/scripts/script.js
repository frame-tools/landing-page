$(document).ready(function () {
	"use strict";
	if (jQuery.isFunction(jQuery.fn.paroller) && screen.width > 800 ) {
		$("[data-paroller-factor]").paroller();
	}

	$('#ContactForm').on('submit', function (e) {
		e.preventDefault()
		var _this = $(this)

		if (_this.is('.busy')) {
			return
		}

		_this.addClass('busy')

		grecaptcha.execute(RECAPTCHA_KEY, { action: 'contact' }).then(function (token) {
			_this.find('[name=captcha]').val(token)

			_this.ajaxSubmit({
				resetForm: true,
				success: submitSuccess,
				error: submitError,
				complete: function () {
					_this.removeClass('busy')
				}
			})
		})
	})
});