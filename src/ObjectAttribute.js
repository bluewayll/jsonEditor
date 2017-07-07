import React, { Component } from 'react';
import Attribute from './Attribute';
import AttributeCreator from './AttributeCreator';

class ObjectAttribute extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    let keys = Object.keys( this.props.value ),
		className = this.state.editing ? 'open objectAttr compoundAttr' : 'objectAttr compoundAttr',
		openHash = '';
		let attrs = [];
		for( let attr in this.props.value ){
			attrs.push(
				<Attribute
					parent={ this.props.value }
					value={this.props.value[attr]}
					original={this.props.original[attr]}
					key={ attr }
					attrkey={ attr }
				/>
			);
		}
		openHash = (<div className="attrChildren">
			{attrs}
			<AttributeCreator type="attribute" parent={ this.props.value } />
		</div>);
    return (
      <span className={ className }>
  			<span onClick={ this.toggleEditing } className="hashToggle">Map [{ keys.length }]</span>
  			{openHash}
  	  </span>
    );
  }
}

export default ObjectAttribute;
