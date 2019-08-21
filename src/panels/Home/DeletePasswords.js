import React from 'react';
import { hot } from 'react-hot-loader';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';

class DeletePasswords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      count: '0 паролей'
    };

    this.getCount = this.getCount.bind(this);
  }
  componentDidMount() {
    if(localStorage.list) {
      let list = JSON.parse(localStorage.list),
          list1 = list.filter(item => item.star),
          list2 = list.filter(item => !item.star);

      list = list1.concat(list2);

      this.setState({ list });
      this.getCount(list);
    } else {
      this.setState({ list: [] });
      this.getCount([]);
    }
  }

  showCell = (row, i) => <Cell key={i} removable={true} onRemove={() => {
    let list = this.state.list;
    let updated;

    if(list.length > 0) {
      updated = [...list.slice(0, i), ...list.slice(i + 1)];

      if(updated.length > 0) {
        this.setState({ list: updated });
        this.getCount(updated);
      } else {
        updated = [];

        this.setState({ list: updated });
        this.getCount(updated);
      }
    } else {
      updated = [];

      this.setState({ list: updated });
      this.getCount(updated);
    }

    localStorage.list = JSON.stringify(updated);
  }}>{row.name}</Cell>

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

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader addon={<HeaderButton onClick={() => this.props.go('', true)}>Назад</HeaderButton>} left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>Удалить пароли</PanelHeader>
        <Group>
          <Header level="2">
            {this.state.count}
          </Header>
          {this.state.list.length > 0 && this.state.list.map((row, i) => this.showCell(row, i))}
        </Group>
        {this.state.list.length <= 0 && <Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ничего не найдено</Footer>}
      </Panel>
    )
  }
}

export default hot(module)(DeletePasswords);
