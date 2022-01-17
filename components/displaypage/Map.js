import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Head from "next/head";

// tutorial zip codes https://dillonshook.com/leaflet-zip-code-map-part-1/
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

    return (
        <>
            <Head>
                <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossorigin=""
            />
            </Head>

            <MapContainer style={{
                width: "100%",
                height: "400px"
            }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
                </Marker>
            </MapContainer>

            {/* <>Map's {zip}</> */}
        </>
    )
}