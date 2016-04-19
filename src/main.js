var React = require('react');
var ReactDOM = require('react-dom');
var Todo = require('./todo');

var Config = window.Config;

ReactDOM.render(
  <Todo
    base={Config.base_url}
    index_url={Config.index_url}
    create_url={Config.create_url} />,
  document.getElementById('todo-list')
);
