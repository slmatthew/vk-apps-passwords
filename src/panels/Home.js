import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, List, Cell,Group, Avatar, PanelHeader, FixedLayout, Search, Button } from '@vkontakte/vkui';

const Home = ({ id, fetchedUser, search, onSearch, result, passwords }) => (
	<Panel id={id}>
		<PanelHeader noShadow>Пароли</PanelHeader>
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
			{passwords.map((pass, key) => <Cell key={key} description={pass.password}>{pass.login}</Cell>)}
		</Group>}
		{result.length > 0 && search.length !== 0 &&
		<Group>
			<List>
				{result.map((pass, key) => <Cell key={key} description={pass.password}>{pass.login}</Cell>)}
			</List>
		</Group>}
		{!passwords &&
		<Group title="For debug">
			<Button onClick={() => localStorage.passwords = JSON.stringify([{ login: 'user1', password: 'password1' }, { login: 'adminka', password: 'paroladminka' }, { login: 'pochta@rossii.ru', password: 'pipKASDSadadsf' }])}>Add passwords</Button>
		</Group>}
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
