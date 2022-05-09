const lob = require('lob')('YOUR_API_KEY_HERE');

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

const createPostcardPromise = async function() {
  return lob.postcards.create({
  description: 'Demo Postcards job',
  to: address,
  front: await loadFront(),
  back: await loadBack(),
  size: "6x9"
})
}

async function sendPostcards() {
  const postcards = []
  for (let i =0; i < 100; i++) {
    postcards.push(createPostcardPromise())
  }
  try {
    await Promise.all(postcards)
    console.log('success')
  }
  catch(e) {
    console.log(e)
  }
}

sendPostcards();