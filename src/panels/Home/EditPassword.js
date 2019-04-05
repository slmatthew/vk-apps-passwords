import React from 'react';
import {hot} from 'react-hot-loader';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';

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
        <PanelHeader addon={<HeaderButton onClick={() => this.props.go('', true)}>Назад</HeaderButton>} left={<PanelHeaderBack onClick={() => this.props.go('', true)} />}>Редактирование</PanelHeader>
        <FormLayout>
          {this.state.status}
          <Input top="Название аккаунта" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
          <Input top="Пароль" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
          <Checkbox onChange={e => this.setState({ star: e.target.checked })} defaultChecked={this.props.currentItem.star}>Добавить в избранное</Checkbox>
          <Button size="xl" onClick={() => this.handleClick()}>Сохранить</Button>
        </FormLayout>
      </Panel>
    );
  }
}

export default hot(module)(EditPasswords);
