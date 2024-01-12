let timer //timer for animating motion
let canvas = document.getElementById('canvas1') //our drawing canvas
let iceSurface = new Ice(canvas)
allStones = new SetOfStones() //set of all stones. sorted by lying score
homeStones = new SetOfStones() //set of home stones in no particular order
visitorStones = new SetOfStones() //set of visitor stones in no particular order
shootingQueue = new Queue() //queue of stones still to be shot
let setOfCollisions = new SetOfCollisions()
let shootingCue = null //Cue instance: shooting cue used to shoot ball with mouse

let fontPointSize = 18 //point size for chord and lyric text
let editorFont = 'Courier New' //font for your editor -must be monospace font
let shootingArea = iceSurface.getShootingArea()
let stoneRadius = iceSurface.nominalStoneRadius()

let users = [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}, {x:3, y:3}, {x:4, y:4}, {x:5, y:5}, {x:6, y:6}, {x:7, y:7}]
let colours = [];

//create stones
for(let i=0; i<STONES_PER_TEAM; i++){
    let homeStone = new Stone(0, 0, stoneRadius, HOME_COLOUR)
    let visitorStone = new Stone(0, 0, stoneRadius, VISITOR_COLOUR)
    homeStones.add(homeStone)
    visitorStones.add(visitorStone)
    allStones.add(homeStone)
    allStones.add(visitorStone)
}

function stageStones(){
    //stage the stones in the shooting area by lining them vertically on either side
    //add stones to the shooting order queue based on the value
    //of whosTurnIsIt state variable
  
    if(whosTurnIsIt === HOME_COLOUR){
      for(let i=0; i<STONES_PER_TEAM; i++){
        shootingQueue.enqueue(homeStones.elementAt(i))
        shootingQueue.enqueue(visitorStones.elementAt(i))
        homeStones.elementAt(i).setLocation({x:shootingArea.x + stoneRadius, y:shootingArea.height - (stoneRadius + (STONES_PER_TEAM-i-1)*stoneRadius*2)})
        homeStones.elementAt(i).setColour(HOME_COLOUR);
        visitorStones.elementAt(i).setLocation({x:shootingArea.x + shootingArea.width - stoneRadius, y:shootingArea.height - (stoneRadius + (STONES_PER_TEAM-i-1)*stoneRadius*2)})
        visitorStones.elementAt(i).setColour(VISITOR_COLOUR);
      }
    }
    else {
      for(let i=0; i<STONES_PER_TEAM; i++){
        shootingQueue.enqueue(visitorStones.elementAt(i))
        shootingQueue.enqueue(homeStones.elementAt(i))
        homeStones.elementAt(i).setLocation({x:shootingArea.x + stoneRadius, y:shootingArea.height - (stoneRadius + (STONES_PER_TEAM-i-1)*stoneRadius*2)})
        visitorStones.elementAt(i).setLocation({x:shootingArea.x + shootingArea.width - stoneRadius, y:shootingArea.height - (stoneRadius + (STONES_PER_TEAM-i-1)*stoneRadius*2)})
      }
  
    }
}
  
stageStones()

function drawCanvas() {

    const context = canvas.getContext('2d')
  
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height) //erase canvas

    for (let i=0; i<8; i++) {
        users[i] = (allStones.elementAt(i).getLocation());
        users[i] = {x: users[i].x, y: users[i].y}
        colours[i] = allStones.elementAt(i).getColour();
    }

    socket.emit('updateData');

    if (isHomeClient == true && whosTurnIsIt == HOME_COLOUR) {
      socket.emit('updateRocks', users);
      socket.emit('updateRockColours', colours);
    }

    if (isVisitorClient == true && whosTurnIsIt == VISITOR_COLOUR) {
      socket.emit('updateRocks', users);
      socket.emit('updateRockColours', colours);
    }

    if (isHomePlayerAssigned == true) {
        document.getElementById("JoinAsHomeButton").setAttribute("disabled", "");
    } else if (isVisitorClient == false && isSpectatorClient == false) {
        document.getElementById("JoinAsHomeButton").removeAttribute("disabled");
    }

    if (isVisitorPlayerAssigned == true) {
        document.getElementById("JoinAsVisitorButton").setAttribute("disabled", "");
    } else if (isHomeClient == false && isSpectatorClient == false) {
        document.getElementById("JoinAsVisitorButton").removeAttribute("disabled");
    }
  
    //draw playing surface
    iceSurface.draw(context, whosTurnIsIt)
  
    context.font = '' + fontPointSize + 'pt ' + editorFont
    context.strokeStyle = 'blue'
    context.fillStyle = 'red'
  
    //draw the stones
    allStones.draw(context, iceSurface)
    if (shootingCue != null) shootingCue.draw(context)
  
    //draw the score (as topmost feature).
    iceSurface.drawScore(context, score)
  }