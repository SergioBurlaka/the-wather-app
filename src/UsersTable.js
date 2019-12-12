import React, { Component } from 'react';
import './App.css';
import {  Modal,  Button } from 'react-bootstrap';




class UsersTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalWindow: false,
            userId: null,
            userName: null
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    showModal(userId, userName){
        this.setState( () => ({
            showModalWindow: true,
            userId: userId,
            userName: userName
        }));
    }

    hideModal(){
        this.setState( () => ({
            showModalWindow: false
        }));
    }

    deleteUser(){
       this.hideModal();
        let userId = this.state.userId;
        this.props.deleteUser(userId);
    }


    render() {

        let templateModal ;

        if(this.state.showModalWindow){
             templateModal = (
                <div >
                    <Modal.Dialog >
                        <Modal.Header>
                            <Modal.Title>Deleting a user</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Do you want to delete <span className="userName"> {this.state.userName}</span>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.hideModal.bind(this)}>Cancel</Button>
                            <Button bsStyle="primary" onClick={this.deleteUser.bind(this)}>Delete user</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            );
        }



        var data = this.props.items;
        var newsTemplate;

        if(data.length > 0){
            newsTemplate = data.map( (item, index) => {
                return (

                    <tr key={item.id} >
                        <td> {item.name} </td>
                        <td> {item.email}  </td>
                        <td> {item.phone} </td>
                        <td> {item.company.name}  </td>
                        <td> <button className='btn btn-danger' onClick={this.showModal.bind(this,item.id, item.name)}> delete </button>  </td>
                    </tr>

                )
            });
        }else{
            newsTemplate = (
                <tr>
                    <td>
                        <p>no users</p>
                    </td>
                </tr>
            )
        }

        return (
            <div className="news">
                <h1>Users</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Work place</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {newsTemplate}
                    </tbody>

                </table>
                {templateModal}

            </div>
        )
    }
}



export default UsersTable;
