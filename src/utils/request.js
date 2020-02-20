import axios from "axios";
import { message } from "antd";

const error = () => {
	message.error("数据加载失败！", 1);
};

const service = axios.create({
	baseURL: "https://cnodejs.org/api/v1",
	timeout: 5000
});

service.interceptors.request.use(
	(config) => {
		return config;
	},
	(err) => {
		error();
		Promise.reject(err);
	}
);

service.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(err) => {
		error();
		return Promise.reject(err);
	}
);

export default service;
