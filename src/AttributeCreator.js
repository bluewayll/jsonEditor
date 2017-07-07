import React, { Component } from 'react';
import { typeDefaultValues } from './App'

class AttributeCreator extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      creating: false,
			attrkey: this.props.attrkey,
			type: 'string'
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeKey = this.changeKey.bind(this);
    this.createAttribute = this.createAttribute.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if( !prevState.creating && this.state.creating ){
			if( this.refs.keyInput )
				this.refs.keyInput.focus();
			else
				this.refs.typeSelector.focus();
		}
  }

  componentWillReceiveProps(newProps) {
		this.setState({attrkey: newProps.attrkey});
	}

	handleCreate(e) {
		e.preventDefault();
		this.setState({creating: true});
	}

	handleCancel(e) {
		e.preventDefault();
		this.setState({creating: false});
	}

	changeType(e) {
		this.setState({type: e.target.value});
	}

	changeKey(e) {
		this.setState({attrkey: e.target.value});
	}

	createAttribute() {
		this.setState({creating: false});
		var parent = this.props.parent,
			value = typeDefaultValues[ this.state.type ]
		;
		if( parent.constructor === Array )
			parent.push( value )
		else
			parent.set(this.state.attrkey, value );
	}

  render() {
    if( !this.state.creating )
			return <a href="#" onClick={this.handleCreate}>+ Add {this.props.type}</a>;
		let attrName;
		if( typeof this.props.attrkey !== 'undefined' )
			attrName =  <span className="attrName">{this.props.attrkey}:</span>;
		else {
			attrName = [
				<input key="0" ref="keyInput" type="text" value={this.state.value} onChange={this.changeKey}/>,
				<span key="1">:</span>
			];
		}
    return (
      <div className="hashAttribute">
  				{ attrName }
  				<select value={this.state.type} onChange={ this.changeType } ref="typeSelector">
  					<option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
  					<option value="array">List</option>
  					<option value="object">Object</option>
  				</select>
  				<button onClick={ this.createAttribute }>OK</button>,
  				<a href="#" className="cancelAttr" onClick={ this.handleCancel }>Cancel</a>
  		</div>
    );
  }
}

export default AttributeCreator;
