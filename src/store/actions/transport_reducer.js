import * as actionTypes from './actionTypes';
import axios from 'axios';



export const setTransportProvider = ( provider ) => {
    return {
        type: actionTypes.SET_TRANSPORT_PROVIDER,
        provider: provider
    };
};

export const fetchTransportProviderFailed = () => {
    return {
        type: actionTypes.FETCH_TRANSPORT_PROVIDER_FAILED
    };
};

export const getimg_url = (url) => {
    // console.log(url)
    return {
        type: actionTypes.GET_TRANSPORT_IMAGE_URL,
        transport_imgUrl:url,
    };
};




export const setTransport = ( providers ) => {
    return {
        type: actionTypes.SET_TRANSPORT,
        providers: providers
    };
};

export const fetchTransportFailed = () => {
    return {
        type: actionTypes.FETCH_TRANSPORT_FAILED
    };
};

export const initTransport = () => {
    return dispatch => {

        axios.get( 'https://alphax-api.azurewebsites.net/api/TransportServices' )
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        post_id: key
                    } );
                }
                dispatch(setTransport(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchTransportFailed(err));
            } );
    };
};

export const set_transport_vehicle_filter = ( vehicle_type ) => {
    console.log( vehicle_type);
    return {
        type: actionTypes.SET_TRANSPORT_VEHICLE_TYPE_FILTER,
        vehicle_type_filter:vehicle_type,

    };
};
export const set_transport_vehicle_filter_02 = ( price_per_day ) => {
    console.log( price_per_day);
    return {
        type: actionTypes.SET_TRANSPORT_PRICE_PER_DAY_FILTER_02,
        price_per_day_filter_02:price_per_day,

    };
};
export const set_transport_vehicle_filter_03 = ( price_per_distance ) => {
    console.log( price_per_distance);
    return {
        type: actionTypes.SET_TRANSPORT_PRICE_PER_DISTANCE_FILTER_03,
        price_per_distance_filter_03:price_per_distance,

    };
};