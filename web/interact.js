const {Web3} = require('web3');

// Initialize web3 with the appropriate provider
const web3 = new Web3('http://localhost:7545');

// Define the transaction parameters
const txParams = {
    from: '0xe4a746751715B85a034D0E7318115b5CbcBcBAb8', // Sender address
    to: '0x924585697FB58b09d23F21E28970A8C72439e2Fb', // Contract address
    value: web3.utils.toWei('1', 'ether'), // Value to send (1 ether in this case)
    gasPrice: web3.utils.toWei('10', 'gwei'), // Gas price (10 gwei in this case)
    gas: 1000000, // Gas limit (1,000,000 units in this case)
};

// Send the transaction
web3.eth.sendTransaction(txParams, function(err, transactionHash) {
    if (!err) {
        console.log('Transaction sent successfully:', transactionHash);
    } else {
        console.error('Error sending transaction:', err);
    }
});
