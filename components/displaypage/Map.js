import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Head from "next/head";
import styles from "./Map.module.css";
import zipcodes from "zipcodes";
import "leaflet/dist/images/marker-shadow.png";
// import roundIcon from "./202202-round-PI.png";
import L from 'leaflet';



export default function Map({ zip, title, price }) {
    // useEffect(()=>{
    //     console.log(zipcodes.lookup(zip));
    // },[zip])
    const { latitude = 0, longitude = 0 } = zipcodes.lookup(zip) || {}

    // const position = [37.334789, -121.888138]
    const position = [latitude, longitude]
    if (!latitude && !longitude) {
        return "No location available"
    }
    // const myIcon = L.icon({
    //     iconUrl: "./202202-round-PI.png",
    //     iconSize: [50, 50],
    //     // iconAnchor: [latitude, longitude],
    // });
    // L.Marker.prototype.options.icon = myIcon;

    // delete L.Icon.Default.prototype._getIconUrl;
    const myIcon = new Icon({
        iconUrl: "202202-round-pi.jpg",
        iconSize: [75, 75]
      });
    
    // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

 
    // function GetIcon () {
    //     return L.icon( {
    //         iconUrl: roundIcon,
    //         iconSize: [75, 75]
    //     })
    // }

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                    crossorigin=""
                />
                <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
            </Head>

            <MapContainer className={styles.mapContainer} style={{
                width: "100%",
                height: "400px"
            }} center={position} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={myIcon}>
                    <Popup>
                        {title} <br/> ${price}
                    </Popup>
                </Marker>


            </MapContainer>
            {/* <img srs="/public/202202-round-PI.png" style={{"width": "200px"}}></img> */}
        </>
    )
}