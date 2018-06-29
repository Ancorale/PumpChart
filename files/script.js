
$(document).ready(function() {
  const presConst = {
    masStr: 80, smBorHan: 50, fogNoz: 100, sprink: 150, stanPipWo: 200, relPum: 100, aptLoad: 140, highRise: 360},
   flConst = {
    elup: 5, elDn: -5, appl: 10, stanPip: 25, monDek: 25, bliz: 20},
   Hose = {
    one34: 12, two12: 2, five: .08};
    let drpDnItmVal = [];
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
    let drpDnItm = $(this).prop('id'),
    thisDrpDnItmVal = $(this).html();
    drpDnItmVal.push(thisDrpDnItmVal  + "<br>");
    $('#result').html(drpDnItmVal);
    console.log(drpDnItmVal);
    console.log(drpDnItm);
  });



});
