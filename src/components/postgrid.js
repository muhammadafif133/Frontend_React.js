import React from 'react';

import LikeOutlined from '@ant-design/icons/LikeOutlined';
import LikeFilled from '@ant-design/icons/LikeFilled';

/**
 * @typedef {"filled" | "outlined"} theme
 * @typedef {"like"} iconType
 */
         
/**
 * Determine the icon to be displayed
 * 
 * @param {theme} theme - design of icon
 * @param {iconType} iconType - icon to show
 * @returns {Object} - the correct Ant Design icon component
 */
function getIcon (theme, iconType) {
  let Icon;

  if (theme === 'filled') {
    if (iconType === 'like') {
      Icon = LikeFilled
    } 
  } else if (theme === 'outlined') {
    if (iconType === 'like') {
      Icon = LikeOutlined
    }  }      
  }

  return Icon;
}
  
class PostIcon extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      selected: props.selected
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if (this.props.viewOnly) {
      console.log('This icon is view only: preventing update');
      return;
    }
    //reverse the selected state with every click
    this.setState({selected: !this.state.selected});
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.selected !== this.state.selected) {
      //run the handler passed in by the parent component
      this.props.handleToggle(this.state.selected);
    }
  }

  render(){
    const theme = this.state.selected ? 'filled' : 'outlined';
    const iconType = this.props.type;
    const Icon = getIcon(theme, iconType);

    //return a span that contains the desired icon
    //and a space then the counter
    //if the icon is clicked we will run onClick handler
    
    return (
      <span>
        <Icon
          onClick={this.onClick}
          style={{color:'steelblue'}} />
        {this.props.count}
      </span>
    );
  }
}

export default PostIcon;
