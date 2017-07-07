import React, { Component } from 'react';
import { createAttribute } from './App'

class Attribute extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
    e.preventDefault();
		if( this.props.parent.constructor === Array )
			this.props.parent.splice( this.props.attrkey, 1 );
		else
			this.props.parent.remove( this.props.attrkey );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value || nextProps.parent !== this.props.parent;
  }

  render() {
		let typeAttribute = createAttribute( this.props.value, this.props.original, this.props.parent, this.props.attrkey ),
		modifiedClass = this.props.value === this.props.original ? '' : ' modified',
		className = 'hashAttribute' + modifiedClass;
    return (
      <div className={className}>
				<a href="#" className="attrRemove" onClick={ this.handleRemove }>[x]</a>
				<span className="attrName">{this.props.attrkey }:</span>
				<span className="attrValue">{ typeAttribute }</span>
			</div>
    );
  }
}

export default Attribute;
