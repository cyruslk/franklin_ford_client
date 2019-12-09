import React, { Component, PropTypes } from 'react';
import FirstFoldTweetsContainer from "./FirstFoldTweetsContainer.js"
import App from "./App.css";


class FirstFold extends React.Component {


  constructor(props) {
   super(props);
   this.state = {
     tweetsArray: null,
     counter: 0
   };
 }

 componentDidMount(){
   if(!this.props.mockDataTweets){
     return "loading"
   }else{
     let formattedData = this.props.mockDataTweets
     .map((ele, index) => {
        if(index === this.state.counter){
          return {
            index: index,
            data: ele.randomString,
            visible: true,
            animation: true
          }
        }else{
          return {
            index: index,
            data: ele.randomString,
            visible: false,
            animation: false
          }
        }
     })


     this.setState({
       tweetsArray: formattedData
     })
   }
 }


renderFirstFoldTweetsList = () => {
   if(!this.state.tweetsArray){
     return null
   }
   return this.state.tweetsArray
   .map((ele, index) => {
     return (
       <FirstFoldTweetsContainer
          changeTweetsArray={this.changeTweetsArray}
          data={ele}
          key={index}
      />
     )
   })
 }

 changeTweetsArray = () => {
   setTimeout(this.updateStateCounter, 3000);
 }

 updateStateCounter = () => {
   this.setState({
     counter: this.state.counter+1
   }, () => {

     let formattedDataUpdated = this.props.mockDataTweets
     .map((ele, index) => {
        if(index < this.state.counter){
          return {
            index: index,
            data: ele.randomString,
            visible: true,
            animation: false
          }
        }else if(index === this.state.counter){
          return {
            index: index,
            data: ele.randomString,
            visible: true,
            animation: true
          }
        }else{
          return {
            index: index,
            data: ele.randomString,
            visible: false,
            animation: false
          }
        }
     })


     this.setState({
       tweetsArray: formattedDataUpdated
     }, () => {
       return this.renderFirstFoldTweetsList()
     })
   })
 }



  render(){
    return (
      <main className="first_fold_container">
          <div className="typed_tweets">
            {this.renderFirstFoldTweetsList()}
          </div>
          <div className="displayed_metadata">
        </div>
      </main>
    );
  }
}

export default FirstFold;
