const os = require('os')

module.exports.getLocalIp = () => {
  const ipTable = {}, iFaces = os.networkInterfaces();

  for (let dev in iFaces) {
    iFaces[dev].forEach(function(details,alias){
      if (details.family=='IPv4') {
        ipTable[dev+(alias?':'+alias:'')] = details.address;
      }
    });
  }

  return ipTable
}
