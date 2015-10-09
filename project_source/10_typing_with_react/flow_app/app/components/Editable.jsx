/* @flow */
import React from 'react';

export default class Editable extends React.Component {
  constructor(props: Object) {
    super(props);

    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.edit = this.edit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderValue = this.renderValue.bind(this);

    this.state = {
      editing: false
    };
  }
  render(): any {
    const {value, onEdit, ...props} = this.props;
    const editing = this.state.editing;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
  renderEdit(): any {
    return <input type="text"
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  }
  renderValue(): any {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.edit}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null }
      </div>
    );
  }
  renderDelete(): any {
    return <button className="delete" onClick={this.props.onDelete}>x</button>;
  }
  edit() {
    this.setState({
      editing: true
    });
  }
  checkEnter(e: Object) {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  finishEdit(e: Object) {
    this.props.onEdit(e.target.value);

    this.setState({
      editing: false
    });
  }
}
