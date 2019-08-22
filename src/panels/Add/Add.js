import React from 'react';
import {hot} from 'react-hot-loader';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderClose from '@vkontakte/vkui/dist/components/PanelHeaderClose/PanelHeaderClose';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import SelectMimicry from '@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      success: false,
      name: localStorage.nameDraft ? localStorage.nameDraft : '',
      pass: localStorage.passDraft ? localStorage.passDraft : '',
      favorite: false,
      chosen: props.chosen || 'default'
    }

    this.names = {
      default: 'Обычная',
      vk: 'ВКонтакте',
      fb: 'Facebook',
      google: 'Google',
      instagram: 'Instagram',
      twitter: 'Twitter',
      lj: 'Livejournal',
      skype: 'Skype',
      jh: 'Поиск работы'
    };

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
            list.push({ name: this.state.name, pass: this.state.pass, star: this.state.favorite, icon: this.names[this.state.chosen] ? this.state.chosen : 'default' });
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
          let list = [{ name: this.state.name, pass: this.state.pass, star: this.state.favorite, icon: this.names[this.state.chosen] ? this.state.chosen : 'default' }];
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
        <PanelHeader left={<PanelHeaderClose onClick={() => this.props.go('', true)} />}>Новый пароль</PanelHeader>
        <FormLayout>
          {this.state.status}
          <Input top="Название аккаунта" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
          <Input top="Пароль" type="password" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
          <SelectMimicry top="Выберите иконку" placeholder="Не выбрана" onClick={() => this.props.go('mimicry')}>
            {this.names[this.state.chosen] || ''}
          </SelectMimicry>
          <Checkbox onChange={e => this.setState({ favorite: e.target.checked })}>Добавить в избранное</Checkbox>
          <Button size="xl" onClick={() => this.addPassword()}>Добавить</Button>
        </FormLayout>
      </Panel>
    );
  }
}

export default hot(module)(Add);
