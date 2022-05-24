import { Component } from 'react';

type PropsType = {
	key: string;
	todo: Todo;
	deleteTodo: (id: string) => void;
	updateTodo: (todo: Todo) => void;
};

class TodoItem extends Component<PropsType> {
	render = () => {
		const { id, description, complete, priority } = this.props.todo;
		return (
			<div>
				<input
					type="checkbox"
					checked={complete}
					onChange={() =>
						this.props.updateTodo({
							id: id,
							description: description,
							complete: !complete,
							priority: priority,
						})
					}
				/>
				<span>{this.props.todo.description}</span>
				<select
					value={priority}
					onChange={(e) => {
						this.props.updateTodo({
							...this.props.todo,
							priority: e.target.value,
						});
					}}
				>
					<option value="LOW">Low</option>
					<option value="MEDIUM">Medium</option>
					<option value="HIGH">High</option>
				</select>
				<button onClick={() => this.props.deleteTodo(id)}>delete</button>
			</div>
		);
	};
}

export default TodoItem;
