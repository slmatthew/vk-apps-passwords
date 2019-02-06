import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import MainHome from './panels/Home/Main';

import Adding from './panels/Adding/Main';

const allowed = {
	main: ['home', 'persik'],
	adding: ['home'],
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeView: 'main',
			mainPanel: 'home',
			addingPanel: 'home',
			hacked: false,
			fetchedUser: null
		};

		this.go = this.go.bind(this);
		this.changeView = this.changeView.bind(this);
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

	go(p) {
		if(!allowed[this.state.activeView] || !allowed[this.state.activeView].includes(p)) {
			this.setState({ hacked: true, activeView: 'hacked' });
		} else {
			if(this.state.activeView === 'main') {
				this.setState({ mainPanel: p });
			}
		}
	}
	changeView(activeView) {
		if(allowed[activeView]) {
			this.setState({ activeView });
		}
	}

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<View activePanel={this.state.mainPanel} id="main">
					<MainHome id="home" fetchedUser={this.state.fetchedUser} go={this.go} changeView={this.changeView} />
				</View>
				<View activePanel={this.state.addingPanel} id="adding">
					<Adding id="home" fetchedUser={this.state.fetchedUser} go={this.go} changeView={this.changeView} />
				</View>
			</Root>
		);
	}
}

export default App;
