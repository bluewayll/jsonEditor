import React, { Component } from 'react';
import ObjectAttribute from './ObjectAttribute'

class Editor extends Component {

  constructor(props, context){
        super(props, context);
        this.state = {
            store: this.props.store.get(),
            original: this.props.original,
            storeHistory: [ this.props.store.get() ],
			      currentStore: 0
        };
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
  }

  componentDidMount() {
    let me = this;
    this.props.store.on('update', function( updated ){
			let storeHistory, nextIndex;
			if(updated !== me.state.storeHistory[me.state.currentStore]){
				nextIndex = me.state.currentStore + 1;
				storeHistory = me.state.storeHistory.slice( 0, nextIndex );
				storeHistory.push(updated);
				me.setState({
					storeHistory: storeHistory,
					currentStore: nextIndex
				});
        localStorage.setItem('store',JSON.stringify(storeHistory[nextIndex].json));
			}
			else {
				// The change has been already triggered by the state, no need of re-render
			}
		});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
          store: nextProps.store,
          original: nextProps.original
      });
  }

  undo() {
    if(this.state.currentStore > 0) {
      let nextIndex = this.state.currentStore - 1;
  		this.props.store.set( this.state.storeHistory[ nextIndex ] );
  		this.setState({ currentStore: nextIndex });
    }
	}

	redo() {
    if(this.state.storeHistory[ this.state.currentStore + 1 ]) {
      let nextIndex = this.state.currentStore + 1;
  		this.props.store.set( this.state.storeHistory[ nextIndex ] );
  		this.setState({ currentStore: nextIndex });
    }
	}

  render() {
    let store = this.state.storeHistory[this.state.currentStore];
    return (
      <div className="docEditor">
         <button onClick={this.undo}>undo </button>
         <button onClick={this.redo}>redo</button>
         <pre>{ JSON.stringify( store.json, null, '  ')}</pre>
         {this.state.store && this.state.original ?
           <ObjectAttribute value={ this.state.storeHistory[this.state.currentStore].json } original={ this.state.original.json }/>
           :
           <span>Loading..</span>
         }
			</div>
    );
  }
}

export default Editor;
