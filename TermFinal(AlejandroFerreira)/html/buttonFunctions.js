function handleJoinAsHomeButton(){
  isHomeClient = true;
  socket.emit('joinAsHome');
  document.getElementById("JoinAsVisitorButton").setAttribute("disabled", "");
  document.getElementById("JoinAsSpectatorButton").setAttribute("disabled", "");
}

function handleJoinAsAwayButton(){
  isVisitorClient = true;
  socket.emit('joinAsAway');
  document.getElementById("JoinAsHomeButton").setAttribute("disabled", "");
  document.getElementById("JoinAsSpectatorButton").setAttribute("disabled", "");
}

function handleJoinAsSpectator() {
  isSpectatorClient = true;
  document.getElementById("JoinAsHomeButton").setAttribute("disabled", "");
  document.getElementById("JoinAsVisitorButton").setAttribute("disabled", "");
  document.getElementById("JoinAsSpectatorButton").setAttribute("disabled", "");
}

function handleLeave() {
  if (isHomeClient) {
    isHomeClient = false;
    socket.emit('leaveAsHome');
  } else if (isVisitorClient) {
    isVisitorClient = false;
    socket.emit('leaveAsVisitor');
  } else if (isSpectatorClient) {
    isSpectatorClient = false;
  }
  document.getElementById("JoinAsSpectatorButton").removeAttribute("disabled");
}