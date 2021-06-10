import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import './index.css';
import reportWebVitals from './reportWebVitals';
import "whatwg-fetch";
import axios from "axios";

class App extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      TodoItem: "",
      recievedItem: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    
  }
  
  onChangeHandler(event){
    this.setState({
      todoItem: event.target.value
    });
  }
  
  onClickHandler(event){
    event.preventDefault();
    const todoItemSent = {
     todoItem: this.state.todoItem
    };
    
    axios.post("http://localhost:4000/app/items", todoItemSent);
   
    this.setState({
      todoItem: ""
    });
    window.location.reload();
  } 
  
  
componentWillMount(){
      axios.get("http://localhost:4000/app/tasks").then((res) => {
        if(res.data){
        this.setState({
      recievedItem : res.data
       })
      }
      })
  };  
    
  render(){
    const {recievedItem} = this.state;
    return(
      <React.Fragment>
      <nav className="bg-dark text-light">
      <h1 className="text-center" style={{textAlign: "center !important"}}>Todo</h1>
      </nav>
      <div className="container">
      <h1 className="mt-4 text-center">Start everyday success with todo</h1>
      <form method="post" className="form-horizontal">
      <input type="text" className="form-control " placeholder="Type your task here" value={this.state.todoItem} onChange={this.onChangeHandler}/>
      <input type="submit" className="btn  btn-dark form-control mt-2 mb-5" value="Add task" onClick={this.onClickHandler}/>
      </form>
      <div className= "card p-3 mb-5 pb-4">
     {
       recievedItem.map((val,key) => {
      return (<TodoItem task={val.todoItem} id={val._id} /> );
       })
    //   recievedItem
     }
     </div>
     <p className="text-muted text-center">Made by DevOlumide</p>
      </div>
      </React.Fragment>
      );
  }
}

function TodoItem (props){
  function deleteTask(id){
    axios.delete(`http://localhost:4000/app/deleteTask/${id}`);
    window.location.reload();
  }
    return (
      <div className="card p-2 mt-2">
      <div className="row">
      <div style={{color: "blue"}} className="col-8">
      {props.task}
      </div>
      <div className="col-2">
      <Button variant="dark" style={{width: "2rem", float: "right"}} className="p-0" onClick={() => deleteTask(props.id)}>
      &times;
      </Button>
      </div>
      <div className="col-2">
      <Button variant="outline-dark" style={{width: "2rem", float: "right"}} className="p-0 mx-2">
      &#9850;
      </Button>
      </div>
      </div>
      </div>
      );
  }
  
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
