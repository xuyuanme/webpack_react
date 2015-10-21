import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';

@DragLayer((monitor) => {
  const item = monitor.getItem();
  const sourceOffset = monitor.getSourceClientOffset();

  return {
    task: item && item.task,
    currentOffset: sourceOffset,
    isDragging: monitor.isDragging()
  };
})
export default class NotePreview extends React.Component {
  render() {
    const {isDragging, currentOffset, task, ...props} = this.props;

    if(!isDragging) {
      return null;
    }

    return <div className="note note-preview"
      style={this.getStyle(currentOffset)} {...props}>
        {task}
      </div>;
  }
  getStyle(offset) {
    if(!offset) {
      return {
        display: 'none'
      };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    //const transform = `translate(${offset.x}px, ${offset.y}px)`;
    // transform doesn't work due to the layout (translates below kanban!!!)

    return {
      pointerEvents: 'none',
      position: 'absolute',
      top: `${offset.y}px`,
      left: `${offset.x}px`
      /*
      transform: transform,
      WebkitTransform: transform*/
    };
  }
}
