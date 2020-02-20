const defaultData = {
	"recent_topics": [],
	"recent_replies": []
};

function reducer(state = defaultData, action) {
	if (action.type === "ADD_RECENT_DATA") {
		return {
			"recent_topics": action.data["recent_topics"],
			"recent_replies": action.data["recent_replies"],
		};
	}
	return state;
}

export default reducer;