import React, { Component } from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    
  }

  addItem(e) {
    e.preventDefault();
    if (this._inputElement.value.trim() !== '') {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
        checked: false
      };
      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
    }
    this._inputElement.value = '';

  }

  deleteItem (key) {
    let filteredItems = this.state.items.filter((item) => {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }
  checkIfDone(key) {
    const findIndex = this.state.items.findIndex(item => item.key === key);
    const newState = this.state.items.map((item, index) => findIndex === index ? {...item, checked: !item.checked } : item);
    this.setState({items: newState});
  }

  deleteDone() {
    let remaningItems = this.state.items.filter((item) => {
      return (item.checked === false);
    });
    this.setState({items: remaningItems});
  }


  render() {
    return (
      <div className='todoContainer'>
        <header><h2>ToDo</h2></header>
        <div className='header'>
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a} 
                    placeholder='add task' />
            <button type='submit'>add</button>
          </form>
        </div>
        <TodoItems entries = {this.state.items} 
                   delete = {this.deleteItem}
                   handleClick = {(key) => this.checkIfDone(key)}
                   handleClear = {() => this.deleteDone()} />
      </div>
    )
  }
}

export default TodoList;