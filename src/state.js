module.exports = {
	setSelectedNode(state, node){
		state.selected = node;
		return state;
	},

	setActiveNode(state, node){
		state.activeNode = node;
		return state;
	},

	getActiveNode(state){
		return state.activeNode;
	},

	getInitial(){
		return {
			_prevMouse: [0,0],
			mouse: [0,0],
			diff: [0,0],
			drag: false,
			selected: null,
			lastId: 1,
			activeNode: null
		};
	},

	getSelectedNode(state){
		return state.selected;
	},

	calculateMouseDiff(state){
		state.diff = [state.mouse[0] - state._prevMouse[0], state.mouse[1] - state._prevMouse[1]];
		return state;
	},

	incrementId(state){
		state.lastId ++ ;
		return state;
	},

	getCurrentId(state){
		return state.lastId;
	},

	updateMousePrev(state){
		state._prevMouse = state.mouse;
		return state;
	},


	unselectNode(state){
		state.selected = null;
		return state;
	}

};