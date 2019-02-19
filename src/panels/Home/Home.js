import React from 'react';
import { Panel, PanelHeader, Group, ListItem, Avatar, Cell } from '@vkontakte/vkui';

import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Privacy from '@vkontakte/icons/dist/24/privacy';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Info from '@vkontakte/icons/dist/24/info';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>Меню</PanelHeader>
        {this.props.fetchedUser &&
        <Group style={{ marginTop: 0 }}>
    			<ListItem
    				before={this.props.fetchedUser.photo_200 ? <Avatar src={this.props.fetchedUser.photo_200}/> : <Avatar />}
    				description={this.props.fetchedUser.city && this.props.fetchedUser.city.title ? this.props.fetchedUser.city.title : ''}
    			>
    				{`${this.props.fetchedUser.first_name} ${this.props.fetchedUser.last_name}`}
    			</ListItem>
        </Group>}
        <Group>
          <Cell before={<Icon24Privacy />} onClick={() => this.props.go('passwords')}>Список паролей</Cell>
          <Cell before={<Icon24Settings />} onClick={() => this.props.go('settings')}>Настройки</Cell>
          <Cell before={<Icon24Help />} onClick={() => this.props.go('help')}>Помощь</Cell>
        </Group>
        <Group>
          <Cell before={<Icon24Info />} onClick={() => this.props.go('about')}>О приложении</Cell>
        </Group>
      </Panel>
    );
  }
}

export default Home;
