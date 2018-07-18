$(document).ready(function() {
  const preConst = {
      masStr: 80,
      smBorHan: 50,
      fogNoz: 100,
      sprink: 150,
      stanPipWo: 200,
      relPum: 100,
      aptLoad: 140,
      highRise: 360,
      elup: 5,
      elDn: -5,
      appl: 10,
      stanPip: 25,
      monDek: 25,
      bliz: 20
    },
    coeff = {
      one34: 12,
      one341: 12,
      two12: 2,
      two121: 2,
      five: .08,
      siam: .5,
      triam: .22
    };
  let drpDnItmVal = [],
    total = 0,
    engPress = 0,
    hoseLength = 0,
    coefficient = 0,
    frictionLoss = 0,
    press = 0,
    GPM = '';

  $('.dropdown-item').on('click', function() {
    let drpDnItm = $(this).prop('id'),
      thisDrpDnItmVal = $(this).html(),
      dad = $(this).parent().prev().prop('id');
      console.log(drpDnItm);
    drpDnItmVal.push(thisDrpDnItmVal + "<br>");

    switch (drpDnItm) {
      case "stanPipWo":
        $('#EP').html("200 PSI Max Standpipe w&sol;o Pump");
        break;
      case 'highRise':
        $('#EP').html("360 PSI Max High Rise Pumping");
        break;
      default:

      for (key in preConst) {
        if (drpDnItm == key) {
          press = preConst[key];
        }
      }

      for (key in coeff) {
        if (drpDnItm == key) {
          coefficient = coeff[key];
          console.log(coefficient);
          if (key == 'one34' || key == 'two12') {
            hoseLength += 50;
          } else {
            hoseLength += 100;
          }
        }
      }


    if (dad == 'dropdownMenuButtonGPM') {
      GPM = thisDrpDnItmVal.replace(/GPM/, '');
      GPM = +GPM;
    }

    function fricLoss(a, b, c) {
      let d = a * Math.pow((b / 100), 2) * c / 100;
      return Math.ceil(d);
    }
    frictionLoss = fricLoss(coefficient,GPM,hoseLength);

    engPress += press;

    $('#FL').html('FL ' + frictionLoss);
    $('#HL').html(hoseLength);
    $('#gpm').html(GPM + ' GPM');
    $('#EP').html(Math.ceil(engPress + frictionLoss));
    $('#whats').html(drpDnItmVal);

}

  });

});
