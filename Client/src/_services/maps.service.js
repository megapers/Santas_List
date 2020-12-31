import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

function MapContainer(props) {
    return (
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: props.lat,
         lng: props.long
        }}
      >
        <Marker/>
      </Map>
    );
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD_dzFHAYG2IqciMt0BkIGXzTJbb9IJtCQ'
})(MapContainer);