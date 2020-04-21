/* Written by Voidzero-development 2020.  */

const { http } = require('http');
const { Tarkov } = require('tarkov');
const fs = require('fs');


const hwid = 'hwidhere';
const t = new Tarkov(hwid);

// Run everything in an async function
(async () => {
  
  // Login to tarkov, optionally also pass 2 factor code as a third param
  await t.login('email@email.com', 'password');

  // Load all profiles we have
  const profiles = await t.getProfiles();

  // We're just going to grab the second profile
  const profile = await t.selectProfile(profiles[1]);

  // Load our i18n translations
  await t.getI18n('en');

   // Load all traders
   const traders = await t.getTraders();

  
  var traderId = ['54cb57776803fa99248b456e', '5935c25fb3acc3127c3d8cd9', 
                   '5a7c2eca46aef81a7ca2145d', '54cb50c76803fa8b248b4571', 
                   '579dc571d53a0658a154fbec', '58330581ace78e27b8b10cee',
                    '5ac3b934156ae10c4430e83c'
                  ];
  
  let lTraders= [];

   traderId.forEach(function (value) {
    lTraders.push(traders.find(t => t._id === value))
  }); 

try{
  for (const object of lTraders){
    //console.log(object) //slowest part of the loop lmao
    let items = await object.getItems();
    let itemsd = JSON.stringify(items);
    let based = JSON.stringify(object);
    fs.mkdirSync(object._id);
    fs.writeFileSync(object._id +'/items.json', itemsd);
    fs.writeFileSync(object._id +'/base.json', based);

  }
}catch (ex){
  console.log(ex);
}

})();
