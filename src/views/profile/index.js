import React from "react";
import style from "./style.module.scss";
import ProfilePanel from "../../components/profilePanel";
import OtherTopic from "../../components/otherTopic";
import RecentReply from "../../components/recentReply";
import store from "../../redux/store";
import { Provider } from "react-redux";

class Profile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const loginname = this.props.match.params.id;
		return <div className={style.profile}>
			<Provider store={store}>
				<ProfilePanel loginname={loginname}/>
				<OtherTopic simple={false}/>
				<RecentReply simple={false}/>
			</Provider>
		</div>;
	}
}

export default Profile;