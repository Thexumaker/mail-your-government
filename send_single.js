const lob = require('lob')('YOUR API KEY HERE');

const fs = require('fs').promises;
async function loadBack() {
    const data = await fs.readFile("./assets/back/back.html", "binary");
    return Buffer.from(data);
}

async function loadFront() {
  const data = await fs.readFile("./assets/front/front.html", "binary");
  return Buffer.from(data);
}

const address = {
  name: 'Brett Kavanaugh',
  address_line1: '3706 UNDERWOOD ST',
  address_city: 'CHEVY CHASE',
  address_state: 'MD',
  address_zip: '20815'
}
async function sendPostcard() {
  try {
    await lob.postcards.create({
      description: 'Demo Postcard job',
      to: address,
      front: await loadFront(),
      back: await loadBack(),
      size: "6x9"
    })
    console.log('success')

  }
  catch(e) {
    console.log(e)
  }
}

sendPostcard();
