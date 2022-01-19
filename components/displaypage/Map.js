import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Head from "next/head";
import styles from "./Map.module.css";
import zipcodes from "zipcodes";
// turtorial with geo jason LA https://trailhead.salesforce.com/de/content/learn/projects/wave_charts_custom_map/wave_charts_custom_map_geojson
// You can download shape files for 2019 Zip Code Tabulation Areas at no cost from https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2019&layergroup=ZIP+Code+Tabulation+Areas
// free github boundaries https://github.com/OpenDataDE/State-zip-code-GeoJSON
// paid zip codes https://www.zip-codes.com/
// paid boundaries https://rapidapi.com/VanitySoft/api/boundaries-io-1/pricing
// componentDidUpdate(): void {
//     this.props.leaflet.map.invalidateSize();
//     if (this.props.fitBoundsOnUpdate) {
//      this.fitBounds();
//     }
//     this.reset();
//    }
// __________
// You need to call the leaflet API on a map instance, which is linked to the dom element.
// var map = L.map('my-map'); // my-map is the ID of your DOM map container
// map.invalidateSize();      // should work then

//https://gitanswer.com/leaflet-js-ngx-leaflet-map-tiles-are-not-loaded-properly-in-popup-in-angular-8-626245487
// one more resolve https://wordpress.org/support/topic/full-map-not-loading/
// how to resolve https://surveyjs.answerdesk.io/ticket/details/t3781/leaflet-widget-map-invalidation
// map.invalidateSize(); how to use https://www.tabnine.com/code/javascript/functions/leaflet/Map/invalidateSize
// plagin for full window https://github.com/brunob/leaflet.fullscreen
//latide https://www.latlong.net/
// tigres github https://github.com/walkerke/tigris
// tigres package description https://cran.r-project.org/web/packages/tigris/tigris.pdf
// one more turtorial https://rstudio-pubs-static.s3.amazonaws.com/508643_d6cb2a0b10484f40b1bcba052dda28e1.html
// tutorial zip codes https://dillonshook.com/leaflet-zip-code-map-part-1/
//data about zipcodes https://catalog.data.gov/dataset/tiger-line-shapefile-2019-2010-nation-u-s-2010-census-5-digit-zip-code-tabulation-area-zcta5-na
// tutorial react-leaflet https://blog.logrocket.com/react-leaflet-tutorial/
// example animated panning https://react-leaflet.js.org/docs/example-animated-panning/

// bug with leaflet https://github.com/Leaflet/Leaflet/issues/6552
// I hit this problem using a NextJs stack and it makes complete sense window is not [yet] defined at the time of import. NextJs documentation had a clear solution for this.
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// For other React stacks, one could try useScript inside of componentDidMount or useEffect/useLayoutEffect as well.
// https://usehooks.com/useScript/
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// how to resolve https://stackoverflow.com/questions/57704196/leaflet-with-next-js

// animated panning turtorial
// https://react-leaflet.js.org/docs/example-animated-panning/

export default function Map({ zip }) {
    // useEffect(()=>{
    //     console.log(zipcodes.lookup(zip));
    // },[zip])
    const {latitude, longitude} = zipcodes.lookup(zip)
    
    // const position = [37.334789, -121.888138]
    const position = [latitude, longitude]

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
            }} center={position} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>

            {/* <>Map's {zip}</> */}
        </>
    )
}