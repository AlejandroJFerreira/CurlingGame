const socket = io('http://' + window.document.location.host)


socket.on('refresh', function(message) {
  
})


socket.on('updateHomePlayerAssigned', function(message) {
  isHomePlayerAssigned = message;
})

socket.on('updateAwayPlayerAssigned', function(message) {
  isVisitorPlayerAssigned = message;
})

socket.on('updateAllStones', function(message) {

  users = message;

  for (let i=0; i<8; i++) {
    allStones.elementAt(i).setLocation(users[i]);
  }
  
})

socket.on('updateAllColors', function(message) {
  if (whosTurnIsIt != message) {
    whosTurnIsIt = message;
    shootingQueue.dequeue()
  }
})

socket.on('updateRockColors', function(message) {

  colours = message;

  for (let i=0; i<8; i++) {
    allStones.elementAt(i).setColour(colours[i]);
  }
  
})

socket.on('reset', function(message) {
  iceSurface = new Ice(canvas);
  homeStones = new SetOfStones();
  visitorStones = new SetOfStones();
  allStones = new SetOfStones();
  shootingQueue = new Queue();
  shootingArea = iceSurface.getShootingArea();
  stoneRadius = iceSurface.nominalStoneRadius();

  //create stones
  for(let i=0; i<STONES_PER_TEAM; i++){
    let homeStone = new Stone(0, 0, stoneRadius, HOME_COLOUR)
    let visitorStone = new Stone(0, 0, stoneRadius, VISITOR_COLOUR)
    homeStones.add(homeStone)
    visitorStones.add(visitorStone)
    allStones.add(homeStone)
    allStones.add(visitorStone)
  }

  for (let i=0; i<8; i++) {
    users[i] = (allStones.elementAt(i).getLocation());
    users[i] = {x: users[i].x, y: users[i].y}
    colours[i] = allStones.elementAt(i).getColour();
  }

  socket.emit('updateRocks', users);
  socket.emit('updateRockColours', colours);

  stageStones();
  
})