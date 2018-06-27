let total = 0;
$(document).ready(function() {

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
    let drpDnItm = $(this).html();

    console.log(drpDnItm);
  });

});
