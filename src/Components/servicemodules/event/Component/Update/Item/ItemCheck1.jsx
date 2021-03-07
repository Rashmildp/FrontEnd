import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../../../store/lib/actions";
import connect from "react-redux/es/connect/connect";


function ItemCheck1(props) {
  const [quantity, setQuantity] = useState(1);
    const { add_to_cart} = props;
    const [nameList, setNameList] = useState([]);


    useEffect(() => {
        fetch(
            'https://alphax-api.azurewebsites.net/api/eventplannerservices/' +
            props.userid
        )
            .then((res) => res.json())
            .then((data) => {
                setNameList(data);
            });
    }, []);

    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

console.log("event price ->"+nameList.price);
  const increaseQuantity = () => {
    let myvar = quantity + 1;
    setQuantity(myvar);
    console.log("Quantity increased-> " + quantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      let myvar = quantity - 1;
      setQuantity(myvar);
      console.log("Quantity decreased-> " + quantity);
    } else {
      window.alert("Quantity must be at least one.");
    }
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();



  const dispatch = useDispatch();
  const add = (item, quantity) => {
    dispatch(addToCart(item, quantity));
  };


  return (
    <div>
      <Card className="shadow-sm" style={{ width: "530px" }}>
        <Container>
          <Row>
            <br>
            </br>
          <h4>{nameList.name}</h4>
            <br />
          </Row>
          <Row>
            <Col>
              <h5>Select Date and Travelers</h5>
            </Col>
            <Col align="right">
              <h4>{nameList.price}$/person</h4>
            </Col>
          </Row>
          <Row>
            <br />
          </Row>
          <Row>
            <Col>
              <form className={classes.container} noValidate>
                <TextField
                  id="datetime-local"
                  label="Select Date and Time"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Col>
            <Col>
              <TableCell align="right">
                <Button
                  style={{
                    maxWidth: "20px",
                    maxHeight: "20px",
                    minWidth: "20px",
                    minHeight: "20px",
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "white",
                  }}
                  onClick={increaseQuantity}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  disabled
                  style={{
                    maxWidth: "20px",
                    maxHeight: "20px",
                    minWidth: "20px",
                    minHeight: "20px",
                    color: "black",
                  }}
                >
                  <EmojiPeopleIcon /> * {quantity}
                </Button>
                <Button
                  style={{
                    maxWidth: "20px",
                    maxHeight: "20px",
                    minWidth: "20px",
                    minHeight: "20px",
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "white",
                  }}
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
              </TableCell>
            </Col>
            <Col>
              <Button variant="outlined" color="secondary">
                <Brightness4Icon />
                Options
              </Button>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={5}>
              <div>
                <div>
                  <br />
                </div>
                <Link to="/shoppingcart">
                <button type="button" class="btn btn-warning" onClick={ ()=>add_to_cart(nameList.name,nameList.price,nameList.id,quantity,date,'Event')}>
                  <AddShoppingCartIcon />
                  Add to Cart
                </button>
                </Link>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <div>
            <br />
          </div>
          <div>
            <ul>
              <li>No refunds for tickets</li>
              <li>Low Price Guarantee</li>
              <li>Reserve Now & Pay Later</li>
            </ul>
          </div>
        </Container>
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addEventData: (eventData) => { dispatch({type: 'ADD_Event_DATA', eventData: eventData} )}
        add_to_cart:(item,cost,add_id,no_travellers,date,type) => dispatch(addToCart(item,cost,add_id,no_travellers,date,type))
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (ItemCheck1);
