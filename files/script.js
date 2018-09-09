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
      highRiseHose: 360,
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
      one: 130,
      one18: 105,
      one14: 80,
      one34: 12,
      one341: 12,
      one342: 12,
      two12: 2,
      two121: 2,
      two122: 2,
      five: .08,
      // special appliances
      siam: .5,
      triam: .22
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
      dad = $(this).parent().prev().prop(`id`),
      thisDrpDnItmVal = $(this).html();
    //console.log(`dataText: ` + dataText);
    console.log(`drpDnItm: ` + drpDnItm);
    //console.log(`drpDnItmVal: ` + typeof(drpDnItmVal));
    //console.log(`thisDrpDnItmVal: ` + typeof(thisDrpDnItmVal));

    // add line break
    drpDnItmVal.push(thisDrpDnItmVal + `<br>`);


    // standpipe max alert
    switch (drpDnItm) {
      case `stanPipWo`:
        $(`#EP`).html(`200 PSI Max Standpipe w&sol;o Pump`);
        break;
      case `highRiseHose`:
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
        for (x in airFL) {
          if (drpDnItm == x) {
            //console.log(`airFL: ` + i);
            engPress += airFL[x];
            aerial = airFL[x] + ` PSI-`;
            $(`#EP`).html(airFL);
          }
        }

        // convert aerial to integer
        let AFL = parseInt(aerial);

        if (dataText) {
          /*
          if foam,
          add foam text,
          add line breaks
          */
          dataText = dataText.replace(/~/g, `<br>`);
          $('#botBox').html(dataText);
        }

        /*
        if no aerial fricion Loss,
        output item id
        */
        if (typeof(aerial) == `undefined`) {
          //console.log(`drpDnItmVal: ` + drpDnItmVal);
          $('#whats').html(drpDnItmVal);
        } else {
          /*
          if aerial fricion Loss,
          output aerial friction loss
           and add item id
            */
          $('#whats').html(aerial + drpDnItmVal);
          //console.log(`drpDnItmVal + A: ` + drpDnItmVal);
        }

        /*
        loops through coefficient array,
        adds hoseLength
        and runs HosDia function to output hose size text
        */
        for (i in coeff) {
          if (drpDnItm === i) {
            coefficient = coeff[i];
            if (i === `one`) {
              hoseLength += 150;
              HosDia(thisDrpDnItmVal);
            } else if (i === `one342` || i === `two122`) {
              hoseLength += 200;
              HosDia(thisDrpDnItmVal);
            } else if (i === `one34` || i === `two122` || i === `one18` || i === `one14`) {
              hoseLength += 50;
              HosDia(thisDrpDnItmVal);
            } else {
              hoseLength += 100;
              HosDia(thisDrpDnItmVal);
            }
          }
        }

        // get gpm from button and convert to integer
        if (dad == `dropdownMenuButtonGPM` || dad == `dropdownMenuButtonAL`) {
          GPM = parseInt(thisDrpDnItmVal);
        }

        // run FricLoss function
        frictionLoss = FricLoss(coefficient, GPM, hoseLength);

        // round up and add to find final engine pressure
        finalEP = Math.ceil(engPress + frictionLoss);

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

        // max operating pressure alert
        if (HD == `5"` && finalEP >= 185) {
          $(`#EP`).html(`185 PSI Operating Pressure Exceed at ` + finalEP + ` PSI`).addClass(`flashWite`);
        } else if (finalEP >= 365) {
          $(`#EP`).html(`365 PSI Operating Pressure Exceed at ` + finalEP + ` PSI`).addClass(`flashWite`);
        }

        // apartment load
          switch (hoseLength) {
            case 50:
              switch (drpDnItm) {
                case `nine5a`:
                  finalEP = `115&sol;115`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one25a`:
                  finalEP = `120&sol;125`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one50a`:
                  finalEP = `130&sol;135`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `two00a`:
                  finalEP = `155&sol;175`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
              }
              break;
            case 100:
              switch (drpDnItm) {
                case `nine5a`:
                  finalEP = `115&sol;120`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one25a`:
                  finalEP = `125&sol;135`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one50a`:
                  finalEP = `135&sol;145`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `two00a`:
                  finalEP = `160&sol;190`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
              }
              break;
            case 200:
              switch (drpDnItm) {
                case `nine5a`:
                  finalEP = `115&sol;125`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one25a`:
                  finalEP = `125&sol;145`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one50a`:
                  finalEP = `135&sol;165`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `two00a`:
                  finalEP = `165&sol;225`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
              }
              break;
            case 300:
              switch (drpDnItm) {
                case `nine5a`:
                  finalEP = `120&sol;135`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one25a`:
                  finalEP = `130&sol;160`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one50a`:
                  finalEP = `140&sol;180`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `two00a`:
                  finalEP = `175&sol;255`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
              }
              break;
            case 400:
              switch (drpDnItm) {
                case `nine5a`:
                  finalEP = `120&sol;140`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one25a`:
                  finalEP = `135&sol;170`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one50a`:
                  finalEP = `145&sol;200`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `two00a`:
                  finalEP = `180&sol;285`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
              }
              break;
            case 500:
              switch (drpDnItm) {
                case `nine5a`:
                  finalEP = `120&sol;150`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one25a`:
                  finalEP = `135&sol;180`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `one50a`:
                  finalEP = `150&sol;220`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                case `two00a`:
                  finalEP = `190&sol;320`;
                  Outputs(HD, hoseLength, GPM, finalEP);
                  break;
                  default:
              }
              break;

            default:
          }
        //console.log(`aerial: ` + aerial);
        //console.log(`co: ` + coefficient);
        //console.log(`gpm: ` + GPM);
        //console.log(`hose: ` + hoseLength);


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

        function Outputs(HD, hoseLength, GPM, finalEP) {
          // output hose size
          $(`#HD`).html(HD);

          // output hose length
          $(`#HL`).html(hoseLength);

          // output gpm
          $(`#gpm`).html(GPM + ` GPM`);

          // output final engine pressure
          $(`#EP`).html(finalEP);
          $('#whats').html(`Apartment Load`);
        }
    }
  });

  // high-rise hose pack button
  $(`#highRiseHose`).on(`click`, function() {
    //console.log(`highRise: ` + highRise);
    $(`#HL`).html(`150`);
    $(`#HD`).html(`2&frac12;`);
    $(`#gpm`).html(`256` + ` GPM`);
    if (typeof(finalEP) == `undefined`) {
      $(`#EP`).html(`75`);
    } else {
      finalEP += 75;
      $(`#EP`).html(finalEP);
      $(`#whats`).html(drpDnItmVal + `High-Rise Hose Pack`);
    }
  });

});
