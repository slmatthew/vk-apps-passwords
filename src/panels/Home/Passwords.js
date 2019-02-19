import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, Group, Header, Cell, Avatar, Footer, Link, ActionSheet, ActionSheetItem } from '@vkontakte/vkui';

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

    let list, origList, isFooter = false;
    if(localStorage.list) {
      list = JSON.parse(localStorage.list);

      let list1 = list.filter(item => item.star);
      let list2 = list.filter(item => !item.star);

      origList = list1.concat(list2);

      list = list1.concat(list2);
      list = list.map((row, i) => <Cell key={i} before={<Avatar><Icon24Services /></Avatar>} asideContent={row.star ? <Icon24Favorite fill="#FFA000" onClick={() => this.updateItem(row.name, !row.star)} /> : <Icon24FavoriteOutline onClick={() => this.updateItem(row.name, !row.star)} />} description={row.pass}>{row.name}</Cell>)
    } else {
      list = <Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ничего не найдено</Footer>
      isFooter = true
      origList = []
    }

    this.state = {
      list: list,
      origList: origList,
      isFooter: isFooter
    }

    this.getWord = this.getWord.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }

  updateItem(name, star) {
    console.log(name, star);

    if(localStorage.list) {
      let list = JSON.parse(localStorage.list);
      for(let i = 0; i < list.length; i++) {
        if(list[i].name !== name) continue;

        list[i].star = star;

        let list1 = list.map((row, i) => <Cell key={i} before={<Avatar><Icon24Services /></Avatar>} asideContent={row.star ? <Icon24Favorite fill="#FFA000" onClick={() => this.updateItem(row.name, !row.star)} /> : <Icon24FavoriteOutline onClick={() => this.updateItem(row.name, !row.star)} />} description={row.pass}>{row.name}</Cell>)

        this.setState({ list: list1, origList: list, isFooter: false });

        localStorage.list = JSON.stringify(list);
      }
    } else {
      this.setState({
        isFooter: true,
        origList: [],
        list: <Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ничего не найдено</Footer>
      });
    }
  }

  getWord() {
    if(localStorage.list) {
      const words = ['пароль', 'пароля', 'паролей']
      return `${JSON.parse(localStorage.list).length} ${words[this.getIndexByCount(JSON.parse(localStorage.list).length)]}`
    } else {
      return `0 паролей`
    }
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

  openActionSheet = () => this.props.updateState({
    homePopout:
      <ActionSheet
        onClose={() => this.props.updateState({ homePopout: null })}
        title="Действия с паролями"
        text="Выберите желаемое действие"
      >
        <ActionSheetItem autoclose onClick={() => this.handleClose('edit')}>Редактировать пароли</ActionSheetItem>
        <ActionSheetItem autoclose theme="destructive" onClick={() => this.handleClose('delete')}>Удалить пароли</ActionSheetItem>
        {osname === IOS && <ActionSheetItem autoclose theme="cancel">Отмена</ActionSheetItem>}
      </ActionSheet>
  })
  handleClose = (type) => type === 'edit' ? console.log('edit') : this.props.go('deletepasswords')

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Список паролей</PanelHeader>
        <Group>
          <Header level="2" aside={<Link style={{ cursor: 'pointer' }} onClick={() => this.openActionSheet()}>Действия</Link>}>
            {this.getWord()}
          </Header>
          <Cell before={<Avatar size={48} style={{ background: 'transparent' }}><Icon28AddOutline fill="var(--accent)" /></Avatar>} onClick={() => this.props.changeView('add')}><span style={{ color: 'var(--accent)' }}>Добавить пароль</span></Cell>
          {!this.state.isFooter && this.state.list}
        </Group>
        {this.state.isFooter && this.state.list}
      </Panel>
    )
  }
}

export default Passwords;
