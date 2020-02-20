import React from "react";
import style from "./style.module.scss";
import { getTopics } from "../../utils/api";
import { Tabs, Skeleton } from "antd";
import Topics from "../../components/topics/index";

const { TabPane } = Tabs;

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			limit: 20,
			list: [],
			store: {},
			tab: "all",
			loading: false
		};
		this.tabsChange = this.tabsChange.bind(this);
		this.scrollMethod = this.scrollMethod.bind(this);
	}

	getTopics() {
		const state = this.state;
		getTopics({
			page: state.page,
			limit: state.limit,
			tab: state.tab
		}).then((res) => {
			const store = state.store;
			this.setState({
				list: res.data,
				limit: this.state.limit + 10,
				loading: false
			});

			store[state.tab] = {
				limit: state.limit,
				data: res.data
			};
		});
	}

	tabsChange(tab) {
		const store = this.state.store;
		if (!store[tab]) {
			this.setState(
				{
					tab,
					limit: 20,
					list: []
				},
				() => {
					this.getTopics();
				}
			);
			return;
		}
		this.setState({
			tab,
			limit: store[tab].limit,
			list: store[tab].data
		});
	}

	scrollMethod() {
		const totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
		const viewH = document.documentElement.clientHeight;
		const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
		// 当视图的高度 + 滚动的高度 >= 总高度 => 触发更新
		if (viewH + scrollH >= totalH) {
			this.setState(
				{
					loading: true
				},
				() => {
					this.getTopics();
				}
			);
		}
	}

	componentDidMount() {
		this.getTopics();
		window.addEventListener("scroll", this.scrollMethod);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.scrollMethod);
	}

	render() {
		return (
			<div className={style.home}>
				<Tabs className={style.tabs} onChange={this.tabsChange}>
					<TabPane tab='全部' key='all'>
						<Topics list={this.state.list} />
						{this.state.loading ? <Skeleton /> : ""}
					</TabPane>
					<TabPane tab='精华' key='good'>
						<Topics list={this.state.list} />
						{this.state.loading ? <Skeleton /> : ""}
					</TabPane>
					<TabPane tab='分享' key='share'>
						<Topics list={this.state.list} />
						{this.state.loading ? <Skeleton /> : ""}
					</TabPane>
					<TabPane tab='问答' key='ask'>
						<Topics list={this.state.list} />
						{this.state.loading ? <Skeleton /> : ""}
					</TabPane>
					<TabPane tab='工作' key='job'>
						<Topics list={this.state.list} />
						{this.state.loading ? <Skeleton /> : ""}
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default Home;
