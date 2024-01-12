function handleTimer() {
  allStones.advance(iceSurface.getShootingArea())
  for (let stone1 of allStones.getCollection()) {
    for (let stone2 of allStones.getCollection()) {
      //check for possible collisions
      if ((stone1 !== stone2) && stone1.isTouching(stone2) && (stone1.isStoneMoving() || stone2.isStoneMoving())) setOfCollisions.addCollision(new Collision(stone1, stone2))
    }
  }

  setOfCollisions.removeOldCollisions()

  if(allStones.isAllStonesStopped()){
    if(!shootingQueue.isEmpty() && waitingForNextShot == false) {
      waitingForNextShot = true;
      whosTurnIsIt = shootingQueue.front().getColour();
      socket.emit('updateColor', whosTurnIsIt);
    } 
    score = iceSurface.getCurrentScore(allStones)
    enableShooting = true
  }

  drawCanvas()
}
