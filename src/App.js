import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root, View, ScreenSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/Home';
import Passwords from './panels/Home/Passwords';
import EditPasswords from './panels/Home/EditPasswords';
import EditPassword from './panels/Home/EditPassword';
import EditList from './panels/Home/EditList';
import DeletePasswords from './panels/Home/DeletePasswords';
import Settings from './panels/Home/Settings';
import Help from './panels/Home/Help';
import About from './panels/Home/About';

import Add from './panels/Add/Add';

const allowed = {
	home: ['home', 'passwords', 'editpasswords', 'editpassword', 'editlist', 'deletepasswords', 'settings', 'help', 'about'],
	add: ['add']
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeView: 'home',
			homePanel: 'home',
			addPanel: 'add',
			homePopout: null,
			addPopout: null,
			currentItem: {},
			fetchedUser: null,
		};

		this.go = this.go.bind(this);
		this.changeView = this.changeView.bind(this);
	}

	componentDidMount() {
		this.setState({ homePopout: <ScreenSpinner /> });

		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data, homePopout: null });
					break;
				default: break;
			}
		});
		connect.send('VKWebAppGetUserInfo', {});

		window.addEventListener('popstate', e => e.preventDefault() & this.handlePop(e));
		this.pushHistory('home', 'home');
		this.pushHistory('home', 'home');
	}

	handlePop = e => {
		if(e.state) {
			const name = `${e.state.view}Panel`
			this.setState({ activeView: e.state.view, [name]: e.state.panel });
		}
	}

	pushHistory = (v, p) => window.history.pushState({ view: v, panel: p }, `${v}/${p}`)

	go(panel, back = false, newstate = undefined) {
		if(!allowed[this.state.activeView].includes(panel) && !back) {
			return;
		}

		if(newstate !== undefined) {
			this.setState(newstate);
		}

		if(back) {
			window.history.back();
		} else {
			let name = `${this.state.activeView}Panel`;
			this.setState({ [name]: panel });
			this.pushHistory(this.state.activeView, panel);
		}
	}
	changeView(activeView) {
		if(!allowed[activeView]) {
			return;
		}

		this.setState({ activeView })
		this.pushHistory(activeView, this.state[`${activeView}Panel`])
	}

	updateState = (newstate) => this.setState(newstate)

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<View activePanel={this.state.homePanel} popout={this.state.homePopout} id="home">
					<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
					<Passwords id="passwords" go={this.go} changeView={this.changeView} updateState={this.updateState} />
					<EditPasswords id="editpasswords" go={this.go} updateState={this.updateState} />
					<EditPassword id="editpassword" go={this.go} currentItem={this.state.currentItem} />
					<EditList id="editlist" go={this.go} />
					<DeletePasswords id="deletepasswords" go={this.go} />
					<Settings id="settings" go={this.go} />
					<Help id="help" go={this.go} />
					<About id="about" go={this.go} />
				</View>
				<View activePanel={this.state.addPanel} popout={this.state.addPopout} id="add">
					<Add id="add" go={this.go} changeView={this.changeView} />
				</View>
			</Root>
		);
	}
}

export default App;
