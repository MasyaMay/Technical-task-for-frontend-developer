import React, { Component } from 'react';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (event) => {
        const term = event.target.value.toLowerCase();
        this.setState({term});
        this.props.onUpdatePost(term);
    }
    
    render() {
        return (
            <input
                className = "form-control search-input"
                type = "text"
                placeholder = "Поиск по записям"
                onChange = {this.onUpdateSearch}
            />
        )
    }
}