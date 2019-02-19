import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, Group, List, Cell, Switch } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Done from '@vkontakte/icons/dist/24/done';

const osname = platform();

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
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Настройки</PanelHeader>
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

export default Settings;
