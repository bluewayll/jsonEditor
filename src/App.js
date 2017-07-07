import React, { Component } from 'react';
import Freezer from 'freezer-js';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor';
import ObjectAttribute from './ObjectAttribute';
import StringAttribute from './StringAttribute';
import ArrayAttribute from './ArrayAttribute';

let json = {
    string: 'this is a string',
    object: {string: 'this is a string'},
    array: ['a', 'b', {c: 1}, 'd']
};

if(localStorage.getItem('store')) {
  json = JSON.parse(localStorage.getItem('store'));
}

const frozen = new Freezer( { json: json });

const guessType = function( value ){
	let type = typeof value;
	if( type !== 'object' )
		return type;
	if( value instanceof Array )
		return 'array';
	if( value instanceof Date)
		return 'date';
	return 'object';
};

export const typeDefaultValues = {
	string: '',
	object: {},
	array: [],
  number: 0,
  boolean: ''
}

export const createAttribute = function( value, original, parent, key ){
	let type = guessType( value ),
	className = StringAttribute;
	if( type === 'object' )
		className = ObjectAttribute;
	else if( type === 'array' )
		className = ArrayAttribute;
	if( typeof original === 'undefined' )
		original = typeDefaultValues[ type ];
	return React.createElement(className, {
		value: value,
		attrkey: typeof key !== 'undefined' ? key : '',
		parent: parent,
		original: original
	});
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>JSON EDITOR</h2>
        </div>
        <div className="App-intro">
          <Editor store={ frozen } original={ frozen.get() } />
        </div>
      </div>
    );
  }
}

export default App;
