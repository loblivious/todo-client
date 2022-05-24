import { Component } from 'react';

type PropsType = {
	type: number;
	priorityState: number;
	todos: Todo[];
	changeType: (type: number) => void;
	changePriority: (priorityState: number, priority?: string) => void;
	deleteAll: (id?: string) => void;
};

class TodoFT extends Component<PropsType> {
	render = () => {
		const { todos } = this.props;
		return (
			<div>
				<div>
					<button
						onClick={() => this.props.changeType(1)}
						className={this.props.type === 1 ? 'active' : 'null'}
					>
						show all ({todos.length})
					</button>
					<button
						onClick={() => this.props.changeType(2)}
						className={this.props.type === 2 ? 'active' : 'null'}
					>
						show dones ({todos.filter((todo) => todo.complete).length})
					</button>
					<button
						onClick={() => this.props.changeType(3)}
						className={this.props.type === 3 ? 'active' : 'null'}
					>
						show not dones ({todos.filter((todo) => !todo.complete).length})
					</button>
				</div>
				<div>
					<button
						onClick={() => this.props.changePriority(1)}
						className={this.props.priorityState === 1 ? 'active' : 'null'}
					>
						show all priorities
					</button>
					<button
						onClick={() => this.props.changePriority(2, 'low')}
						className={this.props.priorityState === 2 ? 'active' : 'null'}
					>
						show low priorities
					</button>
					<button
						onClick={() => this.props.changePriority(3, 'medium')}
						className={this.props.priorityState === 3 ? 'active' : 'null'}
					>
						show medium priorities
					</button>
					<button
						onClick={() => this.props.changePriority(4, 'high')}
						className={this.props.priorityState === 4 ? 'active' : 'null'}
					>
						show high priorities
					</button>
				</div>
				<button onClick={() => this.props.deleteAll()}>clear all</button>
			</div>
		);
	};
}

export default TodoFT;
