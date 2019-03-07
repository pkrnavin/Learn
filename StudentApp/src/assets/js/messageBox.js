// message box mobile tried 
var aryElementMessages = [], 
	/* commented, as css `box-sizing: border-box` tried, spacing adjust, to tries, 
	//DEFAULT_MESSAGE_BOX_HEIGHT = 45 + 8 + 10, // (i.e. `45 + 8`, height + padding adds in case class `.messageBox`, )
	DEFAULT_MESSAGE_BOX_HEIGHT = 60 + (8 * 2) + 2, // (i.e. `60 + (8 * 2)`, height + padding top bottom adds in case class `.messageBox`, )
	*/
	DEFAULT_MESSAGE_BOX_HEIGHT = 60,
	nSpacingBetweenMsgBox = 10, 
	nMsgBoxSpaceOccupy = (DEFAULT_MESSAGE_BOX_HEIGHT + nSpacingBetweenMsgBox), 
	nPositionLastMsgBoxNearScreenHeight, 
	nPositionMsgBoxHeightVaries = 0, 
	nTotalHeight = window.innerHeight;

//console.info('screen.height: '+screen.height);
//console.info('window.innerHeight: '+window.innerHeight);

// TODO: thinks, append element in body, thinks body innerhtml replace body content, thinks append element in body, 
// below tries, message, shows hides, 
function showMessage(msgText, nHideMillis) {
	//var aryElementMessages = [];	// commented, as each time `showMessage` calls, new creates, to adds above function global, thinks, 
	
	// to hide messageBox, after given milli seconds, 
	var DEFAULT_MSG_BOX_HIDE_MILLIS = 1000 * 3;
	nHideMillis = (nHideMillis || DEFAULT_MSG_BOX_HIDE_MILLIS);
	//console.info('nHideMillis: '+nHideMillis);
	// TODO: from ours adds, element in array, in hides from array shift element hides, 
	
	// shows message box, after shows hides, 
	function showMessageBox(msgText) {
		// appends or adds, the element in body 
		var eleDivMsg = document.createElement('div');	// from link given 
		//eleDivMsg.id = "divMessageBox";	// commented `id` sets, as multiple message box adds, tries 
		eleDivMsg.className = 'messageBox';
		eleDivMsg.innerHTML = msgText;
		/* commented, element position, from function added, tried 
		eleDivMsg.style.bottom = nPositionMsgBox+'px';
		//eleDivMsg.style.top = nPositionMsgBox+'px';*/
		/* commented, elemt posistion from, default height, */
		eleDivMsg.style.bottom = getMsgBoxPositionFromDefaultHeight()+'px';
		/* commented, tries message box height varies, 
		// below tries, of message box height varies, afust posistion tries, 
		eleDivMsg.style.bottom = getMsgPositionHeightVaries(eleDivMsg)+'px';*/
		
		// adds element in array, to hide after showing, thinks 
		aryElementMessages.push(eleDivMsg);
		
		//console.info('aryElementMessages.length: '+aryElementMessages.length);
		
		document.body.appendChild(eleDivMsg);
		
		
		// adds from our, after message show, hides given milliseconds 
		setTimeout(function() {
			//console.info('setTimeout <> hideMessage');
			//console.info('setTimeout <> eleDivMsg.innerHTML: '+eleDivMsg.innerHTML);
			
			/* commented, to hide respective given element's timer, below commented, tries */
			// hides element, from array gets, 
			hideMessage();
			
			/* commented, hide from array gets, 
			// to hide, respective given element's timer, below adds, tries 
			hideElementMsgBox(eleDivMsg);*/
		}, nHideMillis);
	}
	// hides message box, 
	function hideMessage() {
		var eleDivMsg = aryElementMessages.shift();
		//console.info('hideMessage <> aryElementMessages.length: '+aryElementMessages.length);
		/* commented, tries of message box height varies, 
		// below adds, tries, messageBox height varies, of hiding subtract posistion, to render next element, tries, 
		subtractMsgBoxRenderPosition(eleDivMsg);*/
		
		eleDivMsg.style.display = "none";
	}
	/* respective element to hide, for the element's given timer milli, 
	 *   parameter element, passes to hide, tries 
	 */
	function hideElementMsgBox(eleMsgBox) {
		eleMsgBox.style.display = "none";
	}
	
	// shows message box, after shows hides, 
	showMessageBox(msgText);
}

// get message box, position from default height 
function getMsgBoxPositionFromDefaultHeight() {
	var nPositionMsgBox, nMsgBoxRenderSpaceOccupy;
	
	// from given height, message box, to show one below one (OR) one above one, tries, 
	//nPositionMsgBox = (aryElementMessages.length * DEFAULT_MESSAGE_BOX_HEIGHT) + nSpacingBetweenMsgBox;
	/* spacing between message boxes, 
	 * thinks, position = (ary.length * messageBoxHeight) + (ary.length * spacing), 
	 * thinks, ours maths book, multiplication associative `ary.length * (messageBoxHeight + spacing)`, 
	 * thinks, above spacing between messageBoxes not sets, thinks from given position sets, to sets spacing between message box below adds, 
	 * thinks, below end `+ nSpacingBetweenMsgBox`, adds spacing from screen starting OR end, position sets, 
	 */
	nPositionMsgBox = aryElementMessages.length * nMsgBoxSpaceOccupy;// `+ nSpacingBetweenMsgBox;`, working spacing from screen start OR end, position sets, 
	//nPositionMsgBox = (aryElementMessages.length * DEFAULT_MESSAGE_BOX_HEIGHT);
	nMsgBoxRenderSpaceOccupy = nPositionMsgBox + nMsgBoxSpaceOccupy;
	//console.info('nPositionMsgBox: '+nPositionMsgBox);

	/* below tries, of messageBox show (one below one) OR (one above one), 
	 *  last messageBox to show below screen height tries, 
	 */
	/* Note: below working, of tries, position sets from screen height, tries; 
	 * commented, to tries, overlap in last messageBox, */
	if ( nMsgBoxRenderSpaceOccupy > nTotalHeight ) {
		nPositionMsgBox = nTotalHeight - nMsgBoxSpaceOccupy;
	}

	// below tries, to overlap last message box, 
	/* commented, tries last messageBox, to overlap, in screen height, tries, 
	if ( nMsgBoxRenderSpaceOccupy > nTotalHeight ) {
		if ( nPositionLastMsgBoxNearScreenHeight === undefined ) {
			nPositionLastMsgBoxNearScreenHeight = (aryElementMessages.length - 1) * nMsgBoxSpaceOccupy;
		}
		nPositionMsgBox = nPositionLastMsgBoxNearScreenHeight;
	} else {
		nPositionLastMsgBoxNearScreenHeight = undefined;
	}*/
	
	return nPositionMsgBox;
}

// below to tries, messageBox position height varies 
function addMsgBoxRenderPosition(element) {
	var nMsgBoxSpaceOccupyHeightVaries;
	nMsgBoxSpaceOccupyHeightVaries = getHeight(element) + nSpacingBetweenMsgBox;
	nPositionMsgBoxHeightVaries += nMsgBoxSpaceOccupyHeightVaries;
	//console.info('nPositionMsgBoxHeightVaries: '+nPositionMsgBoxHeightVaries);
}
// below tries, of element hides, subtract element position, to render next element, 
function subtractMsgBoxRenderPosition(element) {
	var nMsgBoxSpaceOccupyHeightVaries;
	nMsgBoxSpaceOccupyHeightVaries = (element.offsetHeight + 0) + nSpacingBetweenMsgBox;
	nPositionMsgBoxHeightVaries = nPositionMsgBoxHeightVaries - nMsgBoxSpaceOccupyHeightVaries;
}
// gets element, of messageBox height varies, 
function getMsgPositionHeightVaries(element) {
	var nPositionMsgBox = nPositionMsgBoxHeightVaries;
	addMsgBoxRenderPosition(element);
	return nPositionMsgBox;
}

// get element height, before rebder in dom, from link, 
function getHeight(element){
	var e = element.cloneNode(true);
	e.style.visibility = "hidden";
	document.body.appendChild(e);
	var height = e.offsetHeight + 0;
	//console.info('height: '+height);
	document.body.removeChild(e);
	e.style.visibility = "visible";
	return height;
}

/* commented, to calls directly (i.e. without timeout), 
setTimeout(function() { showMessage('Details adds, message box javascript'); }, 1000);*/
// showMessageBox calls here, as error throws, to call after DOM body loads, thinks 

// below adds, to call `body` loads, 
function onBodyLoad() {
	/* commented, tries respective element, to hide for the given timer, 
	 * Note: inside timeout, to call `hideElementMsgBox` comment `hideMessage`, respective element to hide, for given timer, thinks 
	showMessage('Details adds, message box javascript, 11111', 1000 * 6);
	showMessage('Details adds, message box javascript, 22222', 1000 * 4);
	showMessage('Details adds, message box javascript, 33333', 1000 * 2);*/
	
	// below adds, from array element shift adds, to hide message box, 
	showMessage('Details adds, message box javascript, 11111');
	showMessage('Details adds, message box javascript, 22222');
	showMessage('Details adds, message box javascript, 33333');
}

// to show messageBox, from button clicks, 
function showMessageBoxFromBtnClick() {
	showMessage('Details adds, message box button clicks. ');
}
// to show large messageBox, from button, 
function showLargeMessageBoxFromBtnClick() {
	showMessage('Details adds, message box button clicks. <BR>Details adds, message box button clicks. ');
}

/**
 * below adds, angular to usage, from link adds tries 
 */
/* commented, default message shows `undefined`
var showMessageModule = new showMessage();
export { showMessageModule };*/