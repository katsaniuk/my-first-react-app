import { v4 as uuid } from 'uuid'
import React, { Component } from 'react'

export default class MyClassComponent extends Component {
    state = {
        todos: [
            { id: uuid(), name: 'Iaroslav' },
            { id: uuid(), name: 'Yuliia' },
            { id: uuid(), name: 'Stanislav' },
            { id: uuid(), name: 'Alex' }
        ],
        input: '',
        timer: 0
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({ timer: prevState.timer + 1 }));
        }, 1000);

        const lsTodos = localStorage.getItem('todos');
        if (!lsTodos) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
        } else {
            this.setState({ todos: JSON.parse(lsTodos) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const lsTodos = localStorage.getItem('todos');
        if (prevState.todos !== this.state.todos) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
        }

        if (!lsTodos || JSON.parse(lsTodos).length <= 0) {
            localStorage.clear();
        }
    }


    addTasks = () => {
        const newTodo = {
            id: uuid(),
            name: this.state.input
        }
        this.setState({ todos: [...this.state.todos, newTodo] });
        this.setState({ input: '' });
    }

    onChengeHandler = (e) => {
        const value = e.target.value;
        this.setState({ input: value });
    }

    handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            const newTodo = {
                id: uuid(),
                name: this.state.input
            }

            this.setState({ todos: [...this.state.todos, newTodo] });
            this.setState({ input: '' });
        }
    }

    todoDelete = (id) => {
        this.setState({ todos: this.state.todos.filter((element) => element.id !== id) })
    }

    // lears the data stored in localStorage.
    clearLocalStorage() {
        localStorage.clear();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return <>
            <h2>{this.state.timer}</h2>
            <input
                value={this.state.input}
                onChange={this.onChengeHandler}
                onKeyDown={this.handleEnterPress}
            />
            <button onClick={this.addTasks}>Add Todo</button>
            {this.state.todos.map((todo) =>
                <div key={todo.id}>
                    <p> {todo.id}: {todo.name}</p>
                    <button onClick={() => this.todoDelete(todo.id)}>Remove</button>
                </div>
            )}
            <button onClick={this.clearLocalStorage}>Clear localStorage</button>
        </>
    }
}
