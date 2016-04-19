var React = require('react');
var ReactDOM = require('react-dom');
var jQuery = require('jquery');
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
          <ul className="todo-tasks">
            {this.tasks()}
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

  getInitialState: function() {
    return {tasks: []};
  },

  componentDidMount: function() {
    this.getTaskList();
  },

  getTaskList: function() {
    jQuery.ajax({
      url: this.props.base + this.props.index_url,
      dataType: 'json',
      success: function(data) {
        this.setState({tasks: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  // 完了ボタンが押された
  handleDone: function(task) {
    jQuery.ajax({
      url: this.props.base + task.done_url,
      dataType: 'json',
      type: "POST",
      success: function(data) {
        this.getTaskList();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  // 登録ボタンが押された
  handleNewTask: function(e) {
    e.preventDefault();
    var new_task = ReactDOM.findDOMNode(this.refs.new_task);
    var data = {name: new_task.value.trim()};
    jQuery.ajax({
      url: this.props.base + this.props.create_url,
      dataType: 'json',
      type: "POST",
      data: data,
      success: function(data) {
        new_task.value = "";
        this.getTaskList();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = Todo;
