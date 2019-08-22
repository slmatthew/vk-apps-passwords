import React from 'react';
import { hot } from 'react-hot-loader';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import ActionSheet from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import Alert from '@vkontakte/vkui/dist/components/Alert/Alert';
import { IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';

import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24LogoFacebook from '@vkontakte/icons/dist/24/logo_facebook';
import Icon24LogoGoogle from '@vkontakte/icons/dist/24/logo_google';
import Icon24LogoInstagram from '@vkontakte/icons/dist/24/logo_instagram';
import Icon24LogoLivejournal from '@vkontakte/icons/dist/24/logo_livejournal';
import Icon24LogoSkype from '@vkontakte/icons/dist/24/logo_skype';
import Icon24LogoTwitter from '@vkontakte/icons/dist/24/logo_twitter';
import Icon24LogoVk from '@vkontakte/icons/dist/24/logo_vk';
import Icon24Work from '@vkontakte/icons/dist/24/work';

import { copyTextToClipboard } from '../../helpers';

class Passwords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      count: '0 паролей'
    }

    this.getCount = this.getCount.bind(this);
  }
  componentDidMount() {
    if(localStorage.list) {
      let list = JSON.parse(localStorage.list),
          list1 = list.filter(item => item.star),
          list2 = list.filter(item => !item.star);

      list = list1.concat(list2);
      this.updateList(list);
    } else {
      this.updateList([]);
    }
  }

  updateList = list => {
    this.setState({ list });
    this.getCount(list);
  }
  updateItem = (name, star) => {
    let list = this.state.list;
    for(let i = 0; i < list.length; i++) {
      if(list[i].name !== name) continue;

      list[i].star = star;
      this.updateList(list);

      localStorage.list = JSON.stringify(list);
    }
  }

  getCount(list) {
    if(list.length > 0) {
      const words = ['пароль', 'пароля', 'паролей']
      this.setState({ count: `${list.length} ${words[this.getIndexByCount(list.length)]}` })
    } else {
      this.setState({ count: `0 паролей` })
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
        <ActionSheetItem autoclose onClick={() => this.handleClose('list')}>Редактировать порядок</ActionSheetItem>
        <ActionSheetItem autoclose theme="destructive" onClick={() => this.handleClose('delete')}>Удалить пароли</ActionSheetItem>
        {IS_PLATFORM_IOS && <ActionSheetItem autoclose theme="cancel">Отмена</ActionSheetItem>}
      </ActionSheet>
  })
  handleClose = (type) => {
    switch(type) {
      case 'edit': this.props.go('editpasswords'); break;

      case 'list': this.props.go('editlist'); break;

      case 'delete': this.props.go('deletepasswords'); break;

      default: console.error('неизвестное значение type:', type);
    }
  }

  launchPasswordActions = item => this.props.updateState({
    homePopout:
      <ActionSheet
        onClose={() => this.props.updateState({ homePopout: null })}
        title={`Аккаунт «${item.name}»`}
        text="Выберите действие"
      >
        <ActionSheetItem autoclose onClick={() => {
          if(copyTextToClipboard(item.pass)) {
            this.props.updateState({
              homePopout:
                <Alert
                  actions={[{
                    title: 'Понятно',
                    autoclose: true,
                    style: 'cancel'
                  }]}
                  onClose={() => this.props.updateState({ homePopout: null })}
                >
                  <h2>Пароль скопирован</h2>
                  <p>Вы успешно скопировали в буфер обмена пароль «{item.pass}»</p>
                </Alert>
            });
          } else {
            this.props.updateState({
              homePopout:
                <Alert
                  actions={[{
                    title: 'Понятно',
                    autoclose: true,
                    style: 'cancel'
                  }]}
                  onClose={() => this.props.updateState({ homePopout: null })}
                >
                  <h2>Упс!</h2>
                  <p>Не удалось скопировать пароль</p>
                </Alert>
            });
          }
        }}>Скопировать пароль</ActionSheetItem>
        <ActionSheetItem autoclose onClick={() => this.updateItem(item.name, !item.star)}>{item.star ? 'Удалить из избранного' : 'Добавить в избранное'}</ActionSheetItem>
        <ActionSheetItem autoclose onClick={() => {
          this.props.updateState({ currentItem: item });
          this.props.go('editpassword');
        }}>
          Редактировать аккаунт
        </ActionSheetItem>
        <ActionSheetItem autoclose theme="destructive" onClick={() => this.props.go('deletepasswords')}>Удалить аккаунт</ActionSheetItem>
        {IS_PLATFORM_IOS && <ActionSheetItem autoclose theme="cancel">Отмена</ActionSheetItem>}
      </ActionSheet>
  });

  render() {
    const drawIcon = (names, row) => {
      console.log('опа');

      switch(row.icon) {
        case 'default': default: return <Icon24Services />;
        case 'vk': return <Icon24LogoVk />;
        case 'fb': return <Icon24LogoFacebook />;
        case 'google': return <Icon24LogoGoogle />;
        case 'instagram': return <Icon24LogoInstagram />;
        case 'twitter': return <Icon24LogoTwitter />;
        case 'lj': return <Icon24LogoLivejournal />;
        case 'skype': return <Icon24LogoSkype />;
        case 'jh': return <Icon24Work />;
      }
    };

    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>Список паролей</PanelHeader>
        <Group>
          <Header level="2" aside={this.state.list.length > 0 ? <Link style={{ cursor: 'pointer' }} onClick={() => this.openActionSheet()}>Действия</Link> : null}>
            {this.state.count}
          </Header>
          <Cell before={<Avatar size={48} style={{ background: 'transparent' }}><Icon28AddOutline fill="var(--accent)" /></Avatar>} onClick={() => this.props.changeView('add')}><span style={{ color: 'var(--accent)' }}>Добавить пароль</span></Cell>
          {this.state.list.length > 0 && this.state.list.map((row, i) => (
            <Cell
              key={i}
              before={<Avatar>{['default', 'vk', 'fb', 'google', 'instagram', 'twitter', 'lj', 'skype', 'jh'].includes(row.icon) ? drawIcon(this.names, row) : <Icon24Services />}</Avatar>}
              asideContent={
                row.star ?
                <Icon24Favorite fill="#FFA000" /> :
                <Icon24FavoriteOutline />
              }
              description={row.pass}
              onClick={() => this.launchPasswordActions(row)}
            >
              {row.name}
            </Cell>
          ))}
        </Group>
        {this.state.list.length <= 0 && <Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ничего не найдено</Footer>}
      </Panel>
    );
  }
}

export default hot(module)(Passwords);
