import React, {Component} from 'react';
import './post-list-item.css';

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notChange: true,
            label: this.props.label
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.label !== this.props.label) {
            this.setState({label: this.props.label});
        }
    }

    enableСhange = () => {
        this.setState( ({notChange}) => {
            return {notChange: !notChange}
        })
    }

    handleInputChange = (event) => {
        const label = event.target.value;
        this.setState({label});
        this.props.onChangeInput(label, this.props.field);
    }

    render() {
        const {notChange, label} = this.state;
        const classes = notChange ? 'form form-control-plaintext' : 'form form-control';
        const confirm = notChange ? <i className="fa fa-pencil"></i> : 'ок';

        return (
            <div className='app-list-item d-flex justify-content-between'>
                <div 
                    className="d-flex app-list-item-label">
                        <input type="text" className={classes} readOnly={notChange} value={label} onChange={this.handleInputChange}></input>
                </div>
                <div className="d-flex">
                    <button 
                        type="button" 
                        onClick = {this.enableСhange}
                        className="btn-pencil btn-sm"> 
                        {confirm}
                    </button>
                    <button 
                        type="button" 
                        onClick = {() => this.props.onDelete(this.props.field)}
                        className="btn-trash btn-sm"> 
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}