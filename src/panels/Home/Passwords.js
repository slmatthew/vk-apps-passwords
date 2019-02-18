import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, Group, Cell, Avatar } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';

const osname = platform();

class Passwords extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Список паролей</PanelHeader>
        <Group title="4 пароля">
          <Cell before={<Avatar size={48} style={{ background: 'transparent' }}><Icon28AddOutline fill="var(--accent)" /></Avatar>} onClick={() => this.props.changeView('add')}><span style={{ color: 'var(--accent)' }}>Добавить пароль</span></Cell>
          <Cell before={<Avatar><Icon24Services /></Avatar>} asideContent={<Icon24FavoriteOutline />} description="qwerty123">VK.com (slmatthew)</Cell>
          <Cell before={<Avatar><Icon24Services /></Avatar>} asideContent={<Icon24Favorite fill="#FFA000" />} description="qwerty123">VK.com (slmatthew)</Cell>
          <Cell before={<Avatar><Icon24Services /></Avatar>} asideContent={<Icon24FavoriteOutline />} description="qwerty123">VK.com (slmatthew)</Cell>
          <Cell before={<Avatar><Icon24Services /></Avatar>} asideContent={<Icon24FavoriteOutline />} description="qwerty123">VK.com (slmatthew)</Cell>
        </Group>
      </Panel>
    )
  }
}

export default Passwords;
