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
   // if there's no mockDataTweets props, return a loading sign
   if(!this.props.mockDataTweets){
     return "loading"
   }else{
     // otherwise, get the mockDataTweets and map through them.
     let formattedData = this.props.mockDataTweets
     .map((ele, index) => {
       return {
         data: ele.randomString,
         visible: true,
         animation: true
       }
     }).slice(0, this.state.counter+1);

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
   this.setState({
     counter: this.state.counter+1
   }, () => {


     let formattedData = [
       {
         data: "fvdfvfdv",
         visible: true,
         animation: false
       },
       {
         data: "hello world",
         visible: true,
         animation: true
       }
     ]

     this.setState({
       tweetsArray: formattedData
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
