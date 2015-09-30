$(document).ready(function(){

  //global variables
  var unoccupiedBlocks = [];
  var occupiedBlocks = [];
  var fixedBlocks = [];
  var numberOfRows = 10;
  var numberOfColumns = 10;
  var rowMovement;
  var columnMovement;

  //build grid
  for (var row = 1; row <= numberOfRows; row++){
    for (var column = 1; column <= numberOfColumns; column++){
      if (row < 10){
        rowCode = '0' + row;
      } else {
        rowCode = row;
      }
      if (column < 10){
        columnCode = '0' + column;
      } else {
        columnCode = column;
      };
      var blockCode = String(rowCode) + String(columnCode);
      unoccupiedBlocks.push(blockCode);
      $('.grid').append('<div class="block" id='+ blockCode + '></div>');
    };
  };

  //mark unoccupiedBlocks
  function markUnoccupied(){
    $('.block').removeClass('occupied');
    for (var i = 0; i < unoccupiedBlocks.length; i++){
      $('#' + unoccupiedBlocks[i]).addClass('unoccupied');
    };
  };

  //mark occupiedBlocks
  function markOccupied(){
    $('.block').removeClass('unoccupied');
    for (var i = 0; i < occupiedBlocks.length; i++){
      $('#' + occupiedBlocks[i]).addClass('occupied');
    };
    for (var i = 0; i < fixedBlocks.length; i++){
      $('#' + fixedBlocks[i]).addClass('fixed');
    };
  };

  //choose random unoccupiedBlock
  function chooseRandomBlock(){
    var random = Math.floor(Math.random() * unoccupiedBlocks.length);
    var randomBlock = unoccupiedBlocks[random];
    unoccupiedBlocks.splice(random, 1);
    occupiedBlocks.push(randomBlock);
  };


  function sortByColumnAscending(a, b){
    var aColumn = a % 100;
    var bColumn = b % 100;
    return aColumn > bColumn ? 1 : aColumn < bColumn ? -1 : 0;
  };

  function sortByColumnDescending(a, b){
    var aColumn = a % 100;
    var bColumn = b % 100;
    return aColumn < bColumn ? 1 : aColumn > bColumn ? -1 : 0;
  };


  function moveBlocks(){
    for (var i = 0; i < occupiedBlocks.length; i++){
      //get current Block Position info
      var rowCode = occupiedBlocks[i].slice(0,2);
      var columnCode = occupiedBlocks[i].slice(2);
      var currentBlockCode = rowCode + columnCode;
      //get new Block Position info
      var newRowCode = parseInt(rowCode) + rowMovement;
      var newColumnCode = parseInt(columnCode) + columnMovement;
      if (newRowCode <= 1){
        newRowCode = 1;
      } else if (newRowCode >= numberOfRows){
        newRowCode = numberOfRows;
      };
      if (newColumnCode <= 1){
        newColumnCode = 1;
      } else if (newColumnCode >= numberOfColumns){
        newColumnCode = numberOfColumns;
      };
      if (newRowCode < 10){
        newRowCode = '0' + newRowCode;
      };
      if (newColumnCode < 10){
        newColumnCode = '0' + newColumnCode;
      };
      var newBlockCode = String(newRowCode) + String(newColumnCode);
      var neighbor = occupiedBlocks.indexOf(newBlockCode);
      //if the block is already occupied
      if (neighbor != -1){
      //make 'em both disappear
      } else {
        var index = unoccupiedBlocks.indexOf(newBlockCode);
        unoccupiedBlocks.splice(index, 1);
        unoccupiedBlocks.push(currentBlockCode);
        occupiedBlocks[i] = newBlockCode;
      };
    };
  };

  $(document).keydown(function(e) {
    if ((e.keyCode <= 40) && (e.keyCode >= 37)){
      if (e.keyCode == 40){
        occupiedBlocks.sort(function(a, b){return b-a});
        rowMovement = 1;
        columnMovement = 0;
        option = row;
      };
      if (e.keyCode == 39){
        occupiedBlocks.sort(sortByColumnDescending);
        rowMovement = 0;
        columnMovement = 1;
      };
      if (e.keyCode == 38){
        occupiedBlocks.sort();
        rowMovement = -1;
        columnMovement = 0;
      };
      if (e.keyCode == 37){
        occupiedBlocks.sort(sortByColumnAscending);
        rowMovement = 0;
        columnMovement = -1;
      };
      moveBlocks();
      chooseRandomBlock();
      markUnoccupied();
      markOccupied();
    };
  });

  function clearLines(){
    for (var row=1; row <= numberOfRows; row++){
      var rowFill = [];
      var rowCode = row;
      if (row < 10){
        rowCode = '0' + row;
      };
      for (var column=1; column <= numberOfColumns; column++){
        var columnCode = column;
        if (column < 10){
          columnCode = '0' + column;
        };
        var blockCode = String(rowCode) + String(columnCode);
        if ($('#' + blockCode).hasClass('occupied') == true){
          rowFill.push(blockCode);
        };
        if (rowFill.length == numberOfColumns){
          for (var i=0; i < rowFill.length; i++){
            var index = occupiedBlocks.indexOf(rowFill[i]);
            occupiedBlocks.splice(index, 1);
            unoccupiedBlocks.push(rowFill[i]);
          };
        };
      };
    };

    for (var column=1; column <= numberOfColumns; column++){
      console.log('checking for clearable columns');
      var columnFill = [];
      var columCode = column;
      if (column < 10){
        columnCode = '0' + column;
      };
      for (var row=1; row <= numberOfRows; row++){
        var rowCode = row;
        if (row < 10){
          rowCode = '0' + row;
        };
        var blockCode = String(rowCode) + String(columnCode);
        if ($('#' + blockCode).hasClass('occupied') == true){
          columnFill.push(blockCode);
        };
        if (columnFill.length == numberOfRows){
          for (var i=0; i < columnFill.length; i++){
            var index = occupiedBlocks.indexOf(columnFill[i]);
            occupiedBlocks.splice(index, 1);
            unoccupiedBlocks.push(columnFill[i]);
          };
        };
      };
    };
  };

  setInterval(function(){
    clearLines();
    markUnoccupied();
    markOccupied();
  },500);

  $('.clear').click(function(){
    clearLines();
    markUnoccupied();
    markOccupied();
  });


  //hit button to start
  $('.start').click(function(){
    chooseRandomBlock();
    markUnoccupied();
    markOccupied();
  });





});
