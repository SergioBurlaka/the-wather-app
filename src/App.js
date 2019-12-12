

import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import UsersTable from './UsersTable';
import AddUser from './addUser';
import CurrencyCalculator from './CurrencyCalculator';
import {  Pagination } from 'react-bootstrap';


import SelectForUsers from './SelectForUsers';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            usersPerPage: 3,
            pages: 1,
            activePage: 1,
            usersToShow:[]
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.settingUserPerPage = this.settingUserPerPage.bind(this);
        this.calculPages = this.calculPages.bind(this);
        this.getPageToShow = this.getPageToShow.bind(this);
        this.handleSelectActivePage = this.handleSelectActivePage.bind(this);
    }


    calculPages(usersPerPage){
        let pages = Math.ceil(this.state.users.length/usersPerPage);
        this.setState( { pages: pages });

    }


    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                this.setState({users: res.data});
                this.calculPages(this.state.usersPerPage);
                this.getPageToShow(1)
            });
    }

    deleteUser(userId) {

        this.setState({users: this.state.users.filter((item, i) => item.id !== userId)},
            ()=> {
                this.calculPages(this.state.usersPerPage);
                this.getPageToShow(this.state.activePage);

                if (this.state.usersToShow.length === 1) {
                    this.setState({activePage: this.state.activePage - 1}, ()=> {
                        this.getPageToShow(this.state.activePage);
                    });

                }
            }
        );

    }

    addUser(newUser) {
        this.state.users.push(newUser);
        this.setState({users: this.state.users},() =>{
            this.getPageToShow(this.state.activePage);
            this.calculPages(this.state.usersPerPage)
        });

    }

    settingUserPerPage(e){

        if(!e){
            this.setState( {usersPerPage : 3});
            this.calculPages(3);
            this.setState( {activePage : 1}, () =>{
                this.getPageToShow(this.state.activePage);
            });

            return
        }
        this.setState( {usersPerPage : e.value});
        this.calculPages(e.value);
        this.setState( {activePage : 1}, () =>{
            this.getPageToShow(this.state.activePage);
        });



    }



    getPageToShow(activePage){
        let userPerPage = this.state.usersPerPage;
        let startItemOnPage = (activePage-1)*userPerPage;
        let endItemOnPage = (activePage-1)*userPerPage+userPerPage;
        let usersToShow = this.state.users.slice(startItemOnPage, endItemOnPage);

        this.setState({usersToShow: usersToShow});
    }


    handleSelectActivePage(curentPage) {
        this.setState({activePage: curentPage});
        this.getPageToShow(curentPage);

    }




    render() {

      return (
          <div className="container">
              <UsersTable
                  deleteUser={this.deleteUser}
                  items={this.state.usersToShow}
              />
              <p className='allUsers'>
                  All users: {this.state.users.length}
              </p>
              <div className="users-Select">
                  <SelectForUsers
                      usersPerPage={this.state.usersPerPage}
                      settingUserPerPage={this.settingUserPerPage}
                  />
              </div>
              <div className="Users-Table-Pagination">
                  <Pagination
                      prev
                      next
                      first
                      last
                      ellipsis
                      boundaryLinks
                      items={this.state.pages}
                      maxButtons={5}
                      activePage={this.state.activePage}
                      onSelect={this.handleSelectActivePage}/>
              </div>
              <AddUser addUser={this.addUser} users={this.state.users}
              />
              <CurrencyCalculator/>
          </div>
      )
  }
}

export default App;
