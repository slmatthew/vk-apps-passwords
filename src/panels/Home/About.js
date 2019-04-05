import React from 'react';
import {hot} from 'react-hot-loader';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import logo from '../../img/logo.png';
import '../Common.css';

class About extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>О приложении</PanelHeader>
        <img className="Image Logo" src={logo} alt="Logotype"/>
        <Footer>Версия 1.1 (1)</Footer>
        <Group>
			    <Cell href="https://vk.com/write-175680326" target="_blank">Обратная связь</Cell>
			    <Cell href="https://vk.com/sbsrvc" target="_blank">Сообщество ВКонтакте</Cell>
          <Cell href="https://github.com/slmatthew/vk-apps-passwords" target="_blank">Исходный код</Cell>
			  </Group>
      </Panel>
    );
  }
}

export default hot(module)(About);
