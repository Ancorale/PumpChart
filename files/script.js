$(document).ready(function() {
  `use strict`;
  const preConst = {
      // pressure constants
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
      //special appliances
      appl: 10,
      bliz: 20,
      stanPip: 25,
      monDek: 25
    },

    // aerial friction loss
    airFL = {
      t11: 70,
      t11s: 100,
      t16: 65,
      t17: 70,
      t17s: 100,
      t18: 50,
      t18s: 50,
      t22: 65
    },

    // hose size coefficient
    coeff = {
      siam: .5,
      triam: .22,
      one: 130,
      one18: 105,
      one14: 80,
      one34: 12,
      one341: 12,
      two12: 2,
      two121: 2,
      five: .08
    };

  // vaiable setup
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

  /*
  dropdown-item onClick event handler
  drpDnItm = id
  data-text = foam text
  thisDrpDnItmVal = html text
  dad = id of button
  */
  $(`.dropdown-item`).on(`click`, function() {
    let drpDnItm = $(this).prop(`id`),
      dataText = $(this).attr(`data-text`),
      thisDrpDnItmVal = $(this).html(),
      dad = $(this).parent().prev().prop(`id`);
    //console.log(`dataText: ` + dataText);
    //console.log(`drpDnItm: ` + drpDnItm);
    //console.log(`thisDrpDnItmVal: ` + thisDrpDnItmVal);



    // add line break
    drpDnItmVal.push(thisDrpDnItmVal + `<br>`);

    // standpipe max alert
    switch (drpDnItm) {
      case `stanPipWo`:
        $(`#EP`).html(`200 PSI Max Standpipe w&sol;o Pump`);
        break;
      case `highRise`:
        $(`#EP`).html(`360 PSI Max High Rise Pumping`);
        break;
      default:

        // add pressure constant to engine pressure
        for (i in preConst) {
          if (drpDnItm == i) {
            //console.log(`preConst: ` + i);
            engPress += preConst[i];
          }
        }

        // add aerial friction loss to engine pressure
        for (i in airFL) {
          if (drpDnItm == i) {
            //console.log(`airFL: ` + i);
            engPress += airFL[i];
            aerial = airFL[i] + ` PSI-`;
          }
        }

        // foam
        if (dataText) {
          dataText = dataText.replace(/~/g, `<br>`);
          //console.log(`dataText: ` + dataText);
          //console.log(typeof(dataText));
          $('#whats').html(dataText);
          $(`#EP`).html(`0`);
        } else if
        // aerial friction loss
        (typeof(aerial) == `undefined`) {
          console.log(`drpDnItmVal: ` + drpDnItmVal);
          $('#whats').html(drpDnItmVal);
        } else {
          $('#whats').html(aerial + drpDnItmVal);
          console.log(`drpDnItmVal + A: ` + drpDnItmVal);
        }

        /*
        loops through coefficient array,
        adds hoseLength
        and runs HosDia function to output hose size text
        */
        for (i in coeff) {
          if (drpDnItm == i) {
            coefficient = coeff[i];
            //console.log(`coefficient: ` + i);
          } else if (i == `siam` || `triam`) {
                coefficient = coeff[i];
                //console.log(`coefficient: ` + coefficient);
            } else if (i == `one`) {
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
        

        // get gpm from button and convert to integer
        if (dad == `dropdownMenuButtonGPM` || dad == `dropdownMenuButtonAL`) {
          GPM = parseInt(thisDrpDnItmVal);
        }

        //console.log(`aerial: ` + aerial);
        //console.log(`co: ` + coefficient);
        //console.log(`gpm: ` + GPM);
        //console.log(`hose: ` + hoseLength);

        // run FricLoss function
        frictionLoss = FricLoss(coefficient, GPM, hoseLength);

        // convert aerial to integer
        let AFL = parseInt(aerial);

        // round up and add to find final engine pressure
        finalEP = Math.ceil(engPress + frictionLoss);

        //console.log(`finalEP: ` + finalEP + ` ` + typeof(finalEP));
        //console.log(`diam: ` + diam);
        //console.log(`finalEP: ` + finalEP + ` ` + typeof(finalEP));

        /*
        round to 5,
        add aerial friction loss
        and output
        */
        $(`#FL`).html(`FL ` + Math.round(FL / 5) * 5) + AFL;

        // output hose size
        $(`#HD`).html(HD);

        // output hose length
        $(`#HL`).html(hoseLength);

        // output gpm
        $(`#gpm`).html(GPM + ` GPM`);

        // output final engine pressure
        $(`#EP`).html(finalEP);

        //console.log(`HD; ` + HD);

        // apartment load
        if (drpDnItm == `nine5a` || drpDnItm == `one25a` || drpDnItm == `one50a` || drpDnItm == `two00a`) {
          first = FricLoss(12, GPM, hoseLength += 100) + 100;
          console.log(`co: ` + coefficient);
          console.log(`gpm: ` + GPM);
          console.log(`hose: ` + hoseLength);
          secnd = FricLoss(12, GPM, hoseLength += 200) + 100;
          console.log(`co: ` + coefficient);
          console.log(`gpm: ` + GPM);
          console.log(`hose: ` + hoseLength);
          $(`#EP`).html(`Apt. Load ` + first + `/` + secnd);
        }

        // max operating pressure alert
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

  // high-rise hose pack button
  $(`#highRise`).on(`click`, function() {
    //console.log(`highRise: ` + highRise);
    $(`#HL`).html(`150`);
    $(`#HD`).html(`2&frac12;`);
    $(`#gpm`).html(`256` + ` GPM`);
    if (typeof(finalEP) == `undefined`) {
      $(`#EP`).html(`75`);
    } else {
      finalEP += 75;
      $(`#EP`).html(finalEP);
      $(`#whats`).html(thisDrpDnItmVal);
    }
    $(`#whats`).html(`High-Rise Hose Pack`);
  });
});
