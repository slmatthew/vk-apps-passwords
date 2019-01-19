import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, List, Cell, Group, Avatar, PanelHeader, FixedLayout, Search, Button, HeaderButton } from '@vkontakte/vkui';

import Icon24Add from '@vkontakte/icons/dist/24/add';

import Footer from './Footer';

const Home = ({ id, fetchedUser, search, onSearch, result, passwords, openAbout, openActionSheet }) => (
	<Panel id={id}>
		<PanelHeader
			noShadow
			left={<HeaderButton><Icon24Add /></HeaderButton>}
		>
			Пароли
		</PanelHeader>
		<FixedLayout vertical="top">
      <Search value={search} onChange={onSearch}/>
    </FixedLayout>
		{fetchedUser &&
		<div style={{ paddingTop: 60 }}>
			<Group title="Мой профиль">
				<ListItem
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={passwords ? `Всего паролей: ${passwords.length}` : `Нет паролей`}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</ListItem>
			</Group>
		</div>}
		{search.length === 0 && passwords &&
		<Group title="Мои пароли">
			<List>
				{passwords.map((pass, key) => <Cell key={key} description={pass.password} onClick={() => openActionSheet(key)}>{pass.login}</Cell>)}
			</List>
		</Group>}
		{result.length > 0 && search.length !== 0 &&
		<Group title="Мои пароли">
			<List>
				{result.map((pass, key) => <Cell key={key} description={pass.password}>{pass.login}</Cell>)}
			</List>
		</Group>}
		{result.length <= 0 && search.length !== 0 &&
		<Group title="Мои пароли">
			<List>
				<Cell description={`По запросу «${search}» ничего не найдено`} multiline={true}><span style={{ color: 'var()' }}>Нет результатов</span></Cell>
			</List>
		</Group>}
		{!passwords &&
		<Group title="For debug">
			<Button onClick={() => localStorage.passwords = JSON.stringify([{ login: 'user1', password: 'password1' }, { login: 'adminka', password: 'paroladminka' }, { login: 'pochta@rossii.ru', password: 'pipKASDSadadsf' }])}>Add passwords</Button>
		</Group>}
		<Footer openAbout={openAbout}/>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
