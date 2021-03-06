import React, { Component,Fragment, useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Navbar from "../Components/navbar/nav-bar";
import { connect } from 'react-redux';
import { saveCart } from '../../src/store/lib/actions';
import { authCheckState } from '../../src/store/actions/auth';

import Post from "../Components/Post/post";
import Shoppingcart from "../Components/cart/cartlist/views/cart";
import Select_profile from "../Components/Login/profile/select_profile";
import Logout from "../Components/Login/Logout/Logout";
import ServiceProvider from "../Components/Userpanels/ServiceProviderUI/Serviceprovider";
import Transportinput from "../Components/servicemodules/transport/Transport-input/Transport-input";
import Transportproviderlist from "../Containers/Transportproviderlist/transportproviderlist";
import Listitemdetails from "../Components/servicemodules/transport/Listitemdetails/listitemdetails";
import PostguideForm from "../Components/Post/post-tourguide/post-guide";
import PosteventForm from "../Components/Post/post-events/post-events";
import PosthotelForm from "../Components/Post/post-hotels/post-hotels";
import PostTransportProviderForm from "../Components/Post/post-transportprovider/temp-post";
import Home from "../Components/home/home";
import Footer from "../Components/footer/footer";


import Form from '../Components/servicemodules/guide/components/Form/Form';
import NameList from '../Components/servicemodules/guide/components/NameList/NameList';
import FormSearch from '../Components/servicemodules/guide/components/formSearch/formsearch';
import PostGuideForm from '../Components/servicemodules/guide/components/PostGuide/post-guide'
import Events from '../Components/servicemodules/event/Component/Update/Main/Landing';

import ResultList from '../Components/servicemodules/suggestor/Pages/ResultList/ResultList';
import DetailedResult from '../Components/servicemodules/suggestor/Pages/DetailedResult/DetailedResult';
import Payment from '../Components/servicemodules/suggestor/Pages/Checkout/Payment';
import Paypal from '../Components/servicemodules/suggestor/Pages/Checkout/Paypal';
import SignUp from "../Components/Login/Signup/signup";
import PackageDetails from '../Components/servicemodules/suggestor/Pages/Update/PackageDetails/packagedetails';
import ResultListLanding from '../Components/servicemodules/suggestor/Pages/Update/ResultPackages/ResultListLanding';

import CategoryLanding from '../Components/servicemodules/event/Component/Update/Category/CategoryLanding';
import CategoryLanding1 from '../Components/servicemodules/event/Component/Update/Category/DateFilter';
import ItemLanding from '../Components/servicemodules/event/Component/Update/Item/ItemLanding';
import guidedetailspage from '../Components/servicemodules/guide/components/GuideDetails/guidedetailspage';

import HotelMain from '../Components/servicemodules/hotel/Component/HotelMain';
import HotelList from '../Components/servicemodules/hotel/Component/HotelList';
import HotelListItem from '../Components/servicemodules/hotel/Component/HotelListItem';
import HotelResult from '../Components/servicemodules/hotel/Result/HotelResult';
import HotelResultItem from '../Components/servicemodules/hotel/Result/HotelResultItem';
import Rooms from '../Components/servicemodules/hotel/Component/Rooms';
import RoomResult from '../Components/servicemodules/hotel/Component/RoomResult/RoomResult';
import RoomResultItem from '../Components/servicemodules/hotel/Component/RoomResult/RoomResultItem';
import HotelCart from '../Components/servicemodules/hotel/Component/Cart/HotelCart';
import SignIn from "../Components/Login/Signin/Signin";
import Forgotpassword from "../Components/Login/forgot password/forgot_password";
import Passwordreset from "../Components/Login/PasswordReset/PasswordReset";

const Layout=(props)=> {
    const { items, saveLocalStorage } = props;
    // useEffect(() => {
    //   saveLocalStorage(items)
    // }, [items])

    // componentDidMount(){
    //     saveCart(this.props.items)
    //     // this.props.(this.props.items)
    // }

    // render () {

    useEffect(() => {

        props.onTryAutoSignup();

    }, []);
        return (

                <div>
                    <Navbar/>

                    <Switch>
                    <Route path='/result' component={ResultList} />
                        <Route path='/paypal' component={Paypal} />
                        <Route path='/detailedresult' component={DetailedResult} />
                        <Route path='/payment' component={Payment} />
                        <Route path='/packagedetails' component={PackageDetails} />
                        <Route path='/Resultlistlanding' component={ResultListLanding} />


                        <Route path='/events' component={Events}/>
                        <Route path="/categorylanding/:id" component={ItemLanding}/>
                        <Route path='/itemlanding' component={ItemLanding}/>
                        <Route path="/categorylanding" component={CategoryLanding}/>
                        <Route path="/categoryLanding1" component={CategoryLanding1}/>


                        <Route path='/PostGuideForm' component={PostGuideForm}/>
                        <Route path='/FormSearch' component={FormSearch}/>
                        <Route path='/NameList' component={NameList}/>
                        <Route path="/guide/:id" component={ guidedetailspage}/>
                        <Route path='/guide'>  <Form /> </Route>

                        <Route path="/hotelCart" component={HotelCart}></Route>
                        <Route path="/roomResultItem" component={RoomResultItem}></Route>
                        <Route path="/roomResult" component={RoomResult}></Route>
                        <Route path="/hotelResultItem" component={HotelResultItem}></Route>
                        <Route path="/hotelResult" component={HotelResult}></Route>
                        <Route path="/hotelListItem" component={HotelListItem}></Route>
                        <Route path="/hotelList" component={HotelList}></Route>
                        <Route path="/rooms" component={Rooms}></Route>
                        <Route path="/hotel" component={HotelMain}></Route>

                        <Route path="/post/post-tourguide"component={ PostguideForm}/>
                        <Route path="/post/post-event"component={ PosteventForm}/>
                        <Route path="/post/post-hotel"component={ PosthotelForm}/>
                        <Route path="/post/post-transportprovider"component={ PostTransportProviderForm}/>
                        <Route path="/post" component={Post}></Route>
                        <Route path="/logout"><Logout/></Route>
                        <Route path="/select_profile"><Select_profile/></Route>
                        <Route path="/register"><SignUp/></Route>
                        <Route path="/passwordreset/:id"><Passwordreset/></Route>
                        <Route path="/forgotpassword"><Forgotpassword/></Route>
                        <Route path="/signin"><SignIn/></Route>
                       
                        <Route path="/shoppingcart"><Shoppingcart/></Route>
                        <Route path="/serviceprovider" component={ServiceProvider}/>
                        <Route path="/transport"><Transportinput/></Route>
                        <Route path="/transportproviderlist/:id"  component={Listitemdetails}/>
                        <Route path="/transportproviderlist"><Transportproviderlist/></Route>
                        <Route path="/" exact component={Home}/>
                        <Redirect to="/"/>

                    </Switch>

                    <Footer/>
                </div>

        );
    // }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLocalStorage:  items => { dispatch(saveCart(items)) },
        onTryAutoSignup: () => dispatch( authCheckState() )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
