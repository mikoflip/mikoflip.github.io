$(function(){
  var all_filled = false;
  var grid_size = [ 20, 24 ]

  for(var i = 0; i < grid_size[0]; i++){
    var row = $('<tr></tr>');
    for(var j = 0; j < grid_size[1]; j++){
      row.append('<td><input type="text" minlength="1" maxlength="1" size="2" class="cells" id="_' + i + '_' + j + '" disabled></input></td>');
    }
    $("#puzzle").append(row);
  }

  var grey = [ "_5_14", "_6_3", "_11_19", "_13_13", "_15_22", "_16_10", "_18_11" ];
  grey.forEach(id => $("#"+id).addClass("grey"));

  var crosswords = [
    [  0,  0,  6, 0, "herendienst"   , "verplichte dienst zonder betaling"                    ],
    [  1,  0, 14, 1, "nootmuskaat"   , "Molukse boom"                                         ],
    [  2,  1,  5, 1, "pandeling"     , "schuldslaaf"                                          ],
    [  3,  2, 13, 0, "foelie"        , "gedroogd zaadmantel van nootmuskaat"                  ],
    [  4,  4,  0, 0, "schildpad"     , "langzaam voortgaand dier"                             ],
    [  5,  6,  3, 0, "cultuurstelsel", "belasting systeem ingevoerd door Johannes den Bosch"  ],
    [  6,  6, 20, 1, "multatuli"     , "Eduard Douwes Dekker"                                 ],
    [  7,  7,  1, 1, "perkhorigen"   , "dwangarbeiders die op perken (plantage) moest werken" ],
    [  8,  8,  9, 1, "indonesie"     , "gordel van smaragd"                                   ],
    [  9,  8, 13, 0, "baboe"         , "Indisch dienstmeisje"                                 ],
    [ 10,  9, 12, 1, "rampokkers"    , "Indische rovers"                                      ],
    [ 11,  9, 22, 1, "hongersnood"   , "gebrek aan voedsel"                                   ],
    [ 12, 10,  9, 0, "damast"        , "weeftechniek"                                         ],
    [ 13, 11, 17, 0, "kartini"       , "eerste Indonesische feminist"                         ],
    [ 14, 13, 11, 0, "goud"          , "Aurum"                                                ],
    [ 15, 13, 17, 0, "knil"          , "Koninklijk Nederlands Indisch Leger (afk.)"           ],
    [ 16, 13, 18, 1, "njai"          , "inheems concubine"                                    ],
    [ 17, 14, 15, 1, "voc"           , "Verenigd Oost-Indisch Compagnie (afk.)"               ],
    [ 18, 16,  1, 0, "edelstenen"    , "kostbare gesteenten"                                  ],
    [ 19, 16, 12, 0, "educatie"      , "onderwijs"                                            ],
    [ 20, 18,  9, 0, "ereschuld"     , "morele verplichting"                                  ],
  ];

  crosswords.forEach(word => {
    var i = word[1], j = word[2];
    for(var k = 0; k < word[4].length; k++){
      $("#_"+i+"_"+j).attr("disabled", false).addClass("required").addClass("answer_"+word[0].toString());
      // $("#_"+i+"_"+j).attr("value", word[4][k]); //remove
      if(word[3] == 0) j++;
      else i++;
    }
  });

  $("[class*=answer_]").hover(function(){
    var names = this.className.split(/\s+/);
    names.forEach(name => {
      if(name.startsWith("answer_")){
        var id = name.split("answer_")[1];
        if(crosswords[id][3] == 0){
          $("#horizontal").text(crosswords[id][5]);
        } else {
          $("#vertical").text(crosswords[id][5]);
        }
      }
    });
  }, function(){
    $("#horizontal").text("");
    $("#vertical").text("");
  });

  $(".required").keyup(function(){
    var fields = $(".required");
    
    all_filled = true;
    for(var i = 0; i < fields.length; i++){
      if(fields[i].value == ""){
        all_filled = false;
      }
    }
    if(all_filled){
      var letters = [];
      grey.forEach(id => {
        letters.push($("#"+id).val());
      });

      $("#letters").html(letters.toString().replace(/,/g, " "));
      $("#canvas").fadeIn(2000);
    }
  });
  
  $("#back").click(function(){
    $("#canvas").hide();
    $("#correct").hide();
    $("#incorrect").hide();
  });

  $("#answer").click(function(){
    var answer = $("#solution").val();
    if(answer == "censuur"){
      $("#incorrect").hide();
      $("#correct").show();

      var x = Math.floor(Math.random() * 4) + 1;
      $(".images").delay(2000).fadeIn(5000);
      $("#image").attr("src", "./image"+x+".tiff");

    } else {
      $("#correct").hide();
      $("#incorrect").show();
    }
  });

});