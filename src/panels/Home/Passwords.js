import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, Group, Cell, Avatar, Footer } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';

const osname = platform();

class Passwords extends React.Component {
  constructor(props) {
    super(props);

    let list, isFooter = false;
    if(localStorage.list) {
      list = JSON.parse(localStorage.list).map((row, i) => <Cell key={i} before={<Avatar><Icon24Services /></Avatar>} asideContent={<Icon24FavoriteOutline />} description={row.pass}>{row.name}</Cell>)
    } else {
      list = <Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ничего не найдено</Footer>
      isFooter = true
    }

    this.state = {
      list: list,
      isFooter: isFooter
    }

    this.getWord = this.getWord.bind(this)
  }

  getWord() {
    const words = ['пароль', 'пароля', 'паролей']
    return `${JSON.parse(localStorage.list).length} ${words[this.getIndexByCount(JSON.parse(localStorage.list).length)]}`
  }
  getIndexByCount(c) {
    let i = 2;

    c = c.toString();
    if(c.slice(-1) === '1') {
      if(c.slice(-2) === '11') {
        i = 2;
      } else {
        i = 0;
      }
    } else if(c.slice(-1) === '2' || c.slice(-1) === '3' || c.slice(-1) === '4') {
      if(c.slice(-2) === '12' || c.slice(-2) === '13' || c.slice(-2) === '14') {
        i = 2;
      } else {
        i = 1;
      }
    } else if(c.slice(-1) === '5' || c.slice(-1) === '6' || c.slice(-1) === '7' || c.slice(-1) === '8' || c.slice(-1) === '9' || c.slice(-1) === '0') {
      i = 2;
    }

    return i;
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Список паролей</PanelHeader>
        <Group title={this.getWord()}>
          <Cell before={<Avatar size={48} style={{ background: 'transparent' }}><Icon28AddOutline fill="var(--accent)" /></Avatar>} onClick={() => this.props.changeView('add')}><span style={{ color: 'var(--accent)' }}>Добавить пароль</span></Cell>
          {!this.state.isFooter && this.state.list}
        </Group>
        {this.state.isFooter && this.state.list}
      </Panel>
    )
  }
}

export default Passwords;
