$(document).ready(function(){

  //creating a grid of
  var numberOfRows = 3;
  var numberOfColumns = 3;

  for (var i = 1; i <= numberOfRows; i++){
    var row = i;
    if (row < 10) {
      row = '0' + i;
    };
    for (var b = 1; b <= numberOfColumns; b++){
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

});
