const marketplaceUrls = [
  'https://nc-marketplace-sem-1.onrender.com',
  'https://nc-marketplace-sem-2.onrender.com',
  'https://nc-marketplace-sem-3.onrender.com',
  'https://nc-marketplace-sem-4.onrender.com'
];

const reseedAll = async () => {
  const reseedPromises = marketplaceUrls.map((url) => {
    return fetch(`${url}/api/reset`, { method: 'POST' });
  });
  await Promise.all(reseedPromises);
  console.log(`APIs reseeded: ${new Date().toISOString()}`);
};

const intervalReseeder = () => {
  console.log(`Started: ${new Date().toISOString()}`);
  setInterval(reseedAll, 900000); // 15 minutes
};

intervalReseeder();
