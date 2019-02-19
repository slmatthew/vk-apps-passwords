import React from 'react';
import { platform, IOS, Panel, PanelHeader, HeaderButton, FormLayout, FormStatus, Input, Button, Checkbox } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class EditPasswords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      name: props.currentItem.name,
      pass: props.currentItem.pass,
      star: props.currentItem.star
    }

    this.handleClick = this.handleClick.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleClick() {
    if(this.state.name.length > 0 && this.state.pass.length > 0) {
      if(this.state.name !== this.props.currentItem.name || this.state.pass !== this.props.currentItem.pass || this.state.star !== this.props.currentItem.star) {
        if(localStorage.list) {
          if(this.checkPassword(this.state.name)) {
            this.setState({
              status: <FormStatus state="error" title="Некорректное название">Аккаунт с таким именем уже существует! Выберите другое имя</FormStatus>
            })
          } else {
            try {
              this.updateItem();
              this.setState({
                status: <FormStatus title="Аккаунт добавлен">Вы успешно изменили аккаунт «{this.props.currentItem.name}»</FormStatus>
              })
            } catch(e) {
              this.setState({
                status: <FormStatus state="error" title="Произошла ошибка">{e}</FormStatus>
              })
            }
          }
        } else {
          try {
            this.updateItem();
            this.setState({
              status: <FormStatus title="Аккаунт добавлен">Вы успешно изменили аккаунт «{this.props.currentItem.name}»</FormStatus>
            })
          } catch(e) {
            this.setState({
              status: <FormStatus state="error" title="Произошла ошибка">{e}</FormStatus>
            })
          }
        }
      } else {
        this.setState({
          status: <FormStatus state="error" title="Некорректно заполнены поля">Данные совпадают, мне нечего редактировать!</FormStatus>
        })
      }
    } else {
      this.setState({
        status: <FormStatus state="error" title="Некорректно заполнены поля">Пожалуйста, введите валидные название аккаунта и пароль</FormStatus>
      })
    }
  }
  updateItem = () => {
    if(localStorage.list) {
      let list = JSON.parse(localStorage.list);
      for(let i = 0; i < list.length; i++) {
        if(list[i].name !== this.props.currentItem.name) continue;

        list[i].name = this.state.name;
        list[i].pass = this.state.pass;
        list[i].star = this.state.star;

        localStorage.list = JSON.stringify(list);
      }
    }
  }

  checkPassword(name) {
    if(name === this.props.currentItem.name) return false;

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
        <PanelHeader addon={<HeaderButton onClick={() => this.props.go('', true)}>Назад</HeaderButton>} left={<HeaderButton onClick={() => this.props.go('', true)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}>Редактирование</PanelHeader>
        <FormLayout>
          {this.state.status}
          <Input top="Название аккаунта" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
          <Input top="Пароль" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
          <Checkbox onChange={e => this.setState({ star: e.target.checked })}>Добавить в избранное</Checkbox>
          <Button size="xl" onClick={() => this.handleClick()}>Добавить</Button>
        </FormLayout>
      </Panel>
    );
  }
}

export default EditPasswords;
