var React = require('react');
var ReactDOM = require('react-dom');

var Todo = React.createClass({
  render: function () {
    return (
      <div className="todo">
        <div className="todo-wrapper">
          <h1>TODOリスト</h1>
          <form className="todo-new" onSubmit={this.handleNewTask}>
            <input type="text" ref="new_task" className="todo-input" />
            <input type="submit"
              className="todo-new-submit button"
              value="登録"
            />
          </form>
          <h2>高</h2>
          <ul className="todo-tasks">
            {this.tasks2("high")}
          </ul>
          <h2>中</h2>
          <ul className="todo-tasks">
            {this.tasks2("middle")}
          </ul>
          <h2>低</h2>
          <ul className="todo-tasks">
            {this.tasks2("low")}
          </ul>
        </div>
      </div>
    );
  },

  tasks: function () {
    return this.state.tasks.map(function(task) {
      var handleClick = function() {
        this.handleDone(task);
      }.bind(this);
      var priority = "priority-middle";
      if (task.priority == "高") { priority = "priority-high"; }
      if (task.priority == "低") { priority = "priority-low"; }
      return (
        <li className="todo-task" key={task.id}>
          <div className={priority}>
            {task.priority}
            {task.name}
            <button className="todo-done button" onClick={handleClick}>
              完了
            </button>
          </div>
        </li>
      );
    }.bind(this));
  },

  tasks2: function (type) {
    console.log(this.state);
    return this.state[type].map(function(task) {
      var handleClick = function() {
        this.handleDone(task);
      }.bind(this);
      var priority = "priority-middle";
      var spanName = "中";
      if (task.priority == "高") { priority = "priority-high"; }
      if (task.priority == "低") { priority = "priority-low"; }
      return (

        <li className="todo-task" key={task.id}>
          <div className={priority}>
            <h4>{task.name}</h4>
            
            <button className="todo-done button" onClick={handleClick}>
              完了
            </button>
          </div>
        </li>
      );
    }.bind(this));
  },

  getInitialState: function() {
    return {tasks: [],low:[],middle:[],high:[] };
  },

  componentDidMount: function() {
    this.getTaskList();
  },

  getTaskList: function() {
    var self = this;
    var url = this.props.base + this.props.index_url;
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function(response){
        return response.json();
      })
      .then(function(tasks){

        var low = tasks.filter(function(task){
          return task.priority == "低"
        } );
        var middle = tasks.filter(function(task){
          return task.priority == "中"
        } );
        var high = tasks.filter(function(task){
          return task.priority == "高"
        } );
        
        self.setState({low:low});
        self.setState({middle:middle});
        self.setState({high:high});

        self.setState({tasks: tasks});
      })
      .catch(function(ex) {
        console.error(self.props.url, ex.toString());
      });
  },

  // 完了ボタンが押された
  handleDone: function(task) {
    var url = this.props.base + task.done_url;
    var self = this;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function(response){
        self.getTaskList();
      })
      .catch(function(ex) {
        console.error(self.props.url, ex.toString());
      });
  },

  // 登録ボタンが押された
  handleNewTask: function(e) {
    e.preventDefault();
    var url = this.props.base + this.props.create_url;
    var self = this;
    var new_task = ReactDOM.findDOMNode(this.refs.new_task);
    var body = JSON.stringify({name: new_task.value.trim()});
    fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function(response){
        new_task.value = "";
        self.getTaskList();
        return response.json();
      })
      .catch(function(ex){
        console.error(self.props.url, ex.toString());
      });
  }
});

module.exports = Todo;
