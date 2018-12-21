/*
  This is a kitchen sink example of how to build an HTML 5 package for the iDetailAid content management system.

  See http://docs.idetailaid.co.uk/dev-docs/intro/ for more information.
*/

$(function() {

  // check the ida object that is injected into the package by iDetailAid
  // ida.slide.scope is the "public" properties and functions in the parent slide script editor scope
  var settings = ida.slide.scope.sliderSettings || {};

  // set up a JQ slider
  $( '.slider' ).slider({
    // use a value from the parent slide
    value:settings.value || 50,
    min: 0,
    max: 100,
    slide: function( event, ui ) {
      $( '.percentage' ).html( ui.value + '%');
      // Tell the parent slide that we have changed the value
      // ida.iframe.trigger triggers an event on the HTML content area in the slide
      // which the slide can listen out for
      ida.iframe.trigger('sliderChange', ui);
    }
  });
  
  // Check if there is a localisation for the title set in the parent slide slide script editor scope
  if( settings.question ) {
    $( '.question' ).html( settings.question ); 
  }

  // Add slider percentage to text input field
  $( '.percentage' ).html( $( '.slider').slider( 'value' ) + '%' );

  // Add slider background scale
  $('.slider').append('<img src="images/slider-bg.png" class="img-responsive" alt="" />');

  // When the back button in the HTML is pressed, tell the viewer to go back
  $('.back').on('click', () => ida.Viewer.api.goBack() );

  // when the slide is shown, update some UI
  $(document).on('slideShown', event => {
    $('.title').html( event.detail.slide.title );
  }) 

  // when the slide leaves, call a method in the parent scope passing it some data from this package
  $(document).on('slideExit', event => {
    ida.slide.scope.logValue( $('.slider').value() );
  })


  // Get some Veeva data
  if( top.com ) {
    $('.accountId').html( top.com.veeva.clm.accountId );
  }
});
