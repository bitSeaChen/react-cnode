import React from "react";
import Header from "./components/header";
import Home from "./views/home";
import Topic from "./views/topic";
import style from "./App.module.scss";
import "antd/dist/antd.css";
import moment from "moment";
import "moment/locale/zh-cn";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Profile from "./views/profile";

moment.locale("zh-cn");

function App() {
	return (
		<div className={style.app}>
			<HashRouter>
				<Header />
				<div className={style.main}>
					<Route exact path='/' component={Home} />
					<Route path='/topic/:id' component={Topic} />
					<Route path='/user/:id' component={Profile} />
					<Route exact path='/topic' render={() => <Redirect to='/' />} />
					<Route exact path='/user' render={() => <Redirect to='/' />} />
				</div>
			</HashRouter>
		</div>
	);
}

export default App;
