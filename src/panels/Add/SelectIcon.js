import React from 'react';
import { hot } from 'react-hot-loader';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import Icon24LogoFacebook from '@vkontakte/icons/dist/24/logo_facebook';
import Icon24LogoGoogle from '@vkontakte/icons/dist/24/logo_google';
import Icon24LogoInstagram from '@vkontakte/icons/dist/24/logo_instagram';
import Icon24LogoLivejournal from '@vkontakte/icons/dist/24/logo_livejournal';
import Icon24LogoSkype from '@vkontakte/icons/dist/24/logo_skype';
import Icon24LogoTwitter from '@vkontakte/icons/dist/24/logo_twitter';
import Icon24LogoVk from '@vkontakte/icons/dist/24/logo_vk';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon24Work from '@vkontakte/icons/dist/24/work';

class SelectIcon extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>Выбор иконки</PanelHeader>
        <Group>
          <Cell
            before={<Icon24Services />}
            asideContent={this.props.chosen === 'default' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('default')}>Обычная</Cell>
          <Cell
            before={<Icon24LogoVk />}
            asideContent={this.props.chosen === 'vk' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('vk') & this.props.go('', true)}>ВКонтакте</Cell>
          <Cell
            before={<Icon24LogoFacebook />}
            asideContent={this.props.chosen === 'fb' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('fb') & this.props.go('', true)}>Facebook</Cell>
          <Cell
            before={<Icon24LogoGoogle />}
            asideContent={this.props.chosen === 'google' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('google') & this.props.go('', true)}>Google</Cell>
          <Cell
            before={<Icon24LogoInstagram />}
            asideContent={this.props.chosen === 'instagram' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('instagram') & this.props.go('', true)}>Instagram</Cell>
          <Cell
            before={<Icon24LogoTwitter />}
            asideContent={this.props.chosen === 'twitter' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('twitter') & this.props.go('', true)}>Twitter</Cell>
          <Cell
            before={<Icon24LogoLivejournal />}
            asideContent={this.props.chosen === 'lj' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('lj') & this.props.go('', true)}>Livejournal</Cell>
          <Cell
            before={<Icon24LogoSkype />}
            asideContent={this.props.chosen === 'skype' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('skype') & this.props.go('', true)}>Skype</Cell>
          <Cell
            before={<Icon24Work />}
            asideContent={this.props.chosen === 'jh' && <Icon24Done fill="var(--accent)" />}
            onClick={() => this.props.changeChosen('jh') & this.props.go('', true)}>Поиск работы</Cell>
        </Group>
      </Panel>
    );
  }
}

export default hot(module)(SelectIcon);