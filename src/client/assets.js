const { IMG_NAMES } = require('../shared/constants.js');

const assets = {};

function downloadAsset(assetName) {
  console.log(`Downloading: ${assetName}`);
  return new Promise((resolve) => {
    const url = `/images/${assetName}`;
    fetch(url).then((response) => {
      return response.text()
    }).then((text) => {
      assets[assetName] = text;
      console.log(`Downloaded ${assetName}`);
      resolve();
      })
  });
}

const downloadPromise = Promise.all(IMG_NAMES.map(downloadAsset));

export const downloadAssets = () => downloadPromise;
export const getAsset = assetName => assets[assetName];
