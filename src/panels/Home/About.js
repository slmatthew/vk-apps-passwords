import React from 'react';
import { hot } from 'react-hot-loader';

import { Panel, PanelHeader, PanelHeaderBack, Footer, Group, Cell, Separator } from '@vkontakte/vkui';

import { MODAL_CARD_CHANGELOG } from '../../helpers';

import logo from '../../img/logo.png';

class About extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>О приложении</PanelHeader>
        <img className="Image Logo" src={logo} alt="Logotype"/>
        <Footer>Версия 1.2 (5)</Footer>
        <Group>
			    <Cell href="https://vk.com/write-175680326" target="_blank" expandable>Обратная связь</Cell>
			    <Cell href="https://vk.com/sbsrvc" target="_blank" expandable>Сообщество ВКонтакте</Cell>

          <Separator style={{ margin: '12px 0' }} />

          <Cell onClick={() => this.props.setActiveModal(MODAL_CARD_CHANGELOG)} expandable>Список изменений</Cell>
          <Cell href="https://github.com/slmatthew/vk-apps-passwords" target="_blank" expandable>Исходный код</Cell>
			  </Group>
      </Panel>
    );
  }
}

export default hot(module)(About);
