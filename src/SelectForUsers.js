import React, { Component } from 'react';
import Select from 'react-select';



class SelectForUsers extends Component {

    render() {

        let options = [
            {value: 3, label: '3'},
            {value: 5, label: '5'},
            {value: 10, label: '10'}
        ];

        return (
            <div>
                <label>Users per page</label>
                <Select
                    name="form-field-name"
                    value={this.props.usersPerPage}
                    options={options}
                    onChange={this.props.settingUserPerPage}
                />
            </div>

        )
    }
}


export default SelectForUsers;
