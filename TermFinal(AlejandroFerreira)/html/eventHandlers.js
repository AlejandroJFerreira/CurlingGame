//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  document.getElementById('JoinAsHomeButton').addEventListener('click', handleJoinAsHomeButton)
  document.getElementById('JoinAsVisitorButton').addEventListener('click', handleJoinAsAwayButton)
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  document.getElementById('JoinAsSpectatorButton').addEventListener('click', handleJoinAsSpectator)
  document.getElementById('LeaveButton').addEventListener('click', handleLeave)

  const MILLISECONDS = 5
  timer = setInterval(handleTimer, MILLISECONDS) //animation timer
  //clearTimeout(timer); //to stop timer

  let btn = document.getElementById("JoinAsHomeButton")
  btn.disabled = false //enable button
  btn.style.backgroundColor = HOME_PROMPT_COLOUR
  btn = document.getElementById("JoinAsVisitorButton")
  btn.disabled = false //enable button
  btn.style.backgroundColor= VISITOR_PROMPT_COLOUR
  btn = document.getElementById("JoinAsSpectatorButton")
  btn.disabled = false //enable button
  btn.style.backgroundColor= SPECTATOR_PROMPT_COLOUR



  drawCanvas()

  })
  