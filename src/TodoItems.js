import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.createItems = this.createItems.bind(this);
  }
  createItems(item, index) {
    return <li  key={item.key}>
              <div>
                <input type='checkbox' checked={item.checked} onClick={() => this.props.handleClick(item.key)} />
                <span className={item.checked ? 'done' : 'todo'}>{item.text}</span>
              </div>
              <span className='xButton' onClick={() => this.delete(item.key)}>&times;</span>
            </li>
  }
  delete(key) {
    this.props.delete(key);
  }
  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createItems);

    return (
      <div>
        <ul className='tasklist'>
          {listItems}
        </ul>
        <button className='clearAll' onClick={() => this.props.handleClear()}>Clear Done Items</button>
      </div>
    );
  }
}

export default TodoItem;