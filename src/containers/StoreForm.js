import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Form from "../components/Form";
import * as changeDataForm from '../actions/FormActions';

class StoreForm extends Component {
    render() {
        return <Form {...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        formData: state.formReducers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(changeDataForm, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreForm);