anychart.onDocumentReady(function() {
  let div = document.querySelector("#imageContainer");
  let img = document.querySelector("#image");
  let imageText = document.querySelector("#imageText");
  div.style.display = "none";

  let faves = [];

  var map = anychart.map();
  map.geoData(anychart.maps.world);

  // set the series
  var series = map.choropleth(data);

  // disable labels
  series.labels(false);
  series.hovered().fill({
    src:
      "https://i.etsystatic.com/16020864/d/il/2540e3/1862738313/il_340x270.1862738313_dama.jpg?version=0",
    mode: "stretch",
    opacity: 0.8
  });

  //trying to make chloropleth colors and classes want to change color still
  ordinalScale = anychart.scales.ordinalColor([
    { from: 1, to: 200 },
    { from: 201, to: 300 },
    { from: 301, to: 400 },
    { from: 401, to: 500 },
    { from: 501, to: 602 },
    { greater: 602 }
  ]);

  series.colorScale(anychart.scales.ordinalColor([{less:200,color:'#cfcfcf'},{from:200, to:300, color:'#359149'},{from:301, to:400, color:'#006eff'},{greater:401, color:'#ff0000'}]));

 // ordinalScale.colors([
 //   "#ffffff",
 //   "#ffe9da",
 //   "#f7c290",
 //   "#ffa047",#cfcfcfvalu
 //   "#ff822f",
 //   "#ff6600"
 // ]);

  var cr = map.colorRange(true);

  //figure out colors?
  //#blah {   // "#f0c6aa" lightest, "#f7ac7a", "#f78a41", "#fc7115", "883d0c" ; #f0c6aa", "883d0c darkest"
  //background-color: #883d0c;  darkest
  //background-color: #fc7115;
  ///background-color: #f78a41;
  //background-color: #f7ac7a;
  //background-color: #f0c6aa; lightest

  //end of trying to make chloropleth colors and classes

 // series.colorScale(anychart.scales.linearColor("#ffffff", "#ff6600"));

  // set the container
  map.container("container");
  map.draw();
  map.unboundRegions().fill("#eee");

  map.listen("pointsselect", function(event) {
    if (event.currentPoint.selected) {
      let index = event.currentPoint.index;
      //need to change image based on id
      faves.candidate = data[index].id;
      img.style.display = "block";
      img.src = data[index].img || "https://via.placeholder.com/150";
      imageText.style.display = "block";
      imageText.innerText = data[index].imageText || "No text yet"; ///ask for help
    }
  });

  map.listen("dblclick", function() {
    let save = confirm(
      `so you want to save ${faves.candidate} to your list of faves?`
    );
    if (save) faves.push(faves.candidate);
    delete faves.candidate;
    console.log("your favorite countries are:", faves);
  });

  map.listen("mouseover", function(event) {
    // need to make event discover the id
    let { clientX, clientY } = event;
    div.style.display = "block";
    div.style.top = `${clientY}px`;
    div.style.left = `${clientX}px`;

    // start listening to the mouse movements
    map.listen("mousemove", trackTheMouse);
  });

  map.listen("mouseout", function(event) {
    // stop listening to mousemovents
    img.style.display = "none";
    imageText.style.display = "none";
    div.style.display = "none";
    map.unlisten("mousemove", trackTheMouse);
  });

  map.listen("mousemove", trackTheMouse);

  function trackTheMouse({ clientX, clientY }) {
    div.style.top = `${clientY + 80}px`;
    div.style.left = `${clientX + 10}px`;
  }
});

var data = [
  {
    id: "US",
    value: 201,
    img: "img/basic.png",
    imageText:
      "Free",
  }, // fill:{color: 'red', opacity: '.7'}, hatchFill:{hatchType:'diagonal-brick',color: 'gray'}, marker:{type:'star5', fill:'gold', size: 12, enabled: true}, hoverMarker: {size: 22}},
  {
    id: "IL",
    value: 301,
    img: "img/basic.png",
    imageText:
    "Partly free",
  }, //israel
  {
    id: "AF",
    value: 0,
    img: "img/basic.png",
    imageText:
    "not tested",
  }, //afghanistan img: imageText: img: imageText: img: imageText: img: imageText:
  {
    id: "AO",
    value: 0,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested",
  }, //angola
  {
    id: "AU",
    value: 0,
    img:
      "img/TCP.png",
    imageText:
      "the five countries observed to censor the most URLs using TCP"
  }, //australia
  {
    id: "AL",
    value: 0,
    img: "img/basic.png",
    imageText:
    "not tested",}, //albania
  {
    id: "AE",
    value: 0,
    img: "img/basic.png",
    imageText:
    "not tested",}, //United Arab Emirates"
  {
    id: "AR",
    value: 0,
    img: "img/basic.png",
    imageText:
    "not tested",}, //argentinia
  {
    id: "AM",
    value: 1,
    img: "img/basic.png",
    imageText:
    "not tested", }, //Armenia
  { id: "TF" },
  {
    id: "AT",
    value: 203,
    img: "img/basic.png",
    imageText:
    "Free", }, //austria
  {
    id: "AZ",
    value: 5,
    img: "img/basic.png",
    imageText:
    "not tested",}, //azer
  {
    id: "BI",
    value: 8,
    img: "img/basic.png",
    imageText:
    "not tested",}, //burundi
  {
    id: "BE",
    value: 208,
    img: "img/basic.png",
    imageText:
    "Free", }, //belgium
  {
    id: "BJ",
    value: 8,
    img: "img/basic.png",
    imageText:
    "not tested",}, //benin

  { id: "Cyprus_U.N._Buffer_Zone", value: 83 }, //cyprus
  {
    id: "BF",
    value: 1,
    img: "img/basic.png",
    imageText:
    "not tested",}, //burkina faso
  {
    id: "BD",
    value: 3,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //bangladesh
  {
    id: "BG",
    value: 301,
    img: "img/basic.png",
    imageText:
    "Partly free", }, //bulgaria
  {
    id: "BA",
    value: 3,
    img: "img/basic.png",
    imageText:
    "not tested", }, //bosnia
  {
    id: "BY",
    value: 34,
    img: "img/basic.png",
    imageText:
    "not tested", }, //belarus
  {
    id: "BZ",
    value: 206,
    img: "img/basic.png",
    imageText:
    "Free",  }, //belize
  {
    id: "NZ",
    value: 204,
    img: "img/basic.png",
    imageText:
    "Free", }, //newzealand
  {
    id: "BO",
    value: 1,
    img: "img/basic.png",
    imageText:
    "not tested",   
  }, //bolivia
  {
    id: "BR",
    value: 301,
    img: "img/basic.png",
    imageText:
    "Partly free", }, //brazil
  {
    id: "BN",
    value: 4,
    img: "img/basic.png",
    imageText:
    "not tested",}, //brunei
  { id: "BT", value: 1 }, //bhutan
  {
    id: "BW",
    value: 28,
    img: "img/basic.png",
    imageText:
    "not tested", }, //botswana
  {
    id: "CF",
    value: 16,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //Cen===tral African Republic
  {
    id: "CA",
    value: 203,
    img: "img/basic.png",
    imageText:
    "Free",   marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      userType: 1,
      enabled: true
    }
  }, //canada
  {
    id: "CH",
    value: 81,
    img: "img/basic.png",
    imageText:
    "not tested",  
  }, //Switzerland
  {
    id: "CL",
    value: 203,
    img: "img/basic.png",
    imageText:
    "Free",  }, //chile
  {
    id: "CN",
    value: 500,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "Not free", }, //china
  {
    id: "CI",
    value: 66,
    img: "img/basic.png",
    imageText:
    "not tested", }, //COte d'Ivoire
  {
    id: "CM",
    value: 1,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //cameroon
  {
    id: "CD",
    value: 29,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //dr congo
  {
    id: "CG",
    value: 27,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //congo
  {
    id: "CO",
    value: 301,
    img: "img/basic.png",
    imageText:
    "Partly free",  }, //colombia
  {
    id: "CR",
    value: 274,
    img: "img/basic.png",
    imageText:
    "Free", }, //costa rica
  {
    id: "CU",
    value: 10,
    img: "img/basic.png",
    imageText:
    "not tested", }, //cuba
  { id: "CY", value: 74 }, //cyprus
  {
    id: "CZ",
    value: 205,
    img: "img/basic.png",
    imageText:
    "Free", }, //czech republic
  { id: "DJ", value: 66 }, //dijiboouiti
  {
    id: "DK",
    value: 203,
    img: "img/basic.png",
    imageText:
    "Free",  }, //denmark
  {
    id: "DO",
    value: 28,
    img: "img/basic.png",
    imageText:
    "not tested",   
  }, //Dominican Republic
  {
    id: "DZ",
    value: 301,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "Partly Free",  }, //algeria
  {
    id: "EC",
    value: 22,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //ecudor
  {
    id: "EG",
    value: 16,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested",  }, //egypt
  {
    id: "ER",
    value: 16,
  }, //eritirea SUCKS for data slash
  {
    id: "ES",
    value: 206,
    img: "img/basic.png",
    imageText:
    "Free",    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    }
  }, //spain
  {
    id: "EE",
    value: 15,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //estonia
  {
    id: "ET",
    value: 500,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not free", }, //ethiopia
  {
    id: "FI",
    value: 51,
    img: "img/basic.png",
    imageText:
    "not tested",    
  }, //finland
  { id: "FJ", value:201 }, //fiji
  {
    id: "FR",
    value: 206,
    img: "img/basic.png",
    imageText:
    "Free", }, //france
  {
    id: "GA",
    value: 11,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested", }, //gabon
  {
    id: "GB",
    value: 201,
    img: "img/basic.png",
    imageText:
    "free", }, //great britian
  {
    id: "GE",
    value: 28,
    img: "img/basic.png",
    imageText:
    "not tested", }, //georgia
  {
    id: "GH",
    value: 51,
    img: "img/basic.png",
    imageText:
    "not tested", }, //ghana
  {
    id: "GN",
    value: 25,
    img: "img/basic.png",
    imageText:
    "not tested", }, //guinea
  {
    id: "GW",
    value: 97,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //Guinea-Bissau
  {
    id: "GR",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free,"  }, //greece
  {
    id: "GT",
    value: 11,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //guatamala
  {
    id: "GY",
    value: 23,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //guyana
  {
    id: "HN",
    img: "img/basic.png",
    imageText:
    "not tested",  }, //honduras
  {
    id: "HR",
    value: 78,
    img: "img/basic.png",
    imageText:
    "not tested", }, //croatia
  {
    id: "HT",
    value: 96,
    img: "img/basic.png",
    imageText:
    "not tested", }, //haiti
  {
    id: "HU",
    value: 203,
    img: "img/basic.png",
    imageText:
    "free",  }, //hungary
  {
    id: "ID",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free",  }, //indonesia
  {
    id: "IN",
    value: 301,
    hatchFill: { hatchType: "diagonal-brick", color: "gray" },
    img:
      "img/india.png",
    imageText:
      "in the five countries censoring the most URLs OVERALL",
  }, //india
  {
    id: "IE",
    value: 78,
    img: "img/basic.png",
    imageText:
    "not tested",   marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    }
  }, //ireland
  {
    id: "IQ",
    value: 12,
    img: "img/basic.png",
    imageText:
    "not tested", }, //iraq
  {
    id: "IS",
    value: 207,
    img: "img/basic.png",
    imageText:
    "free",  }, //iceland
  {
    id: "IT",
    value: 98,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //italy
  {
    id: "JO",
    value: 17,
    img: "img/basic.png",
    imageText:
    "not tested", }, //jordan
  {
    id: "JP",
    value: 201,
    img:
      "img/TCP.png",
    imageText:
      "the five countries observed to censor the most URLs using TCP"
  }, //japan
  {
    id: "KZ",
    value: 16,
    img: "img/basic.png",
    imageText:
    "not tested", }, //kazakhstan
  {
    id: "KE",
    value: 208,
    hatchFill: { hatchType: "diagonal-brick", color: "gray" },
    img:
      "img/kenya.png",
    imageText:
      "in the five countries censoring the most URLs OVERALL",
  }, //kenya
  {
    id: "KG",
    value: 11,
    img: "img/basic.png",
    imageText:
    "not tested", }, //kyrgyzstan
  {
    id: "KH",
    value: 16,
    img: "img/basic.png",
    imageText:
    "not tested", }, //cambodia
  {
    id: "KR",
    value: 301,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    hatchFill: { hatchType: "diagonal-brick", color: "gray" },
    img:
      "img/sk.png",
    imageText:
      "in the five countries censoring the most URLs"
  }, //south korea
  { id: "KW", value: 17 }, //kuwait
  {
    id: "LA",
    value: 119,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //laos
  { id: "LB", value: 16 }, //lebanaon
  {
    id: "LR",
    value: 47,
    img: "img/basic.png",
    imageText:
    "not tested", }, //liberia
  {
    id: "LY",
    value: 99,
    img: "img/basic.png",
    imageText:
    "not tested", }, //libya
  {
    id: "LK",
    value: 94,
    img: "img/basic.png",
    imageText:
    "not tested", }, //sri lanka
  {
    id: "Kosovo",
    value: 95,
    img: "img/basic.png",
    imageText:
    "not tested", }, //lol
  { id: "LS", value: 92 }, //lesotho
  {
    id: "LT",
    value: 203,
    img: "img/basic.png",
    imageText:
    "not tested", }, //lihtuania
  {
    id: "LV",
    value: 15,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //latvia
  {
    id: "MA",
    value: 301,
    img: "img/basic.png",
    imageText:
    "Partly free", }, //morocco
  { id: "MD", value: 22 }, //moldova
  {
    id: "MG",
    value: 82,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //Madagascar
  {
    id: "MX",
    value: 301,
    img: "img/basic.png",
    imageText:
    "Partly free",  }, //mexico
  {
    id: "MK",
    value: 16,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //Macedonia
  {
    id: "ML",
    value: 33,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested", }, //mali
  {
    id: "MM",
    value: 15,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //myanmar
  {
    id: "ME",
    value: 10,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //montennegro
  {
    id: "MN",
    value: 1,
    img: "img/basic.png",
    imageText:
    "not tested", }, //Mongolia
  {
    id: "MZ",
    value: 61,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested",  }, //Mozambique
  {
    id: "MR",
    value: 46,
    img: "img/basic.png",
    imageText:
    "not tested",}, //mauritania
  {
    id: "MW",
    value: 80,
    img: "img/basic.png",
    imageText:
    "not tested", }, //malawi
  {
    id: "MY",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free",  }, //malaysia
  {
    id: "NA",
    value: 25,
    img: "img/basic.png",
    imageText:
    "not tested", }, //nambia
  {
    id: "NE",
    value: 53,
    img: "img/basic.png",
    imageText:
    "not tested", }, //niger
  {
    id: "NG",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free", }, //nigeria
  { id: "NC", value: 25 }, //New Caledonia
  { id: "NENG", 
  value: 53,
  img: "img/basic.png",
  imageText:
  "not tested", }, //Niger
  {
    id: "NI",
    value: 26,
    img: "img/basic.png",
    imageText:
    "not tested", }, //nicaragua
  {
    id: "NO",
    value: 203,
    img: "img/basic.png",
    imageText:
    "free",}, //norway
  {
    id: "NP",
    value: 65,
    img: "img/basic.png",
    imageText:
    "not tested", }, //nepal
  {
    id: "OM",
    value: 36,
    img: "img/basic.png",
    imageText:
    "not tested", }, //oman
  {
    id: "PK",
    value: 43,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //pakistan
  {
    id: "PA",
    value: 39,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //panama
  {
    id: "IR",
    value: 500,
    img:
      "img/iran.png",
    imageText:
      "the five countries censoring the most URLs OVERALL",
    hatchFill: { hatchType: "diagonal-brick", color: "gray" }
  }, //iran
  {
    id: "PE",
    value: 301,
    img:
      "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_675,w_1200,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1493051962/articles/2011/12/19/inside-joran-van-der-sloot-s-prison-in-peru/van-der-sloot-prison-tour-zarate-tease_xcyp3o",
    imageText:
      "Sarita Colonia Prison, Callao district, Lima. A cell designed to hold four people can end up housing 15 inmates. Prisoners who cannot find room in the cell have to sleep on mattresses in the corridors.",
  }, //peru
  {
    id: "SY",
    value: 60,
    img: "img/basic.png",
    imageText:
    "not tested", }, //syria
  {
    id: "PH",
    value: 16,
    img: "img/basic.png",
    imageText:
    "not tested", }, //philipphinesv
  {
    id: "KP",
    value: 60,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //NORTH KOREA OYOOOOO
  {
    id: "NL",
    value: 201,
    img: "img/basic.png",
    imageText:
    "free", }, //netherlands
  {
    id: "DE",
    value: 75,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //germmany
  {
    id: "PG",
    value: 63,
    img: "img/basic.png",
    imageText:
    "not tested", }, //papa new guinea
  {
    id: "PL",
    value: 204,
    img: "img/basic.png",
    imageText:
    "free",  }, //poland
  { id: "PR", value: 33 }, //puerto rico
  {
    id: "RO",
    value: 201,
    img: "img/basic.png",
    imageText:
    "free", }, //romania
  { id: "PRI", value: 1 }, //Puerto Rico"
  {
    id: "PT",
    value: 207,
    img: "img/basic.png",
    imageText:
    "free",}, //portugal
  {
    id: "PY",
    value: 19,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //paraguay
  {
    id: "PS",
    img: "img/basic.png",
    imageText:
    "partly free",    value: 301,
      }, //Palestine
  {
    id: "QA",
    value: 53,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //qatar
  { id: "RW", value: 44 }, //rwanda
  {
    id: "EH",
    value: 203,
    img: "img/basic.png",
    imageText:
    "not tested", }, //Western Sahara
  {
    id: "SA",
    value: 500,
    hatchFill: { hatchType: "diagonal-brick", color: "gray" },
    img:
      "img/saudi.png",
    imageText:
      "in the five countries censoring the most URLs OVERALL",
  }, //saudi arabia
  {
    id: "SD",
    value: 52,
    img: "img/basic.png",
    imageText:
    "not tested", }, //sudan
  {
    id: "SS",
    value: 52,
    img: "img/basic.png",
    imageText:
    "not tested", }, //south sudan
  {
    id: "SN",
    value: 76,
    img: "img/basic.png",
    imageText:
    "not tested", }, //senegal
  {
    id: "SL",
    value: 58,
    img: "img/basic.png",
    imageText:
    "not tested", }, //sierra leone
  {
    id: "SO",
    value: 20,
    img: "img/basic.png",
    imageText:
    "not tested", }, //somalia
  {
    id: "RS",
    value:301,
    img: "img/basic.png",
    imageText:
    "partly free", }, //serbia
  {
    id: "SK",
    value: 201,
    img: "img/basic.png",
    imageText:
    "free",  }, //slovakia
  {
    id: "SR",
    value: 18,
    img: "img/basic.png",
    imageText:
    "not tested", }, //suriname
  {
    id: "SI",
    value: 64,
    img: "img/basic.png",
    imageText:
    "not tested", }, //slovenia
  {
    id: "SE",
    value: 209,
    img: "img/basic.png",
    imageText:
    "free", }, //sweden
  { id: "SZ", value: 22 }, //swaziland
  { id: "SV", value: 64 },
  {
    id: "TD",
    value: 59,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested", }, //chad
  {
    id: "TG",
    value: 64,
    img: "img/basic.png",
    imageText:
    "not tested",  }, //togo
  {
    id: "TH",
    value: 56,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not tested", }, //thailand
  {
    id: "TJ",
    value: 11,
    img: "img/basic.png",
    imageText:
    "not tested", }, //Tajikistan
  {
    id: "TM",
    value: 52,
    img: "img/basic.png",
    imageText:
    "not tested", }, //turkministan
  { id: "TL", value: 51 }, //east timior
  {
    id: "TN",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free",  }, //tunisia
  {
    id: "TR",
    value: 500,
    img: "img/basic.png",
    imageText:
    "not free", }, //turkey
  {
    id: "TW",
    value: 205,
    img: "img/basic.png",
    imageText:
    "free",  }, //taiwan
  {
    id: "TZ",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free", }, //tanzania
  {
    id: "UG",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free",
      marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    }
  }, //uganda
  {
    id: "UA",
    value: 301,
    img: "img/basic.png",
    imageText:
    "partly free",  }, //ukraine
  {
    id: "UY",
    value: 31,
    img: "img/basic.png",
    imageText:
    "not tested", }, //uruguay
  {
    id: "UZ",
    value: 10,
    img: "img/basic.png",
    imageText:
    "not tested", }, //uzbekistan
  {
    id: "VE",
    value: 500,
    img: "img/basic.png",
    imageText:
    "not free", }, //venezuala
  {
    id: "VN",
    value: 500,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "not free", }, //vietnam
  {
    id: "YE",
    value: 53,
    img: "img/basic.png",
    imageText:
    "not tested", }, //yemen
  {
    id: "ZA",
    value: 201,
    marker: {
      type: "star5",
      fill: "gold",
      size: 12,
      enabled: true
    },
    img: "img/basic.png",
    imageText:
    "free",  }, //south africa
  {
    id: "ZM",
    value: 16,
    img: "img/basic.png",
    imageText:
    "not tested", }, //zambia
  {
    id: "ZW",
    value: 10,
    img: "img/basic.png",
    imageText:
    "not tested", }, //Zimbabwe
  {
    id: "RU",
    value: 500,
    hatchFill: { hatchType: "diagonal-brick", color: "gray" },
    img: "img/russia.png",
    imageText:
      "in the five countries censoring the most URLs Per-Country Sensitive"
  }, //russia
  {
    id: "GL",
    value: 0,
    img: "img/basic.png",
    imageText:
    "not tested",  
  } //greenland
];

// set the fill for the regions you haven't defined in the dataSet

