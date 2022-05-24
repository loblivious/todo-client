import React, { Component } from 'react';

type PropsType = {
	addTodo: (description: string, priority: string) => void;
};

class TodoHD extends Component<PropsType> {
	inputRef: React.RefObject<HTMLInputElement>;
	priorityRef: React.RefObject<HTMLSelectElement>;
	constructor(props: PropsType) {
		super(props);
		this.inputRef = React.createRef();
		this.priorityRef = React.createRef();
	}

	render = () => {
		return (
			<div>
				<input type="text" ref={this.inputRef} />
				<select name="priority" ref={this.priorityRef}>
					<option value="LOW">Low</option>
					<option value="MEDIUM">Medium</option>
					<option value="HIGH">High</option>
				</select>
				<button
					onClick={() => {
						this.props.addTodo(
							this.inputRef.current!.value,
							this.priorityRef.current!.value
						);
						this.inputRef.current!.value = '';
						this.priorityRef.current!.value = 'LOW';
					}}
				>
					Add Todo
				</button>
			</div>
		);
	};
}

export default TodoHD;
