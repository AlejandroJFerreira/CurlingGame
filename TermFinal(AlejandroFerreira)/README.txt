NAME: Alejandro Ferreira
STUDENT #: 101232439
Video Link: https://youtu.be/5nCrr4lM_ik

VERSION: 
	- v16.17.0 (Node)
	- 8.19.2 (NPM)

OS: Windows 11
INSTALL: 
	- npm install
	- npm install socket.io
LAUNCH:
	- Navigate to the TermFinalProject directory
	- Type 'node server.js' in the Command Prompt

TESTING:
	- Go to 'http://localhost:3000/chatClient.html'
	- Open multiple browsers, and click 'Join as Home' for one, 'Join as Visitor' for another, and 'Join as Spectator' 
		for whichever many other
	- You can click the 'Leave' button to allow a different tab to take its position
	- The game played is curling. Throw curling irons across (click on center box, drag back, then let go to shoot) and try to get
		as many irons close to the middle as possible to get more points
ISSUES:
	- Sometimes the curling iron doesn't teleport to the middle box for when you throw it, this seems to happen less often if one
		waits a few seconds before throwing each next iron.
	- After the game is concluded, the reset is a bit buggy