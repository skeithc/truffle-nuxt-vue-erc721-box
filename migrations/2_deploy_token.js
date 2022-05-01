const MagicToken = artifacts.require('MagicToken');

module.exports = function (deployer) {
  deployer.deploy(MagicToken, "https://localhost:3000/api/metadata/");
};
