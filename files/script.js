$(document).ready(function() {
  const presConst = {
      masStr: 80,
      smBorHan: 50,
      fogNoz: 100,
      sprink: 150,
      stanPipWo: 200,
      relPum: 100,
      aptLoad: 140,
      highRise: 360
    },
    lossConst = {
      elup: 5,
      elDn: -5,
      appl: 10,
      stanPip: 25,
      monDek: 25,
      bliz: 20
    },
    hose = {
      one34: 12,
      two12: 2,
      five: .08
    };
  let drpDnItmVal = [],
    total = 0,
    engPress = 0,
    hoseLength = 0,
    Coefficient = 0,
    frictionLoss = 0,
    GPM = '';

  $('.dropdown-item').on('click', function() {
    let drpDnItm = $(this).prop('id'),
      thisDrpDnItmVal = $(this).html(),
      dad = $(this).parent().prev().prop('id');
    drpDnItmVal.push(thisDrpDnItmVal + "<br>");
    let press;
    console.log(drpDnItm);

    if (dad == 'dropdownMenuButtonPC') {
      console.log(dad);
      for (key in presConst) {
        if (drpDnItm == key) {
          press = presConst[key];

        }
      }
    };

    if (dad == 'dropdownMenuButtonFL') {
      console.log(dad);
      for (key in lossConst) {
        if (drpDnItm == key) {
          press = lossConst[key];
          console.log(lossConst);
        }
      }
    };

    if (dad == 'dropdownMenuButtonHS') {
      console.log(dad);
      for (key in hose) {
        if (drpDnItm == key) {
          Coefficient = hose[key];
          console.log(Coefficient);
          if (key == 'one34' || key == 'two12') {
            hoseLength += 50;
            console.log(hoseLength);
          } else if (key == 'five') {
            hoseLength += 100;
          }
        }
      }
    };

    if (dad == 'dropdownMenuButtonGPM') {
      GPM = thisDrpDnItmVal.replace(/GPM/, '');
      console.log(GPM);

    };
    console.log(hoseLength);

    frictionLoss = Coefficient * (+GPM / 100)^2 * (+hoseLength / 100);
    console.log(frictionLoss, Coefficient, hoseLength);
    engPress += press;
    $('#EP').html(engPress);
    $('#whats').html(drpDnItmVal);


  });

});
/*FL = C * (Q / 100) ^2 * L / 100

FL = Friction loss in PSI
C = Friction loss Coefficient
Q = Flow rate in GPM
L = Hose length
*/
