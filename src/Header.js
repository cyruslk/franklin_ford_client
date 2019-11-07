import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import './App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      pageYOffset: 0,
      width: 0,
      height: 0
    };
  };

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  scrollToTop =() => {
     scroll.scrollToTop();
   }


  handleScroll = () => {
    this.setState({
      pageYOffset: window.pageYOffset
    })
  }

  reloadWebsite = () => {
    return window.location.reload()
  }

  renderHoveredRight = () => {
    if(this.props.hoveredData){
      const hoveredData=this.props.hoveredData
      return(
        <div>{hoveredData.gsx$description.$t}</div>
      )
    }else{
      return null;
    }
  }


  renderProjectInfo = () => {
    if(this.props.horizontalPage
      && !this.props.isSeeMenu
      && !this.props.isTriggerLighBox){
      if(this.props.isDisplayedProjectInfo){
        return null;
      }else{
        return(
          <div>
            <span
              className="horizontal_page_info"
              onClick={this.props.enableProjectInfo}>
                PROJECT INFO
            </span>
          </div>
        )
      }
    }else{
      return null;
    }
  }

  renderHeadlineRight = () => {
    if(!this.props.isSeeMenu){
      return (
        <div className="index_menu">
          <h1
            onClick={this.props.toggleMenu}>
            Project Index
          </h1>
        </div>
      )
    }else if(this.props.isSeeMenu){
      return (
        <div className="index_menu">
          <h1 onClick={this.props.toggleMenuEnableHomePage}>
            Close Index
          </h1>
        </div>
      )
    }else{
      return null;
    }
  }

  renderMainInfoHeader = () => {
    if(this.props.isFullBackgroundHomePage === true){
      return null;
    }else if(this.props.isDisplayedProjectInfo
      && !this.props.isSeeMenu
      && this.props.horizontalPage){
      return this.renderMenuOnMobile()
    }else{

      const additionalInfo = this.props.info_page[0].gsx$othertexts.$t.split("¬")
      return (
        <header>
          <div>
            <h1
              onClick={this.reloadWebsite}>
              Frédérique B. Ste-Marie
            </h1>
            <span
              onClick={this.reloadWebsite}>
              {additionalInfo[1]}
            </span>
              {this.renderHorizontalArrow()}
          </div>
          <div>
            {this.renderHeadlineRight()}
            {this.renderProjectInfo()}
          </div>
        </header>
      )
    }
  }

  renderMenuOnMobile = () => {
    if(this.state.width <= 700){
      return (
        <div
          style={{color: "white"}}
          onClick={this.props.toggleMenu}
          className="mobile_menu_project_pages">
            Back to Project Index
        </div>
      )
    }else{
      return null;
    }
  }

   renderHorizontalArrow = () => {
     if(this.props.horizontalPage
       && this.props.width > 600
       && !this.props.isSeeMenu){
       return(
         <span>
             <div className="triangle"></div>
         </span>
       )
     }else{
       return null;
     }
  }

  toggleMobileDesktop = () => {
    if(this.state.width > 700){
      return (
        <div className="header_container">
          {this.renderMainInfoHeader()}
        </div>
      )
    }else{
      return (
        <div className="header_container">
          {this.renderMainInfoHeader()}
        </div>
      )
    }
  }

  render() {

      if(!this.props){
        return(
          <div>loading</div>
        )
      }else{
          return (
            this.toggleMobileDesktop()
          )
        }
  }
}

export default Header;
