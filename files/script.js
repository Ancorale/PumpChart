$(document).ready(function() {
  `use strict`;
  const preConst = {
      masStr: 80,
      smBorHan: 50,
      fogNoz: 100,
      sprink: 150,
      stanPipWo: 200,
      relPum: 100,
      aptLoad: 140,
      highRise: 360,
      elUp: 5,
      elUp10: 50,
      elDn: -5,
      appl: 10,
      stanPip: 25,
      monDek: 25,
      bliz: 20
    },
    aptLoad = {
      t11: 70,
      t11s: 100,
      t16: 65,
      t17: 70,
      t17s: 100,
      t18: 50,
      t18s: 50,
      t22: 65
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
    engPress = 0,
    hoseLength = 0,
    coefficient = 0,
    frictionLoss = 0,
    press = 0,
    GPM = ``,
    HD = 0,
    aerial,
    FL;

  $(`.dropdown-item`).on(`click`, function() {
    let drpDnItm = $(this).prop(`id`),
      dataText = $(this).attr('data-text'),
      thisDrpDnItmVal = $(this).html(),
      dad = $(this).parent().prev().prop(`id`);
    //console.log(`dataText: ` + dataText);
    //console.log(`drpDnItm: ` + drpDnItm);
    //console.log(`thisDrpDnItmVal: ` + thisDrpDnItmVal);
    if (!dataText) {
      dataText;
    } else {
      dataText = dataText.replace(/~/g, "<br>");
      $('#EP').html('0');
    }

    drpDnItmVal.push(thisDrpDnItmVal + `<br>`);

    switch (drpDnItm) {
      case `stanPipWo`:
        $(`#EP`).html(`200 PSI Max Standpipe w&sol;o Pump`);
        break;
      case `highRise`:
        $(`#EP`).html(`360 PSI Max High Rise Pumping`);
        break;
      default:

        for (i in preConst) {
          if (drpDnItm == i) {
            //console.log(`preConst: ` + i);
            engPress += preConst[i];
          }
        }

        for (i in aptLoad) {
          if (drpDnItm == i) {
            //console.log(`aptLoad: ` + i);
            engPress += aptLoad[i];
            aerial = aptLoad[i] + ` PSI-`;
          }
        }

        for (i in coeff) {
          if (drpDnItm == i) {
            coefficient = coeff[i];
            //console.log(`coefficient: ` + i);
            if (i == `one`) {
              hoseLength += 150;
              HosDia(thisDrpDnItmVal);
            } else if (i == `one34` || i == `two12` || i == `one18` || i == `one14`) {
              hoseLength += 50;
              HosDia(thisDrpDnItmVal);
            } else {
              hoseLength += 100;
              HosDia(thisDrpDnItmVal);
            }
          }
        }

        if (dad == `dropdownMenuButtonGPM` || dad == `dropdownMenuButtonAL`) {
          GPM = parseInt(thisDrpDnItmVal, 10);
        }

        //console.log(`aerial: ` + aerial);
        //console.log(`co: ` + coefficient);
        //console.log(`gpm: ` + GPM);
        //console.log(`hose: ` + hoseLength);

        frictionLoss = FricLoss(coefficient, GPM, hoseLength);
        let AFL = parseInt(aerial, 10);
        finalEP = Math.ceil(engPress + frictionLoss);
        //console.log(`finalEP: ` + finalEP + ` ` + typeof(finalEP));
        //console.log(`diam: ` + diam);
        //console.log(`finalEP: ` + finalEP + ` ` + typeof(finalEP));

        $(`#FL`).html(`FL ` + Math.round(FL / 5) * 5) + AFL;
        $(`#HD`).html(HD);
        $(`#HL`).html(hoseLength);
        $(`#gpm`).html(GPM + ` GPM`);
        $(`#EP`).html(finalEP);

        if (dataText) {
          $('#whats').html(dataText);
        } else if (!aerial) {
         $(`#whats`).html(drpDnItmVal);
        } else {
          $(`#whats`).html(aerial + drpDnItmVal);
        }

        //console.log(`HD; ` + HD);
        if (drpDnItm == `nine5a` || drpDnItm == `one25a` || drpDnItm == `one50a` || drpDnItm == `two00a`) {
          //console.log(`nine5a: ` + drpDnItm);
          first = FricLoss(12, GPM, hoseLength += 100) + 100;
          console.log(`co: ` + coefficient);
          console.log(`gpm: ` + GPM);
          console.log(`hose: ` + hoseLength);
          secnd = FricLoss(12, GPM, hoseLength += 200) + 100;
          console.log(`co: ` + coefficient);
          console.log(`gpm: ` + GPM);
          console.log(`hose: ` + hoseLength);
          $(`#EP`).html(`Apt. Load ` + first + `/` + secnd);
//// FIXME:
        }

        if (HD == `5"` && finalEP >= 185) {
          $(`#EP`).html(`185 PSI Operating Pressure Exceed at ` + finalEP + ` PSI`).addClass(`flashWite`);
        } else if (finalEP >= 365) {
          $(`#EP`).html(`365 PSI Operating Pressure Exceed at ` + finalEP + ` PSI`).addClass(`flashWite`);
        }

    //functions
        function HosDia(val) {
          dig1 = val.charAt(2);
          dig2 = val.charAt(3);
          HD = dig1 + dig2;
        }

        function FricLoss(C, Q, L) {
          FL = C * Math.pow((Q / 100), 2) * L / 100;
          //console.log(`FL: ` + FL);
          return Math.ceil(FL / 5) * 5;
        }
    }
  });

  $(`#highRise`).on(`click`, function() {
    $(`#HL`).html(`150`);
    $(`#HD`).html(`2&frac12;`);
    $(`#gpm`).html(`256` + ` GPM`);
    $(`#EP`).html(`75`);
    $(`#whats`).html(`High-Rise Hose Pack`);
  });

});
