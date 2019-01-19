import React from 'react';
import { Div, Button } from '@vkontakte/vkui';

import Icon24Message from '@vkontakte/icons/dist/24/message';

class Footer extends React.Component {
  render() {
    return (
      <Div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          level="3"
          component="a"
          href="https://vk.me/passwordsapp"
          target="_blank"
          before={<Icon24Message/>}
        />
        <Button
          level="3"
          component="a"
          href="https://vk.com/passwordsapp"
          target="_blank"
        >
          Группа
        </Button>
        <Button
          level="3"
          component="a"
          onClick={this.props.openAbout}
        >
          О приложении
        </Button>
      </Div>
    );
  }
}

export default Footer;
