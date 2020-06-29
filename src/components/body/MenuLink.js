import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import App from "../../App.css";


class MenuLink extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     id: this.props.pathname,
     index: this.props.index,
     triggerViewPortData: null,
     unTriggerViewPortData: null,
     active: false
   };
 }

 componentDidMount(){

   let index = this.props.index;
   let triggerViewPortData = this.props.triggerViewPortData;
   let unTriggerViewPortData = this.props.unTriggerViewPortData;

   this.setState({
     triggerViewPortData: triggerViewPortData,
     unTriggerViewPortData: unTriggerViewPortData
   })
 };

 componentWillReceiveProps(props) {
  if(props.windowScroll > this.state.triggerViewPortData) {


    // dirty code, need to change soon
    let triggerLastSection = this.props.triggerLastSection;
    var linkMenu =  document.getElementsByClassName("link_menu")
    var linkMenuArray = Array.prototype.slice.call(linkMenu);

    if(triggerLastSection < 0.99){
      linkMenuArray
      .map((ele, index) => {
        if(index === this.state.index){
          ele.style.fontWeight = "bolder"
        }else{
          ele.style.fontWeight = "100"
        }
      })
    }else{
      linkMenuArray
      .map((ele, index) => {
        if(index === 5){
          ele.style.fontWeight = "bolder"
        }else{
          ele.style.fontWeight = "100"
        }
      })
    }

  }else{
    return;
  }
}

changeStylingOnClick = () => {
  var linkMenu =  document.getElementsByClassName("link_menu")
  var linkMenuArray = Array.prototype.slice.call(linkMenu);
  linkMenuArray
  .map((ele, index) => {
      ele.style.fontWeight = "100"
  })
}

  render(){
    if(!this.state.triggerViewPortData){
      return null;
    }
    return (
      <div>
        <Link
          onClick={this.changeStylingOnClick}
          smooth to={`${window.location.pathname}#${this.props.pathname}`}>
          <span
            className="link_menu">
            {this.props.span}
          </span>
        </Link>
      </div>
    );
  }
}

export default MenuLink;
