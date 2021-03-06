import React, { useState, useEffect } from "react";
import axios from "axios";

function BarGroup(props) {
  let barPadding = 2;
  let barColour = "#FFD700";
  let widthScale = (d) => d * 10;

  let width = widthScale(props.d.value);
  let yMid = props.barHeight * 0.5;

  return (
    <g className="bar-group">
      <text className="name-label" x="-70" y={yMid} alignmentBaseline="middle"style={{ color: '#FFF' }}>
        {props.d.name}
      </text>
      <rect
        y={barPadding * 0.5}
        width={width}
        height={props.barHeight - barPadding}
        fill={barColour}
      />
      <text
        className="value-label"
        x={width - 8}
        y={yMid}
        alignmentBaseline="middle"
      >
        {props.d.value}
      </text>
    </g>
  );
}

function BarChart() {
  var current=new Date().getFullYear()

  const [loading, setLoading] = useState(false);
  const [totalGuide, setTotalGuide] = useState(null);
  const [tourGuide, setTouGuide] = useState([]);
  const [event, setEvent] = useState([]);
  const [eventTotal, setEventTotal] = useState(null);
  const [totalHotel, setTotalHote] = useState(null);
  const [hotel, sethotels] = useState([]);
  const [totalTransport, setTotalTransport] = useState(null);
  const [transport, setTransport] = useState([]);


    useEffect(() => {
      fetch(
        `https://alphax-api.azurewebsites.net/api/tourguideservicereservations`
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          responseData=(responseData.filter(item => ((new Date(item.checkIn).getFullYear() ===current))));
      setTotalGuide(responseData.reduce((total, pay) => total + 1, 0));
        });
    }, []);




    useEffect(() => {
      fetch(
        `https://alphax-api.azurewebsites.net/api/eventplannerservicereservations`
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          responseData=(responseData.filter(item => ((new Date(item.checkIn).getFullYear() ===current))));
          setEventTotal(responseData.reduce((total, pay) => total + 1, 0));
        });
    }, []);



    useEffect(() => {
      fetch(
        `https://alphax-api.azurewebsites.net/api/hotelsservicereservations`
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          responseData=(responseData.filter(item => ((new Date(item.checkIn).getFullYear() ===current))));
          setTotalHote(responseData.reduce((total, pay) => total + 1, 0));
        });
    }, []);


    useEffect(() => {
      fetch(
        `https://alphax-api.azurewebsites.net/api/transportservicereservations`
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          responseData=(responseData.filter(item => ((new Date(item.checkIn).getFullYear() ===current))));
          setTotalTransport(responseData.reduce((total, pay) => total + 1, 0));
        });
    }, []);


  const data = [
    { name: "Event", value: eventTotal },
    { name: "Transport", value: totalTransport },
    { name: "Guide", value: totalGuide },
    { name: "Hotels", value: totalHotel },
  ];

  let barHeight = 30;

  let barGroups = data.map((d, i) => (
    <g transform={`translate(0, ${i * barHeight})`}>
      <BarGroup d={d} barHeight={barHeight} />
    </g>
  ));

  return (
    <svg width="1000" height="300">
      <g className="container">
        <text className="title" x="7" y="25" style={{ color: '#FFF' }}>
          {" "}
          
       
        </text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  );
}

export default BarChart;
