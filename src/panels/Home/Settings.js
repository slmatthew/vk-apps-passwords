import React from 'react';
import {hot} from 'react-hot-loader';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Switch from '@vkontakte/vkui/dist/components/Switch/Switch';

import Icon24Done from '@vkontakte/icons/dist/24/done';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }
  }
  componentDidMount() {
    const aviable = [
      {
        title: 'Обычная',
        theme: 'client_light'
      },
      {
        title: 'Тёмная',
        theme: 'client_dark'
      },
      {
        title: 'Светлая',
        theme: 'bright_light'
      },
      {
        title: 'Серая',
        theme: 'space_gray'
      }
    ];

    this.setState({ list: aviable });
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>Настройки</PanelHeader>
        {this.state.list.length > 0 &&
        <Group>
          <List>
            {this.state.list.map((row, i) => (
              <Cell asideContent={this.props.theme === row.theme ? <Icon24Done fill="var(--accent)"/> : null} onClick={() => this.props.updateTheme(row.theme)}>{row.title}</Cell>
            ))}
          </List>
        </Group>}
        {this.state.list.length > 0 &&
        <Group>
          <Cell asideContent={<Switch defaultChecked={localStorage.blockTheme === 'true'} onChange={() => {localStorage.blockTheme === 'true' ? localStorage.blockTheme = 'false' : localStorage.blockTheme = 'true'}} />}>Закрепить тему</Cell>
        </Group>}
      </Panel>
    );
  }
}

export default hot(module)(Settings);
