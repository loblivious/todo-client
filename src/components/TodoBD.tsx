import { Component } from 'react';
import TodoItem from './TodoItem';

type PropsType = {
	todos: Todo[];
	deleteTodo: (id: string) => void;
	updateTodo: (todo: Todo) => void;
};

class TodoBD extends Component<PropsType> {
	render = () => {
		return (
			<div>
				{this.props.todos.map((item) => (
					<TodoItem
						key={item.id}
						todo={item}
						deleteTodo={this.props.deleteTodo}
						updateTodo={this.props.updateTodo}
					/>
				))}
			</div>
		);
	};
}

export default TodoBD;
