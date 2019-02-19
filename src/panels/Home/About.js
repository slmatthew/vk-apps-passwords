import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, Footer, Group, Cell } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import logo from '../../img/logo.png';
import '../Common.css';

const osname = platform();

class About extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>О приложении</PanelHeader>
        <img className="Image Logo" src={logo} alt="Logotype"/>
        <Footer>Public Beta 1, build 13 (original)</Footer>
        <Group>
			    <Cell href="https://vk.com/write-175680326" target="_blank">Обратная связь</Cell>
			    <Cell href="https://vk.com/sbsrvc" target="_blank">Сообщество ВКонтакте</Cell>
          <Cell href="https://github.com/slmatthew/vk-apps-passwords" target="_blank">Исходный код</Cell>
			  </Group>
      </Panel>
    );
  }
}

export default About;
