
$(document).ready(function() {
  const presConst = {
    masStr: 80, smBorHan: 50, fogNoz: 100, sprink: 150, stanPipWo: 200, relPum: 100, aptLoad: 140, highRise: 360};

  const flConst ={}
  let total = 0;
  $('input').on('change', function() {
    let number = $(this).val();
    total = +total + +number;
    console.log(number);
  });

  $('button').on('click', function() {
    $('#result').html(total);
    console.log(total);
  });

  $('.dropdown-item').on('click', function() {
    let drpDnItm = $(this).prop('id');
    console.log(drpDnItm);
  });



});
