import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Head from "next/head";
import styles from "./Map.module.css";
import zipcodes from "zipcodes";
import "leaflet/dist/images/marker-shadow.png";

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

            <MapContainer style={{
                width: "100%",
                height: "400px"
            }} center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {title} <br/> ${price}
                    </Popup>
                </Marker>
            </MapContainer>

        </>
    )
}