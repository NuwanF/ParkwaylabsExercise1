import React, { Component } from 'react';
import '../App.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, CardSubtitle
} from 'reactstrap';
//import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { getAssetsByCollectionAsync } from '../redux/ActionCreators';

const baseUrl = '../assets/images/';

const mapStateToProps = state => {
    return {
        assets: state.assets
    }
}

const mapDispatchToProps = dispatch => ({
    getAssetsByCollectionAsync: (collectionId) => { dispatch(getAssetsByCollectionAsync(collectionId)) }
});





const Collection = (props) => {
    console.log('check', props);

    const RenderController = ({ item, errMess }) => {

        if (errMess) {
            return (
                <h4>{errMess}</h4>
            );
        }
        else {
            return (
                <Card>
                    <CardImg src={baseUrl + item.imagePath} alt={item.imageName} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <Button onClick={() => RenderAsset(item.id)}>Select</Button>
                    </CardBody>
                </Card>
            );
        }
    }

    const RenderAsset = async (collectionId) => {
        console.log('coll', collectionId);
        await props.getAssetsByCollectionAsync(collectionId);
        console.log('asset', props);
        if (props.assets && props.assets.length > 0) {
            props.assets && props.assets.map((item) => {
                return (
                    <div className="col-12 col-md m-1">
                        <Card>
                            <CardImg src={baseUrl + item.path} alt={item.name} />
                            <CardBody>
                                <CardTitle>{item.name}</CardTitle>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        else return null;
    }

    return (
        <div className="container">
            <div className="row align-items-start">
                {
                    props.collection && props.collection.map((item) => {
                        return (
                            <div className="col-12 col-md m-1">
                                <RenderController
                                    item={item}
                                    props={props}
                                // isLoading={props.collectionsLoading}
                                // errMess={props.collectionsErrMess}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="row align-items-start">
                {RenderAsset()}
            </div>
        </div>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);