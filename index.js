$(document).ready(function(){

  var occupiedBlocks = [];
  var unoccupiedBlocks = [];

  for (var i = 1; i <= 3; i++){
    var row = i;
    if (row < 10) {
      row = '0' + i;
    };
    for (var b = 1; b <= 3; b++){
      var column = b;
      if (column < 10) {
        column = '0' + b;
      };
      var blockCode = String(row) + String(column);
      $('.grid').append(
        '<div class="block" id=' + blockCode + '></div>'
      );
    };
  };

  var initialBlockIds = function(){
    unoccupiedBlocks = [];
    $('.grid').children('.block').each(function(){
      var blockCode = $(this).attr('id');
      unoccupiedBlocks.push(blockCode);
    });
  };

  initialBlockIds();

  var occupyBlocks = function(){
    initialBlockIds();
    $('.block').removeClass('occupied');
    for (var i=0; i <= (occupiedBlocks.length - 1); i++){
      $('#' + occupiedBlocks[i]).addClass('occupied');
    };
  };

  var addBlock = function(){
    console.log(unoccupiedBlocks);
    var random = Math.floor(Math.random() * unoccupiedBlocks.length);
    console.log('random id is ' + random);
    var randomBlock = unoccupiedBlocks[random];
    occupiedBlocks.push(randomBlock);
    unoccupiedBlocks.splice(random, 1);
  };

  while (occupiedBlocks.length < 3){
    addBlock();
  };

  occupyBlocks();

  var maxOccupiedRow = 3;
  var minOccupiedRow = 1;

  var moveBlocksDown = function(){
    occupiedBlocks.sort(function(a, b){return b-a});
    for (var i=0; i<=(occupiedBlocks.length - 1); i++){
      var currentCode = occupiedBlocks[i];
      var rowCode = currentCode.slice(0,2);
      if (rowCode < maxOccupiedRow){
        rowCode = parseInt(rowCode) + 1;
        if (rowCode < 10) {
          rowCode = '0' + rowCode;
        };
      };
      var columnCode = currentCode.slice(2);
      var newCode = String(rowCode) + String(columnCode);
      if (occupiedBlocks.indexOf(newCode) != -1){
      } else {
        occupiedBlocks[i] = newCode;
      };
    };
    occupyBlocks();
  };

  var moveBlocksUp = function(){
    occupiedBlocks.sort();
    for (var i=0; i<=(occupiedBlocks.length - 1); i++){
      var currentCode = occupiedBlocks[i];
      var rowCode = currentCode.slice(0,2);
      if (rowCode > minOccupiedRow){
        rowCode = parseInt(rowCode) - 1;
        if (rowCode < 10) {
          rowCode = '0' + rowCode;
        };
      };
      var columnCode = currentCode.slice(2);
      var newCode = String(rowCode) + String(columnCode);
      var index = occupiedBlocks.indexOf(newCode)
      if (index !== -1){
        console.log('already occupied');
        occupiedBlocks.splice(index, 1);
        occupiedBlocks.splice(i, 1);
      } else {
        occupiedBlocks[i] = newCode;
      };
    };
    occupyBlocks();
  };

  var moveBlocksRight = function(){
    occupiedBlocks.sort();
    var currentlyOccupied = occupiedBlocks.length;
    for (var i=0; i<=(occupiedBlocks.length - 1); i++){
      var currentCode = occupiedBlocks[i];
      var rowCode = currentCode.slice(0,2);
      var columnCode = currentCode.slice(2);
      if (columnCode < 15){
        columnCode = parseInt(columnCode) + 1;
        if (columnCode < 10) {
          columnCode = '0' + columnCode;
        };
      };
      var newCode = String(rowCode) + String(columnCode);
      if (occupiedBlocks.indexOf(newCode) !== -1){
      } else {
        occupiedBlocks[i] = newCode;
      };
    };
    occupyBlocks();
  };

  var moveBlocksLeft = function(){
    occupiedBlocks.sort();
    for (var i=0; i<=(occupiedBlocks.length - 1); i++){
      var currentCode = occupiedBlocks[i];
      var rowCode = currentCode.slice(0,2);
      var columnCode = currentCode.slice(2);
      if (columnCode > 1){
        columnCode = parseInt(columnCode) - 1;
        if (columnCode < 10) {
          columnCode = '0' + columnCode;
        };
      };
      var newCode = String(rowCode) + String(columnCode);
      if (occupiedBlocks.indexOf(newCode) !== -1){
      } else {
        occupiedBlocks[i] = newCode;
      };
    };
    occupyBlocks();
  };

  $(document).keydown(function(e) {
    if (e.keyCode == 40){
      moveBlocksDown();
      addBlock();
    } else if (e.keyCode == 38){
      moveBlocksUp();
      addBlock();
    } else if (e.keyCode == 39){
      moveBlocksRight();
      addBlock();
    } else if (e.keyCode == 37){
      moveBlocksLeft();
      addBlock();
    };
  });


});
