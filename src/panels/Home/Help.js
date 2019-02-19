import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, Group, List, Cell, Alert, Footer } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import persik from '../../img/persik.png';
import '../Common.css';

const osname = platform();
const answers = require('./help.json');
const words = ['статья', 'статьи', 'статей'];
const index = (c) => {
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

class Help extends React.Component {
  openAlert = (title, text) => this.props.updateState({
    homePopout:
      <Alert
        actions={[{
          title: 'Понятно',
          autoclose: true,
          style: 'cancel'
        }]}
        onClose={() => this.props.updateState({ homePopout: null })}
      >
        <h2>{title}</h2>
        <p>{text}</p>
      </Alert>
  })

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Помощь</PanelHeader>
        <img className="Image Persik" src={persik} alt="Persik The Cat"/>
        <Group>
          <List>
            {answers.map((row, i) => (
              <Cell key={i} onClick={() => this.openAlert(row.title, row.text)}>{row.title}</Cell>
            ))}
          </List>
        </Group>
        <Footer>{`${answers.length} ${words[index(answers.length)]}`}</Footer>
      </Panel>
    );
  }
}

export default Help;
