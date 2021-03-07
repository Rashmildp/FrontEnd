import React,{Component} from 'react';
import './transport-input.css';
import {History} from 'react-router-dom';
import axios from "axios";
import {withRouter} from 'react-router-dom';
import { format } from "date-fns";
import {saveCart} from "../../../../store/lib/actions";
import connect from "react-redux/es/connect/connect";
import * as actions from '../../../../store/actions/index';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
class TransportInput extends Component{

    constructor(props) {
        super(props)
        this.state = {


            pickupdate: '',
            pickuptime: '',
            dropoffdate: '',
            dropofftime: '',
            notravellers: '',
            rounded:'',


            distance: [],
            pickuplocation: '',
            droplocation: '',
            origin_lat:0,
            origin_lang:0,
            desti_lat:0,
            desti_lang:0,
            distance_text: 0

        }
        this.onValueChange = this.onValueChange.bind(this);

    }

    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
    }

    Changehandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value })
    }

    handlehiddenClik(e) {
        this.setState( {rounded: e.target.checked} )

    }

    handleSubmit =(e) =>{


         e.preventDefault();

        Geocode.setApiKey('AIzaSyD3hAWVrmMEMeI6xhdtSGCmEJ6FHccdKUk');
        Geocode.setLanguage("en");


        Geocode.setRegion("es");


        Geocode.setLocationType("ROOFTOP");


        Geocode.enableDebug();


        Geocode.fromAddress(this.state.pickuplocation).then(
            (response) => {
                let { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                this.setState({origin_lat:lat,origin_lang:lng})

            },
            (error) => {
                console.error(error);
            }
        );

        Geocode.fromAddress(this.state.droplocation).then(
            (response) => {
                let { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                this.setState({desti_lat:lat,desti_lang:lng})
            },
            (error) => {
                console.error(error);
            }
        );

        setTimeout(function() { //Start the timer
            this.calculateDistance();
            // console.log("delay");

            console.log(this.state)
            this.props.transport_input_form(this.state.notravellers,this.state.droplocation,this.state.dropoffdate,this.state.dropofftime,this.state.pickuplocation,this.state.pickupdate,this.state.pickuptime,this.state.rounded);
            if(this.state.rounded==true){
                this.setState({distance_text:this.state.distance_text*2});
            }
             this.props.history.push('/transportproviderlist')
        }.bind(this), 2000)



        // axios
        //     .post('http://localhost:5000/TransportProvider/Post', {
        //
        //     })
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })


    }

    calculateDistance() {
        const { google } = this.props;
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [{ lat: this.state.origin_lat, lng: this.state.origin_lang }],
                destinations: [{ lat: 	this.state.desti_lat, lng: this.state.desti_lang}],
                travelMode: "DRIVING"
            },
            (response, status) => {
                // console.log("response", response);
                // console.log("status", status);
                // // alert(response.dresses.rows.)
                 console.log("response", response.rows[0].elements[0].distance);
                this.setState({distance_text:response.rows[0].elements[0].distance})
                return(
                    <div>
                        {/*{response.rows[0].elements[0].distance.text}*/}
                    </div>
                );
                // alert(response.rows[0].elements[0].distance);
                // this.setState({distance:response});
                // console.log(this.state.distance[0]);
            }
        );
    }


    render() {

        return (
            <div>
                <br/>



                <div className="container-fluid">
                    <div className="row">

                        <div className="col-sm-6 tinput">

                        </div>


                        <div className="col-sm-6 tm-bg-gray">
                            <form onSubmit={this.handleSubmit} className="tm-contact-form">
                                <div className="form-group">
                                    <input type="text" id="contact_subject"
                                           className="form-control" placeholder="Pickup Location"    value={this.state.pickuplocation} onChange={this.Changehandler}
                                           name="pickuplocation"/>
                                </div>
                                <div className="form-group tm-name-container">
                                    <input type="date" id="contact_name" name="pickupdate" className="form-control"
                                           placeholder="Pickup Date"  value={this.state.pickupdate} onChange={this.Changehandler} />
                                </div>

                                <div className="form-group tm-email-container">
                                    <input type="time" id="contact_email" name="pickuptime" className="form-control"
                                           placeholder="time"     value={this.state.pickuptime} onChange={this.Changehandler}/>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input form-group" type="checkbox"
                                           value="true" name=" checkboxval"   onChange = {e=>this.handlehiddenClik(e)} />
                                    <div className="input-group-prepend">
                                        <label className="form-group "><p >Return  to the same location</p> </label>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <input type="text"
                                           className="form-control" placeholder="Drop Off Location"
                                           value={this.state.droplocation} onChange={this.Changehandler}
                                           name="droplocation"
                                    />
                                </div>

                                <div className="form-group tm-name-container">
                                    <input   name="contact_name" className="form-control"
                                            placeholder="Drop off Date" disabled/>
                                </div>

                                <div className="form-group tm-email-container">
                                    <input type="date" name="dropoffdate" className="form-control"
                                           placeholder="date"  value={this.state.dropoffdate} onChange={this.Changehandler}
                                           min={this.state.pickupdate}/>
                                </div>

                                <div className="form-group tm-name-container">
                                    <input   name="contact_name" className="form-control"
                                            placeholder="Drop Off Time" disabled/>
                                </div>

                                <div className="form-group tm-email-container">
                                    <input type="time"  name="dropofftime" className="form-control"
                                           placeholder="date"   value={this.state.dropofftime} onChange={this.Changehandler}/>
                                </div>

                                <div className="form-group">
                                    <input type="Number"  name="notravellers"
                                           className="form-control" placeholder="No Of Travellers"  value={this.state.notravellers} onChange={this.Changehandler} min="0"/>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="p_methode"  checked={this.state.selectedOption === "Per_day"}
                                               onChange={this.onValueChange}
                                               id="exampleRadios1" value="Per_day" />
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                              Pay for day
                                            </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="p_methode"
                                               id="exampleRadios2" value="Per_distance" checked={this.state.selectedOption === "Per_distance"}
                                               onChange={this.onValueChange} />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Pay for distance
                                            </label>
                                    </div>

                                </div>

                                <button type="submit" className="btn btn-primary tm-btn-primary tm-btn-send text-uppercase">
                                 Find a ride
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <h1>{this.state.distance_text}</h1>
                <br/>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        // items: state.onlineStoreApp.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transport_input_form:  (no_travellers,drop_location,drop_date,drop_time,pickup_location,pickup_date,pickup_time,rounded) => { dispatch(actions.get_transport_input_form(no_travellers,drop_location,drop_date,drop_time,pickup_location,pickup_date,pickup_time,rounded)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({apiKey:'AIzaSyD3hAWVrmMEMeI6xhdtSGCmEJ6FHccdKUk'})(withRouter(TransportInput)));
//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TransportInput));
