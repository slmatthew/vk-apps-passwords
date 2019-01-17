import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			search: '',
			hasPasswords: localStorage.passwords ? true: false,
			passwords: localStorage.passwords ? JSON.parse(localStorage.passwords) : null
		};

		this.onSearch = this.onSearch.bind(this);
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	onSearch(text) { this.setState({ search: text }); }

	get passwords() {
		if(this.state.passwords === null) return [];

		const search = this.state.search.toLowerCase();
		return this.state.passwords.filter(({login}) => login.toLowerCase().indexOf(search) > -1);
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} passwords={this.state.passwords} onSearch={this.onSearch} search={this.state.search} result={this.passwords} />
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
