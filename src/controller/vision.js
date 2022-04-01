const vision = require('@google-cloud/vision');
const CREDENTIALS = JSON.parse(JSON.stringify({
  "type": "service_account",
  "project_id": "protean-harbor-332301",
  "private_key_id": "951a9020ec9b8dc9b8d7122fd110047f52f69560",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqHqVhpB3u9dfv\nE/xOMTmefc+ieH27/88q4AdTBzAFCtBGh97hKbFQ0mHqeIqXmoUch4NwlH3bfgIJ\nSA0Mt+4dDjLaetAS0dTSZpE25f3jURbCvl/jwsk4ZcDVOlJ35hkDDPulFlz1ISbw\nvsFaw85V3VOIxEj3M4Cmb2sTHiM3FQBcc1Q5pG1gg7I2wV78xnJ5CHLedWHSQWMK\ndSZy++bG0CWJuLlHx2PAoyXdVlJqFlw2nBKun61BraFnPGbvubHzJPXZfQ6wm5um\nPrJPcSOcv9PXfgCdwg0ggJ0qtfL8I23oCtsiJLard6BJhFA8WU+ayicWLSqlSqHm\nSb7aJ10RAgMBAAECggEAEKvhLDDvqAfaqfjM7ILBcUlGDFd/hul6TWrX/OiC6bOW\nFpthGbLCyDdd1iMK/fFsIxAarvE2ZkiyfWNcuAbcZGeMT0Hi2z1J/HaFu5oNZ/X9\n44bRkdn4azj5jUviYhKgF97xWEvZP0KI9OXUwAbZVSvT8F7AAc2/yU+48A4viEmy\n5KH0TcR4EgFzT6HPtV0xbkIHgsUEMp/v735wgrjMFkmKb0NwketmsNujLCGQatnU\nfkKpLREIuYU+LvolW3BnYNUTpVW0K/SvnycqbDYbIbjGfD1eunUcdlYeQymhZWMM\nBr9tNtn81R3mb56O+zVHq8QJ3n8IDUZE97YSKbfmkwKBgQDra1t0pzvIr+xLhk60\neEOIZW+UEnzNYFGSIXSuYlPxg1tY617kLX4sKVZtIX/kDv7JbpgFlb+YCPnugCM3\n5d9cNGKxbSayR4ntMEOx70GrSVBlKncReOeqJY/kEHKX19whuKDL3sAQG1dBvjmG\nQLV6E5KlQ3mPjb5xkvalfCxoUwKBgQC4/eT0cxue3wwZI3qGW5RIEW0nOut8uQqZ\nd8PScN2Tw006wllwwtWos/c9rPXg6p4bTDmQyPzeuxrT/2E8r+YPn0qRp7wLEevP\nwBGKCWOxVRfaGP5JLKHUJP1BSuV703wdiZRF0gD0Kn6TdRILYePalqyR9wSUSJ9K\nu8GEFJNoiwKBgFaJ6V2RWAWmvarpnSb0CocqGoEI5r2sSW/5QmYUGR1vlvWx1/jy\nzC25qF6HcPbJmFk9gT6UVJCzxAQrMEcNBjVjwF/OauogKBB7rHbNJ4uqcJYvrQNM\nOYSvOByy+xzcKbxvnRQ0Ns/07Pdq0MSMJunQJhkAG8Bsb3RafLZKVhynAoGAcCNA\nGcp5EMomfEqcaDu1XCZsI169BwLoYPVPmA5g0sSN2TOcohUJDVXiZtmkxq2SH/wJ\n3TFoz99duOrS18XM0OV/f2HNRGydpHbKawGcFBAAAG4sHtFWW9H8TwsGpxQg5YrT\nfat6dogX6G0L/ihdxdCWVXkGppiLLvM3sEgEv1cCgYEAxF8Qh1hGfhmnctAKuUMG\nZvqcVKgPIJXRMkwrxzQrJ+0EGsxIEI+rEAgbi5QHXvYDvFVOyhi0TD5JeqTyKM/N\nJtGMsZmEeu4BD05lhvPwNPWgLr2KqABoq5LhhRnhNIGc5VYqTeKrP3MTnV3I/SkB\nVdUySm41KnpSwtZ5bnUi5N4=\n-----END PRIVATE KEY-----\n",
  "client_email": "googlevision@protean-harbor-332301.iam.gserviceaccount.com",
  "client_id": "115321622726593563048",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googlevision%40protean-harbor-332301.iam.gserviceaccount.com"
}))
const config = {
  credentials:{
    private_key:CREDENTIALS.private_key,
    client_email:CREDENTIALS.client_email
  }
}

exports.quickstart = async(req,res)=>{
  try {
  //   // Creates a client
    const client = new vision.ImageAnnotatorClient(config);

    const fileName = '../images/road_1.jpg';
    //
    // // Performs label detection on the image file
    const [result] = await client.labelDetection(fileName);
    // const labels = result.labelAnnotations;
    // // // console.log('Labels:');
    // // labels.forEach(label => console.log(label.description));
    // // res.status(200).send(client)
    // res.status(200).send(true)
    console.log(client);
  } catch (e) {
    // res.status(500).send(e)
    console.log(e);
  }
}
