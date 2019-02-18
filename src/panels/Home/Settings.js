import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Settings extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Заголовок</PanelHeader>
      </Panel>
    );
  }
}

export default Settings;
