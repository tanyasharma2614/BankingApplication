const geocoder = require('node-geocoder');

async function get_center(zip_code){
    const options = {
        provider: 'google',
        apiKey: 'YOUR_API_KEY',
        formatter: null
      };
      
      const geocoder = geocoder(options);
      
      // Using callback
      const res = await geocoder.geocode(zip_code);

      console.log(res);
}