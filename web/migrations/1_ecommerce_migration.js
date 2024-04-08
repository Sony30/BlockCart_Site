const Ecommerce = artifacts.require("Ecommerce");

module.exports=function(deployer){
    const sellerAddress="0x82b058891eAfF320470ccF37EdA5d9306FB644FB";
    deployer.deploy(Ecommerce,sellerAddress);
};