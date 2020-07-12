import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchCollections } from '../redux/ActionCreators';
import Collection from './CollectionComponent';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        collections: state.collections
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollections: () => { dispatch(fetchCollections()) }
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCollections();
    }

    render() {
        return (
            <div>
                <Collection
                    collection={this.props.collections.collections}
                // collectionsLoading={this.props.collections.isLoading}
                // collectionsErrMess={this.props.collections.errMsg}
                />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));