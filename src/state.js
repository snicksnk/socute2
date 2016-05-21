module.exports = {
	setSelectedNode(state, node){
		state.selected = node;
		return state;
	},

	getInitial(){
		return {
			_prevMouse: [0,0],
			mouse: [0,0],
			diff: [0,0],
			drag: false,
			selected: null
		};
	},

	calculateMouseDiff(state){
		state.diff = [state.mouse[0] - state._prevMouse[0], state.mouse[1] - state._prevMouse[1]];
		return state;
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