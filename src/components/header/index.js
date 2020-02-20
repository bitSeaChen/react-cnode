import React from "react";
import logo from "../../assets/img/cnodejs.svg";
import style from "./style.module.scss";
import { Modal } from "antd";
import { Link } from "react-router-dom";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.info = this.info.bind(this);
	}

	info(e) {
		e.preventDefault();
		Modal.info({
			title: "关于",
			content: (
				<ul>
					<li>author：陈贤相</li>
					<li>GitHub：<a href='https://github.com/XXIANG1997'>xxiang1997</a></li>
					<li>技术栈：React、antd、moment</li>
				</ul>
			)
		});
	}

	render() {
		return (
			<header className={style.header}>
				<div className={style.logo}>
					<img src={logo} alt=""/>
				</div>
				<div className={style.info}>
					<Link to={"/"}>首页</Link>
					<a href="https://cnodejs.org/getstart" target='_blank' rel="noopener noreferrer">新手入门</a>
					<a href="https://cnodejs.org/api" target='_blank' rel="noopener noreferrer">API</a>
					<a href="" onClick={this.info} rel="noopener noreferrer">关于</a>
				</div>
			</header>
		);
	}
}

export default Header;