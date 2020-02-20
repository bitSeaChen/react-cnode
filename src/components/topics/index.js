import React from "react";
import style from "./style.module.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tag, Skeleton } from "antd";
import tabs from "../../utils/tabs";

function Topics(props) {
	const {list} = props;
	return list.length === 0 ? (<Skeleton/>) : (
		<div className={style.topics}>
			{
				list && list.map((item) => (
						<div className={style.item} key={item.id}>
							<Link to={"/user/" + item.author["loginname"]}>
								<img className={style.img} src={item.author["avatar_url"]} alt=""/>
							</Link>
							<div className={style.count}>
							<span className={style.replyCount}>
								{item["reply_count"]}
							</span>
								<span> / </span>
								<span className={style.visitCount}>
								{item["visit_count"]}
							</span>
							</div>
							<div className={style.tag}>
								<Tag color={tabs[item.tab] ? tabs[item.tab].color : "blue"}>
									{tabs[item.tab] ? tabs[item.tab].tag : "其他"}
								</Tag>
							</div>
							<div className={style.title}>
								<Link to={"/topic/" + item.id}>
									{item.title}
								</Link>
							</div>
							<div className={style.time}>
								{moment(item["last_reply_at"], "YYYY-MM-DD")
									.startOf("day")
									.fromNow()}
							</div>
						</div>
					)
				)
			}
		</div>
	);
}

export default Topics;