import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton } from '@vkontakte/vkui';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

const osname = platform();

class Settings extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? 'Отмена' : <Icon24Cancel />}</HeaderButton>}>Заголовок</PanelHeader>
      </Panel>
    );
  }
}

export default Settings;
