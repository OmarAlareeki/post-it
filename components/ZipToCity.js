import React from "react";
import zipcodes from "zipcodes";


export default function ZipToCity ({zip}) {
 
    // let zipInfo = zipcodes.lookup(zip);
    const { city } = zipcodes.lookup(zip) || {}


    // return zipInfo.city
    return city

}