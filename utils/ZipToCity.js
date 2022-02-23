import React from "react";
import zipcodes from "zipcodes";


export default function ZipToCity ({zip}) {
 
    // let zipInfo = zipcodes.lookup(zip);
    const { city } = zipcodes.lookup(zip) || {}
    
    var zipInfo = zipcodes.lookup(zip);

    // { zip: '90210',
    //   latitude: 34.088808,
    //   longitude: -118.406125,
    //   city: 'Beverly Hills',
    //   state: 'CA',
    //   country: 'US' }

    // return zipInfo.city
    return `${zipInfo.city}, ${zipInfo.state}`

}