import React from 'react';
import connect from '@vkontakte/vk-connect';
import ConfigProvider from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

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
import SelectIcon from './panels/Add/SelectIcon';

import './common.css';

const allowed = {
	home: ['home', 'passwords', 'editpasswords', 'editpassword', 'editlist', 'deletepasswords', 'settings', 'help', 'about'],
	add: ['add', 'mimicry']
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
			currentTheme: 'client_light',
			fetchedUser: null,
			
			chosenIcon: 'default',

			homeHistory: ['home', 'home'],
			addHistory: ['add', 'add']
		};

		this.go = this.go.bind(this);
		this.changeView = this.changeView.bind(this);
	}

	componentDidMount() {
		this.setState({ homePopout: <ScreenSpinner /> });

		let themeChanged = false;

		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data, homePopout: null });
					break;

				case 'VKWebAppUpdateConfig':
					if(localStorage.blockTheme && localStorage.blockTheme !== 'true') {
						this.updateTheme(e.detail.data.scheme);
						themeChanged = true;
					}
					break;

				default: break;
			}
		});
		connect.send('VKWebAppGetUserInfo', {});

		window.addEventListener('popstate', e => e.preventDefault() & this.handlePop(e));
		this.pushHistory('home', 'home');
		this.pushHistory('home', 'home');

		if(!themeChanged) {
			let theme = localStorage.theme || 'client_light';
			this.updateTheme(theme);
		}
	}

	handlePop = e => {
		if(e.state) {
			const { view, panel } = e.state;
			const name = `${view}Panel`;
			this.setState({ activeView: view, [name]: panel });

			if(panel === 'home') {
				connect.send('VKWebAppDisableSwipeBack');
			} else {
				connect.send('VKWebAppEnableSwipeBack');
			}
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

			if(this.state.activeView === 'add' && this.state.addPanel === 'add') {
				this.setState({ chosenIcon: 'default' });
			}
		} else {
			const name = `${this.state.activeView}Panel`;
			this.setState({ [name]: panel });
			this.pushHistory(this.state.activeView, panel);

			if(panel === 'home') {
				connect.send('VKWebAppDisableSwipeBack');
			} else {
				connect.send('VKWebAppEnableSwipeBack');
			}
		}
	}
	changeView(activeView) {
		if(!allowed[activeView]) {
			return;
		}

		if(this.state.activeView === 'add' && activeView !== 'add') {
			this.setState({ chosenIcon: 'default' });
		}

		this.setState({ activeView })
		this.pushHistory(activeView, this.state[`${activeView}Panel`])
	}

	updateState = (newstate) => this.setState(newstate)

	updateTheme = (theme) => {
		let valid;
		switch(theme) {
			case 'client_light': // светлая в VK for Android/iPhone
				valid = true;
				if(connect.supports('VKWebAppSetViewSettings')) connect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#5281B9"});
				break;

			case 'client_dark': // тёмная в VK for Android/iPhone
				valid = true;
				if(connect.supports('VKWebAppSetViewSettings')) connect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#2C2D2F"});
				break;

			case 'space_gray': // светлая в VK Me
				valid = true;
				if(connect.supports('VKWebAppSetViewSettings')) connect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#2C2D2E"});
				break;

			case 'bright_light': // тёмная в VK Me
				valid = true;
				if(connect.supports('VKWebAppSetViewSettings')) connect.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#FFFFFF"});
				break;

			default:
				valid = false;
				break;
		}

		if(valid) {
			localStorage.theme = theme;
			document.querySelector('body').setAttribute('scheme', theme);
			this.setState({ currentTheme: theme });
		}
	}

	render() {
		return (
			<ConfigProvider scheme={this.state.currentTheme}>
				<Root activeView={this.state.activeView}>
					<View
						id="home"
						activePanel={this.state.homePanel}
						popout={this.state.homePopout}
						history={this.state.homeHistory}
						onSwipeBack={() => this.go('', true)}
					>
						<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
						<Passwords id="passwords" go={this.go} changeView={this.changeView} updateState={this.updateState} />
						<EditPasswords id="editpasswords" go={this.go} updateState={this.updateState} />
						<EditPassword id="editpassword" go={this.go} currentItem={this.state.currentItem} />
						<EditList id="editlist" go={this.go} />
						<DeletePasswords id="deletepasswords" go={this.go} />
						<Settings id="settings" go={this.go} updateTheme={this.updateTheme} theme={this.state.currentTheme} />
						<Help id="help" go={this.go} updateState={this.updateState} />
						<About id="about" go={this.go} />
					</View>
					<View
						id="add"
						activePanel={this.state.addPanel}
						popout={this.state.addPopout}
						history={this.state.addHistory}
						onSwipeBack={() => this.go('', true)}
					>
						<Add id="add" go={this.go} changeView={this.changeView} chosen={this.state.chosenIcon} />
						<SelectIcon id="mimicry" go={this.go} chosen={this.state.chosenIcon} changeChosen={chosen => this.setState({ chosenIcon: chosen })} />
					</View>
				</Root>
			</ConfigProvider>
		);
	}
}

export default App;
