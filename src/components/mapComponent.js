import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map(props){
    const [geometries, SetGeometries] = useState([])

    useEffect(() => {
        fetch('/poisCyprus.geojson')
        .then(response => response.json())
        .then(data => SetGeometries(data.features))
    }, []);

    const geometryOnClick = (geometry, layer) => {
        layer.bindPopup(
            `Category: ${geometry.properties.CATEGORY}, Name: ${geometry.properties.CATEGORY}`
        )
    }

    const renderGeoms = () =>{
        if (geometries.length != 0){
            return(
                <GeoJSON data={geometries} onEachFeature={geometryOnClick}/>
            )
        }
    }

    return(
        <MapContainer center={[35.1264, 33.4299]} zoom={10} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {renderGeoms()}
        </MapContainer>
    )
}

export default Map