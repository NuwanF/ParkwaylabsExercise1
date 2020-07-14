import React, { Component } from 'react';
import '../App.css';
import {
    Card, CardImg, CardBody, CardTitle, Button, CardFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import { getAssetsByCollectionAsync, makeMasterAsync, sortByProp } from '../redux/ActionCreators';

const baseUrl = '../assets/images/';

const Collection = (props) => {
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
                        <Button onClick={() => RenderAsset(item)}>Select</Button>
                    </CardBody>
                </Card>
            );
        }
    }

    const RenderAsset = async (collection) => {
        await props.getAssetsByCollectionAsync(collection);
    }

    const MakeMaster = (collectionId, assetId) => {
        props.makeMasterAsync(collectionId, assetId);
    }

    const sortByPropName = (event) => {
        props.sortByProp(event.target.value);
    }

    console.log('masterasset', props.masterAssetId);
    return (
        <div className="container">
            <div className="row align-items-start">
                {props.collection &&
                    props.collection.map((item) => {
                        return (
                            <div className="col-12 col-md m-1">
                                <RenderController
                                    item={item}
                                />
                            </div>
                        );
                    })}
            </div>
            {props.assets && props.assets.length > 0 ?
                <div className="row align-items-start">
                    <label for="cars">Sort Option : </label>
                    <select onChange={sortByPropName}>
                        <option value="id">Id</option>
                        <option value="name">Name</option>
                    </select>
                </div>
                : null}
            <div className="row align-items-start">
                {props.assets && props.assets.length > 0
                    ? props.assets.map((item) => {
                        return (
                            <div className="col-12 col-md m-1">
                                <Card >
                                    <CardImg src={baseUrl + item.path} alt={item.name} />
                                    <CardBody>
                                        <CardTitle>{item.name}</CardTitle>
                                        {props.masterAssetId !== item.id ?
                                            <Button onClick={() => MakeMaster(item.collectionId, item.id)}>Make Master</Button>
                                            : <CardFooter className="text-muted" >Master</CardFooter>
                                        }
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })
                    : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        assets: state.collections.assets,
        masterAssetId: state.collections.masterAssetId
    }
}

const mapDispatchToProps = dispatch => ({
    getAssetsByCollectionAsync: (collectionId) => { dispatch(getAssetsByCollectionAsync(collectionId)) },
    makeMasterAsync: (collectionId, assetId) => { dispatch(makeMasterAsync(collectionId, assetId)) },
    sortByProp: (value) => { dispatch(sortByProp(value)) }
});


export default connect(mapStateToProps, mapDispatchToProps)(Collection);