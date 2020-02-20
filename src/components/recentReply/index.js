import React from "react";
import style from "./style.module.scss";
import { connect } from "react-redux";
import { Divider } from "antd";
import { Link } from "react-router-dom";

function RecentReply(props) {
	const recentReply = props.recentReply;
	return <div className={style.recentReply}>
		<span className={style.title}>最近参与的主题</span>
		<Divider/>
		<ul className={style.topic}>
			{
				recentReply && recentReply.map(item => {
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
		recentReply: state.recent_replies
	};
};

export default connect(mapStateToProps, null)(RecentReply);