import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, FormLayout, FormStatus, Input, Button } from '@vkontakte/vkui';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

const osname = platform();

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      success: false,
      name: localStorage.nameDraft ? localStorage.nameDraft : '',
      pass: localStorage.passDraft ? localStorage.passDraft : ''
    }

    this.addPassword = this.addPassword.bind(this)
  }
  componentWillUnmount() {
    localStorage.nameDraft = this.state.name;
    localStorage.passDraft = this.state.pass;
  }

  addPassword() {
    if(this.state.name.length > 0 && this.state.pass.length > 0) {
      if(localStorage.list) {
        if(this.checkPassword(this.state.name)) {
          this.setState({
            success: false,
            status: <FormStatus state="error" title="Некорректное название">Аккаунт с таким именем уже существует! Выберите другое имя</FormStatus>
          })
        } else {
          try {
            let list = JSON.parse(localStorage.list);
            list.push({ name: this.state.name, pass: this.state.pass });
            localStorage.list = JSON.stringify(list);

            this.setState({
              success: true,
              status: <FormStatus title="Аккаунт добавлен">Вы успешно добавили аккаунт «{this.state.name}»</FormStatus>
            })
          } catch(e) {
            this.setState({
              success: false,
              status: <FormStatus state="error" title="Произошла ошибка">{e}</FormStatus>
            })
          }
        }
      } else {
        try {
          let list = [{ name: this.state.name, pass: this.state.pass }];
          localStorage.list = JSON.stringify(list);

          this.setState({
            success: true,
            status: <FormStatus title="Аккаунт добавлен">Вы успешно добавили аккаунт «{this.state.name}»</FormStatus>
          })
        } catch(e) {
          this.setState({
            success: false,
            status: <FormStatus state="error" title="Произошла ошибка">{e}</FormStatus>
          })
        }
      }
    } else {
      this.setState({
        success: false,
        status: <FormStatus state="error" title="Некорректно заполнены поля">Пожалуйста, введите валидные название аккаунта и пароль</FormStatus>
      })
    }
  }
  checkPassword(name) {
    if(localStorage.list) {
      let list = JSON.parse(localStorage.list);
      for(let i = 0; i < list.length; i++) {
        if(list[i].name !== name) continue;

        return true;
      }
    } else {
      return false;
    }
  }

  render() {
    return (
      <Panel id={this.props.id} theme="white">
        <PanelHeader left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? 'Отмена' : <Icon24Cancel />}</HeaderButton>}>Новый пароль</PanelHeader>
        <FormLayout>
          {this.state.status}
          <Input top="Название аккаунта" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
          <Input top="Пароль" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
          <Button size="xl" onClick={() => this.addPassword()}>Добавить</Button>
        </FormLayout>
      </Panel>
    );
  }
}

export default Add;
