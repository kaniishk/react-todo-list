import React, { Component } from 'react';
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


import "bootstrap/dist/css/bootstrap.min.css";
import {v1 as uuid} from "uuid";

class App extends Component{

    state={
      items: [],
      item: '',
      id: uuid(),
      editItem: false
    }
    

  handleChange = (e)=>{
    this.setState({
      item: e.target.value
    });
  }

  handleSubmit = (e)=>{
   e.preventDefault();

   const newItem = {
     id: this.state.id,
     title: this.state.item
   } ;

   const updatedItems = this.state.items;
   updatedItems.push(newItem);
   this.setState({
     items: updatedItems,
     item: '',
     id: uuid(),
     editItem: false
   });
  
  }

  clearList = () =>{
      this.setState({
        items: []
      })
  }

  handleDelete = (id) =>{
    const filterItems=this.state.items.filter(item=>
      item.id !== id);
    this.setState({
      items: filterItems
    })
  }

  handleEdit = (id) =>{
    if (!this.state.editItem) {
    const filterItems=this.state.items.filter(item=>
      item.id !== id);

      const selectedItem=this.state.items.filter(item=>
        item.id === id);
        
    this.setState({
      items: filterItems,
      item: selectedItem[0].title,
      editItem:true,
      id:id
    })
  }
  }
  render(){
    return(
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-4">
            <h1 className="text-capialize text-center alert-warning">Todo List</h1>
            <TodoInput 
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
           
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
            </div>
          </div>
        </div>

       
    );
  }
}


export default App;
