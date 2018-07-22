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
      elup10: 50,
      elDn: -5,
      appl: 10,
      stanPip: 25,
      monDek: 25,
      bliz: 20
    },
    coeff = {
      one: 130,
      one18: 105,
      one14: 80,
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
    GPM = ``,
    FL =``;


  $(`.dropdown-item`).on(`click`, function() {
    let drpDnItm = $(this).prop(`id`),
      thisDrpDnItmVal = $(this).html(),
      dad = $(this).parent().prev().prop(`id`);
      //console.log(drpDnItm);
    drpDnItmVal.push(thisDrpDnItmVal + "<br>");

    switch (drpDnItm) {
      case `stanPipWo`:
        $(`#EP`).html("200 PSI Max Standpipe w&sol;o Pump");
        break;
      case `highRise`:
        $(`#EP`).html("360 PSI Max High Rise Pumping");
        break;

      default:

      for (key in preConst) {
        if (drpDnItm == key) {
          press = preConst[key];
          engPress += press;
        }
      }

      for (keyc in coeff) {
        if (drpDnItm == keyc) {
          coefficient = coeff[keyc];
          console.log(keyc);
          if (keyc == `one`) {
            hoseLength += 150;
          } else if (keyc == `one34` || keyc == `two12` || keyc == `one18` || keyc == `one14`) {
              hoseLength += 50;
          } else {
            hoseLength += 100;
          }
        }
      }


    if (dad == `dropdownMenuButtonGPM`) {
      GPM = parseInt(thisDrpDnItmVal, 10);
      //GPM = thisDrpDnItmVal.replace(/GPM/, ``);
      //GPM = +GPM;
    }

    //console.log(`co ` + coefficient);
    console.log(`gpm ` + GPM);
    //console.log(`hose ` + hoseLength);

    function fricLoss(C, Q, L) {
      FL = C * Math.pow((Q / 100), 2) * L / 100;
      console.log(FL);
      return Math.ceil(FL/5)*5;
    }
    frictionLoss = fricLoss(coefficient,GPM,hoseLength);

    //console.log(`press ` + press);


    $(`#FL`).html(`FL ` + Math.round(FL/5)*5);
    $(`#HL`).html(hoseLength);
    $(`#gpm`).html(GPM + ` GPM`);
    $(`#EP`).html(Math.ceil(engPress + frictionLoss));
    $(`#whats`).html(drpDnItmVal);

}

  });

});
