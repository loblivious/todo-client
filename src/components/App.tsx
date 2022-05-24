import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import TodoHD from './TodoHD';
import TodoBD from './TodoBD';
import TodoFT from './TodoFT';
import { logger } from '../logger/logger';

type PropsType = {};

type StateType = {
	todos: Todo[];
	type: number;
	priorityState: number;
};

class App extends React.Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			todos: [],
			type: 1, // 1 - all, 2 - done, 3 - not done
			priorityState: 1, // 1 - all, 2 - low, 3 - medium, 4 - high
		};
	}

	componentDidMount() {
		logger.info('Getting all todo...');
		try {
			axios.get(BASE_URL).then((response) => {
				this.setState({
					todos: response.data.map((item: Todo) => ({
						id: item.id,
						description: item.description,
						complete: item.complete,
						priority: item.priority,
					})),
				});
			});
			logger.info('Todo retrieved');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				logger.error('An xhr error occurred', error);
			} else {
				logger.error('An unexpected error occurred', error);
			}
		}
	}

	deleteTodo = (id?: string) => {
		let url = id ? `${BASE_URL}/${id}` : BASE_URL;
		logger.warn('Deleting target todo(s)');
		try {
			axios.delete(url).then(() => {
				this.setState((prevState) => ({
					todos: id ? prevState.todos.filter((item) => item.id !== id) : [],
				}));
			});
			logger.warn('Todo(s) deleted');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				logger.error('An xhr error occurred', error);
			} else {
				logger.error('An unexpected error occurred', error);
			}
		}
	};

	addTodo = (description: string, priority: string) => {
		let newTodo: Todo = {
			id: 'null',
			description: description,
			complete: false,
			priority: priority,
		};
		logger.info('Adding todo...');
		try {
			axios.post(BASE_URL, newTodo).then((response) => {
				newTodo = { ...newTodo, id: response.data.id };
				this.setState({
					todos: [...this.state.todos, newTodo],
				});
			});
			logger.info('Todo added');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				logger.error('An xhr error occurred', error);
			} else {
				logger.error('An unexpected error occurred', error);
			}
		}
	};

	updateTodo = (updatedTodo: Todo) => {
		logger.info('Updating todo...');
		try {
			axios.put(`${BASE_URL}/${updatedTodo.id}`, updatedTodo).then(() => {
				this.setState((prevState) => ({
					todos: prevState.todos.map((todo) =>
						todo.id === updatedTodo.id
							? {
									...todo,
									complete: updatedTodo.complete,
									priority: updatedTodo.priority,
							  }
							: todo
					),
				}));
			});
			logger.info('Todo updated');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				logger.error('An xhr error occurred', error);
			} else {
				logger.error('An unexpected error occurred', error);
			}
		}
	};

	changeType = (type: number) => this.setState({ type });

	changePriority = (priorityState: number, priority?: string) => {
		let url = priority ? `${BASE_URL}?priority=${priority}` : BASE_URL;
		let priorityMessage = priority ? priority : 'all';
		logger.info(`Getting ${priorityMessage} priority todo...`);
		try {
			axios.get(url).then((response) => {
				this.setState({
					priorityState,
					todos: response.data.map((item: Todo) => ({
						id: item.id,
						description: item.description,
						complete: item.complete,
						priority: item.priority,
					})),
				});
			});
			logger.info('Todos retrieved');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				logger.error('An xhr error occurred', error);
			} else {
				logger.error('An unexpected error occurred', error);
			}
		}
	};

	render = () => {
		return (
			<div>
				<TodoHD addTodo={this.addTodo} />
				<TodoBD
					todos={this.state.todos.filter((item) => {
						if (this.state.type === 2) {
							return item.complete;
						} else if (this.state.type === 3) {
							return !item.complete;
						} else {
							return item;
						}
					})}
					deleteTodo={this.deleteTodo}
					updateTodo={this.updateTodo}
				/>
				<TodoFT
					type={this.state.type}
					priorityState={this.state.priorityState}
					todos={this.state.todos}
					changeType={this.changeType}
					changePriority={this.changePriority}
					deleteAll={this.deleteTodo}
				/>
			</div>
		);
	};
}

export default App;
