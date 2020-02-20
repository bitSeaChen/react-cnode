import React from "react";
import { getTopicById } from "../../utils/api";
import style from "./style.module.scss";
import "../../assets/css/vue.css";
import moment from "moment";
import tabs from "../../utils/tabs";
import { Divider } from "antd";
import Reply from "../../components/reply";
import ProfilePanel from "../../components/profilePanel";
import RecentReply from "../../components/recentReply";
import OtherTopic from "../../components/otherTopic";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";

class Topic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}

	componentDidMount() {
		this.fetchData(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.fetchData(nextProps.match.params.id);
	}

	fetchData(id) {
		getTopicById(id).then((res) => {
			this.setState({
				data: {
					...res.data,
					...res.data.author
				}
			});
		});
	}

	render() {
		const data = this.state.data;
		return <div className={style.topic}>
			<div className={style.main}>
				<header className={style.header}>
					<div className={style.title}>
						{data.title}
					</div>
					<div className={style.info}>
						<span>
							发布于 {moment(data["last_reply_at"], "YYYY-MM-DD")
							.startOf("day")
							.fromNow()} 🌞 &nbsp;
						</span>
						<span className={style.author}>
							作者&nbsp;
							<Link to={"/user/" + data["loginname"]}>
								{data["loginname"]} 🌞 &nbsp;
							</Link>
						</span>
						<span>
							{data["visit_count"]} 次浏览 🌞 &nbsp;
						</span>
						<span>
							来自 {tabs[data["tab"]] ? tabs[data["tab"]].tag : "其他"}
						</span>
					</div>
				</header>
				<Divider/>
				<section className={style.content} dangerouslySetInnerHTML={{__html: data["content"]}}/>
				<Reply replies={data["replies"]}/>
			</div>
			<div className={style.sidebar}>
				<Provider store={store}>
					<ProfilePanel loginname={data["loginname"]}/>
					<OtherTopic/>
					<RecentReply/>
				</Provider>
			</div>
		</div>;
		;
	}
}

export default Topic;