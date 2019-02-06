import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

class MainHome extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		go: PropTypes.func.isRequired,
		fetchedUser: PropTypes.shape({
			photo_200: PropTypes.string,
			first_name: PropTypes.string,
			last_name: PropTypes.string,
			city: PropTypes.shape({
				title: PropTypes.string,
			}),
		}),
	};

	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Example</PanelHeader>
				{this.props.fetchedUser &&
				<Group title="User Data Fetched with VK Connect">
					<ListItem
						before={this.props.fetchedUser.photo_200 ? <Avatar src={this.props.fetchedUser.photo_200}/> : null}
						description={this.props.fetchedUser.city && this.props.fetchedUser.city.title ? this.props.fetchedUser.city.title : ''}
					>
						{`${this.props.fetchedUser.first_name} ${this.props.fetchedUser.last_name}`}
					</ListItem>
				</Group>}

				<Group title="Navigation Example">
					<Div>
						<Button size="xl" level="2" onClick={() => this.props.changeView('adding')}>
							Show me the Persik, please
						</Button>
					</Div>
				</Group>
			</Panel>
		);
	}
}

export default MainHome;
