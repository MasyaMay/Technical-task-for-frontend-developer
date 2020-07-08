import React, { Component } from 'react';
import PostListItem from '../post-list-item';
import SearchPanel from '../search-panel';
import PostAddForm from '../post-add-form';
import Service from '../services/services'
import Spinner from '../spinner';
import ErrorMessage from '../error';

export default class PostList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            term: '',
            count: null,
            loading: true,
            error: false
        }
        this.service = new Service();
    }

    async componentDidMount() {
        try {
            const contacts = await this.service.getContactsId(this.props.idItem);
            this.setState({contacts, count: contacts.length, loading: false});
        } catch {
            this.setState({error: true, loading: false});
        }
    }

    createContacts = () => {
        let filter = this.searchContacts(this.state.contacts, this.state.term);
        return filter.map((contact) => {
            return (
                <li key={contact[0]} className="list-group-item">
                    <PostListItem field={contact[0]} label={contact[1]} onDelete={this.delContact} onChangeInput={this.changeContact}/>
                </li>
            )
        })
    }

    searchContacts(contacts, term) {
        if (term.length === 0) {
            return contacts
        }
        const searchContacts = contacts.filter((contact) => {
            const str = contact[1] + "";
            return str.toLowerCase().indexOf(term) > -1
        })
        return searchContacts          
    }

    addContact = body => {
        this.setState(({contacts, count}) => {
            let newArr = [...contacts];
            newArr.push([`contacts${count+1}`, body])
            return {
                contacts: newArr, count: count + 1
            }
        });
    }

    changeContact = (label, field) => {
        const contacts = this.state.contacts.map(item => {
            return (item[0] === field) ? [field, label] : item;
        })
        this.setState({contacts});
    }

    delContact = field => {
        this.setState(({contacts}) => {
            const index = contacts.findIndex(item => item[0] === field),
                  newArr = [...contacts.slice(0, index), ...contacts.slice(index+1)];
            return {contacts: newArr}
        });
    }

    updateContacts = (term) => {
        this.setState({term});
    }

    render() {
        if (this.state.error) {return <ErrorMessage/>}
        if (this.state.loading) {return <Spinner/>}
        const contacts = this.createContacts();

        return (
            <>
                <div className="search-panel d-flex">
                    <SearchPanel post={this.state.post} onUpdatePost = {this.updateContacts}/>
                </div>
                <div className="app-list">
                    {contacts}
                </div>
                <PostAddForm onAddItem = {this.addContact}/>
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-5" onClick={ () => {this.props.defineLogin(null);} }>Выйти</button>
            </>
        );
    }
    
}