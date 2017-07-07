import React, { Component } from 'react';

class StringAttribute extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: !this.props.value,
			value: this.props.value,
			modified: false
    };
    this.setEditMode = this.setEditMode.bind(this);
    this.setValue = this.setValue.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if( this.state.editing && ! prevState.editing ){
			let node = this.refs.input;
			node.focus();
			node.value = node.value;
		}
  }

  componentDidMount() {
    if( this.state.editing ){
			let node = this.refs.input;
			node.focus();
			node.value = node.value;
		}
  }

  setEditMode() {
    this.setState({editing: true});
  }

  setValue() {
    if( this.state.modified ) {
      if(parseInt(this.state.value,10))
        this.props.parent.set(this.props.attrkey, parseInt(this.state.value,10) );
      else if(this.state.value === 'true' || this.state.value === 'false')
        this.props.parent.set(this.props.attrkey, this.state.value === 'true');
      else
        this.props.parent.set(this.props.attrkey, this.state.value );
    }
		this.setState({editing: false});
  }

  updateValue(e) {
    if(parseInt(this.state.value,10))
      this.setState({value: parseInt(e.target.value,10), modified: e.target.value !== this.props.value });
    else if(e.target.value === 'true' || this.state.value === 'false')
      this.setState({value: e.target.value === 'true', modified: e.target.value !== this.props.value });
    else
      this.setState({value: e.target.value, modified: e.target.value !== this.props.value });
  }

  handleKeyDown(e) {
    if( e.which === 13 )
			this.setValue();
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    let className = 'stringAttr';
		if( this.state.modified )
			className = ' modified';
		if( !this.state.editing )
			return <span onClick={ this.setEditMode } className={ className }>{ this.props.value }</span>;
		return <input value={ this.state.value } onChange={ this.updateValue } onBlur={ this.setValue } ref="input" onKeyDown={this.handleKeyDown} />;
  }
}

export default StringAttribute;
