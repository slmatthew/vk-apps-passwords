import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, ActionSheet, ActionSheetItem, platform, IOS } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

const settings = require('./settings');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			search: '',
			hasPasswords: localStorage.passwords ? true: false,
			passwords: localStorage.passwords ? JSON.parse(localStorage.passwords) : null,
			valid: null,
			popout: null
		};

		this.onSearch = this.onSearch.bind(this);
		this.openAbout = this.openAbout.bind(this);
		this.openActionSheet = this.openActionSheet.bind(this);
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
		this.setState({ valid: this.checkSign() });
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

	checkSign() {
			if(!window.location.search) return false;
			
			const crypto = require('crypto');

			let params = window.location.search.replace('?', '').split('&'),
					arr = [];

			params.forEach((param, i) => {
				if(param.indexOf('vk_') !== -1) arr[i] = param;
			});

			arr = arr.sort().join('&');

			let hash = crypto.createHmac('sha256', settings.client_secret).update(arr).digest('base64'),
					sign = hash.replace(/\//g, '_').replace(/=/g, ''),
					vk_sign = window.location.search.match(new RegExp('sign=([^&=]+)'))[1] || '';
					
			console.log(`sign checking result:`, sign === vk_sign);
			if(sign !== vk_sign) console.warn(`sign isn't valid`);

			return (sign === vk_sign);
	};

	openAbout() { this.setState({ activePanel: 'persik' }); }

	openActionSheet(i) {
		if(!this.state.passwords[i]) return;
		
		let note = this.state.passwords[i];
		
		this.setState({ popout: 
			<ActionSheet
				onClose={() => this.setState({ popout: null })}
				title={`Аккаунт «${note.login}»`}
				text="Действия с аккаунтом"
			>
				<ActionSheetItem autoclose>Скопировать пароль</ActionSheetItem>
				<ActionSheetItem autoclose>Редактировать</ActionSheetItem>
				<ActionSheetItem autoclose theme="destructive">Удалить</ActionSheetItem>
				{platform() === IOS && <ActionSheetItem autoclose theme="cancel">Отмена</ActionSheetItem>}
			</ActionSheet>
		});
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} popout={this.state.popout}>
				<Home
					id="home"
					fetchedUser={this.state.fetchedUser}
					go={this.go}
					passwords={this.state.passwords}
					onSearch={this.onSearch}
					search={this.state.search}
					result={this.passwords}
					openAbout={this.openAbout}
					openActionSheet={this.openActionSheet}
				/>
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
