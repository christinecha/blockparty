$(document).ready(function(){

  while (occupiedBlocks.length < 3){
    var randomBlockRow = Math.floor(Math.random() * 3) + 1;
    var randomBlockColumn = Math.floor(Math.random() * 3) + 1;
    if (randomBlockRow < 10) {
      randomBlockRow = '0' + randomBlockRow;
    };
    if (randomBlockColumn < 10) {
      randomBlockColumn = '0' + randomBlockColumn;
    };
    randomBlock = String(randomBlockRow) + String(randomBlockColumn);
    if (occupiedBlocks.indexOf(randomBlock) !== -1){
    } else {
      occupiedBlocks.push(randomBlock);
    };
    console.log(occupiedBlocks);
  };

});
