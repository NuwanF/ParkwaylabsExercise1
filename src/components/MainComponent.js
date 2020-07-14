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
    fetchCollections: () => { dispatch(fetchCollections()) },
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchCollections();
    }

    render() {
        return (
            <div>
                <Collection
                    collection={this.props.collections.collections}
                />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));