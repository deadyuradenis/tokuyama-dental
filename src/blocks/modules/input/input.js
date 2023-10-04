import intlTelInput from 'intl-tel-input';

const input = document.querySelectorAll(".jsPhoneMask");

import IMask  from 'imask';

let phoneElement = document.querySelectorAll('.jsPhoneMask');
let phoneElementAuto = document.querySelectorAll('.jsPhoneMaskAuto');


let RU = {
	mask: '+{7} (000) 000-00-00',
	startsWith: '7',
	lazy: true,
	country: 'RU'
};

let	BY = {
	mask: '+{375} (00) 000-00-00',
	startsWith: '3',
	lazy: true,
	country: 'BY'
};

let	KG = {
	mask: '+{9}96 (000) 000-000',
	startsWith: '996',
	lazy: true,
	country: 'KG'
};

let	UZ = {
	mask: '+{9}98 (00) 000-0000',
	startsWith: '998',
	lazy: true,
	country: 'UZ'
};

let	MN = {
	mask: '+{9}76 (00) 00-0000',
	startsWith: '976',
	lazy: true,
	country: 'MN'
};

let countries = {RU, BY, KG, UZ, MN};

if (phoneElementAuto.length > 0) {
	for (let i = 0; i < phoneElementAuto.length; i++) {

		let phoneMaskSettingsa = {
			mask: [
				{
					mask: '+{7} (000) 000-00-00',
					startsWith: '7',
					lazy: true,
					country: 'RU'
				},
				{
					mask: '{8} (000) 000-00-00',
					startsWith: '8',
					lazy: true,
					country: 'RU'
				},
				{
					mask: '+{375} (00) 000-00-00',
					startsWith: '3',
					lazy: true,
					country: 'BY'
				},
				{
					mask: '+996 (000) 000-000',
					startsWith: '996',
					lazy: true,
					country: 'KG'
				},
				{
					mask: '+998 (00) 000-0000',
					startsWith: '998',
					lazy: true,
					country: 'UZ'
				},
				{
					mask: '+976 (00) 00-0000',
					startsWith: '976',
					lazy: true,
					country: 'MN'
				},
				{
					mask: '0000000000000',
					startsWith: '',
					lazy: true,
					country: 'unknown'
				}
			],
			dispatch: function (appended, dynamicMasked) {
				let number = (dynamicMasked.value + appended).replace(/\D/g, '');
		
				return dynamicMasked.compiledMasks.find(function (m) {
					return number.indexOf(m.startsWith) === 0;
				}) || this.dynamicMasked.compiledMasks[this.dynamicMasked.compiledMasks.length - 1];
			}
		};

		let mask = IMask(phoneElementAuto[i], phoneMaskSettingsa);
	}
}

if (phoneElement.length > 0) {
	for (let i = 0; i < phoneElement.length; i++) {

		let phoneMaskSettings = {
			mask: countries,
			dispatch: function (appended, dynamicMasked) {
				let number = (dynamicMasked.value + appended).replace(/\D/g, '');
		
				return dynamicMasked.compiledMasks.find(function (m) {
					return number.indexOf(m.startsWith) === 0;
				}) || this.dynamicMasked.compiledMasks[this.dynamicMasked.compiledMasks.length - 1];
			}
		};

		
		if (!phoneElement[i].hasAttribute('data-country')){
			phoneElement[i].setAttribute('data-country', 'ru');
		}

		let attr = phoneElement[i].getAttribute('data-country');

		let iti = intlTelInput(phoneElement[i], {
			initialCountry: ""+attr+"",
			onlyCountries:["ru", "by", "kg", "uz", "mn"],
		});
	
		phoneElement[i].addEventListener("countrychange", function() {
			var countryData = iti.getSelectedCountryData();
			let countryIso = countryData.iso2;
			phoneElement[i].setAttribute('data-country',''+countryIso+'');
			changeMask();
		});


		let country;
		let maskSettings;

		checkCountry();

		let mask = IMask(phoneElement[i], maskSettings);

		function changeMask(){
			checkCountry();
			mask.updateOptions(maskSettings)
			mask.value = '';
		}
		
		function checkCountry(){
			let country = String(phoneElement[i].getAttribute('data-country'));
		
			if (country == 'ru' ){
				maskSettings =  phoneMaskSettings.mask.RU;
			} else 	if (country == 'by' ){
				maskSettings =  phoneMaskSettings.mask.BY;
			} else if (country == 'kg' ){
				maskSettings =  phoneMaskSettings.mask.KG;
			} else if (country == 'uz' ){
				maskSettings =  phoneMaskSettings.mask.UZ;
			} else if (country == 'mn' ){
				maskSettings =  phoneMaskSettings.mask.MN;
			} else {
				maskSettings =  phoneMaskSettings.mask.RU;
			}
		}
	}
}

let regexpPhone = new RegExp('[0-9]{1,3}\\s[\(][0-9]{2,3}[\)]\\s([0-9]{3}(([\-][0-9]{2}[\-][0-9]{2})|([\-][0-9]{3})))|([0-9]{2}[\-][0-9]{4})');


let jsInputs = $('.jsInput');

jsInputs.each(function() {
  
    if($(this).hasClass('jsInputReq')){
        $(this).on('keyup input', function(){
            checkInputs($(this));
        })
    }

	$(this).focus(function() {
		$(this).closest('.input').removeClass('is-filled');
		$(this).closest('.input').addClass('is-focus');
	});

	$(this).blur(function(){
		if($(this).val().length > 0){
			$(this).closest('.input').removeClass('is-focus');
			$(this).closest('.input').addClass('is-filled');
		} else {
			$(this).closest('.input').removeClass('is-focus');
			$(this).closest('.input').removeClass('is-error');
		}
	})
})

$('.jsForm').each(function(){
    let thisForm = $(this);

    thisForm.submit(function (e) {

        let inputs = thisForm.find('.jsInput.jsInputReq');

        inputs.each(function(){
            checkInputs($(this));
        })

		if(thisForm.find('.is-error').length ){
            e.preventDefault();
        }
    });
})

function checkInputs(input){

    if(input.hasClass('jsPhoneMask')){
        if(input.val() != 0 & regexpPhone.test(input.val()) == true){
            input.closest('.input').removeClass('is-error');
        } else{
            input.closest('.input').addClass('is-error');
        }  
    } else if(input.val() == 0){
        input.closest('.input').addClass('is-error');
    } else{
        input.closest('.input').removeClass('is-error');
    }  
}
