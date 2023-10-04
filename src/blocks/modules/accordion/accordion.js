let accordiontriggers = $('.jsAccordionTrigger');

accordiontriggers.on('click', function(){
    let accordion = $(this).closest('.jsAccordion');
    accordion.toggleClass('is-open');
    $('.jsAccordion').not($(this).closest('.jsAccordion')).removeClass('is-open');
    $('.jsAccordion').not($(this).closest('.jsAccordion')).find('.jsAccordionBody').slideUp();
    accordion.find('.jsAccordionBody').slideToggle();
})