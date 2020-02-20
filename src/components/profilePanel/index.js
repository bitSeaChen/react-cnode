import React from "react";
import style from "./style.module.scss";
import { getUserByName } from "../../utils/api";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProfilePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
	}

	fetchData(loginname) {
		getUserByName(loginname).then((response) => {
			this.setState({
				userData: response.data
			});
			this.props.addRecentData({
				"recent_topics": response.data["recent_topics"],
				"recent_replies": response.data["recent_replies"],
			});
		});
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.fetchData(nextProps.loginname);
	}

	componentDidMount() {
		this.props.loginname && this.fetchData(this.props.loginname);
	}

	render() {
		const {userData} = this.state;
		return (
			<div className={style.profilePanel}>
				<ul>
					<li className={style.info}>
						<Link to={"/user/" + userData.loginname}>
							<img src={userData["avatar_url"]} alt=""/>
							<span>{userData.loginname}</span>
						</Link>
					</li>
					<li className={style.integral}>
						<span>积分：{userData.score}</span>
					</li>
					<li className={style.github}>
						Github：<a
						target='_blank'
						rel='nofollow noopener noreferrer'
						href={`https://github.com/${userData["githubUsername"]}`}>{userData["githubUsername"]}</a>
					</li>
					<li>
						<span>注册时间：
							{moment(userData["create_at"], "YYYY-MM-DD")
								.startOf("day")
								.fromNow()}
						</span>
					</li>
				</ul>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addRecentData: (obj) => {
			dispatch({
				type: "ADD_RECENT_DATA",
				data: obj
			});
		}
	};
};

export default connect(null, mapDispatchToProps)(ProfilePanel);