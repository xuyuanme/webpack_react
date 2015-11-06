// XXX: this is going to need https://github.com/DefinitelyTyped/DefinitelyTyped/pull/6205
import * as React from 'react';
// XXX: needs custom type definition?
import {DragSource, DropTarget} from 'react-dnd';
// XXX: cannot find module -> type itemTypes
import * as ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

class NoteProps {
  public connectDragSource: () => void;
  public connectDragTarget: () => void;
  public isDragging: boolean;
  public onMove: () => void;
  public id: string;
}

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component<NoteProps, any> {
  constructor(props: NoteProps) {
    super(props);
  }
  render() {
    // XXX: going to need https://github.com/Microsoft/TypeScript/issues/2103
    // or alternatively need to figure out a neat way to achieve the same
    // destructuring + function?
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, id, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
}
