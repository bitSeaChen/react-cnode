import React from "react";
import style from "./style.module.scss";
import { connect } from "react-redux";
import { Divider } from "antd";
import { Link } from "react-router-dom";

function OtherTopic(props) {
	const recentTopics = props.recentTopics;
	return <div className={style.otherTopic}>
		<span className={style.title}>最近创建的主题</span>
		<Divider/>
		<ul className={style.topic}>
			{
				recentTopics && recentTopics.map(item => {
					return <li key={item.id} className={style.item}>
						<Link to={"/topic/" + item.id}>
							{item.title}
						</Link>
					</li>;
				})
			}
		</ul>
	</div>;
}

const mapStateToProps = (state, ownProps) => {
	return {
		recentTopics: state.recent_topics
	};
};

export default connect(mapStateToProps, null)(OtherTopic);