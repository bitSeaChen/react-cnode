import React from "react";
import style from "./style.module.scss";
import "../../assets/css/vue.css";
import moment from "moment";
import { Link } from "react-router-dom";

function Reply(props) {
	return (
		<div className={style.reply}>
			<div className={style.replyCount}>
				{props.replies && props.replies.length} 回复
			</div>
			{
				props.replies && props.replies.map((item, index) => <div key={item.id} className={style.item}>
					<div className={style.left}>
						<Link to={"/user/" + item.author["loginname"]}>
							<img src={item.author["avatar_url"]} alt=""/>
						</Link>
					</div>
					<div className={style.right}>
						<div className={style.info}>
							<span>{index + 1} 楼 🌻</span>
							<span className={style.author}>
								<Link to={"/user/" + item.author["loginname"]}>
									{item.author["loginname"]}
								</Link>
								🌻 </span>
							<span>
								{moment(item["create_at"], "YYYY-MM-DD")
									.startOf("day")
									.fromNow()}
							</span>
						</div>
						<div className={style.content} dangerouslySetInnerHTML={{__html: item.content}}/>
					</div>
				</div>)
			}
		</div>
	);
}

export default Reply;