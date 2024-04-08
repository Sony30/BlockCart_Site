import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import Web3 from 'web3';

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);


  const handleCheckout = async () => {
    try {
      // Connect to MetaMask
      if (window.ethereum) {
        // Create a Web3 instance using MetaMask provider
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access from the user

        // Get selected account from MetaMask
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];

        // Instantiate your smart contract
        const contractAddress = '0x924585697FB58b09d23F21E28970A8C72439e2Fb';
        const contractABI =   [
          {
            "constant": true,
            "inputs": [],
            "name": "sellerOK",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "buyerOK",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "_seller",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "notification",
                "type": "string"
              }
            ],
            "name": "notify",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "proceedToCheckout",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_b_name",
                "type": "string"
              },
              {
                "name": "units",
                "type": "uint256"
              },
              {
                "name": "_date",
                "type": "string"
              },
              {
                "name": "p_p_u",
                "type": "uint256"
              }
            ],
            "name": "b_Product_details",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "escrow_balance",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "seller_deny_service",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "seller_send_product",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "b_delivery_received",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "withdraw_amount",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]; // Your contract ABI
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Call the smart contract function for checkout
        await contract.methods.proceedToCheckout().send({ from: selectedAccount });

        // Provide feedback to the user
        alert('Checkout successful!');
      } else {
        alert('Please install MetaMask to proceed with checkout.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again later.');
    } finally {
      // Reset checkout in progress state
      setCheckoutInProgress(false);
    }
  };
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <img className="cartitems-product-icon" src={e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <p>${e.new_price}</p>
                      <button className="cartitems-quantity">{cartItems[e.id]}</button>
                      <p>${e.new_price*cartItems[e.id]}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
        className="proceed-to-checkout-btn"
        onClick={() => {
          if (!checkoutInProgress) {
            setCheckoutInProgress(true);
            handleCheckout();
          }
        }}
        disabled={checkoutInProgress}
      >
        {checkoutInProgress ? 'Processing...' : 'PROCEED TO CHECKOUT'}
      </button>
        </div>
        <div className="cartitems-promocode">
        <div className="placed-order-section">
    <h2>Placed Order</h2>
    <table>
        {/* Display order details here */}
        <tr>
            <td>Product Name</td>
            <td>Quantity</td>
            <td>Price</td>
            {/* ... */}
        </tr>
    </table>
</div>
<button
    className="confirm-receipt-button"
    onClick={() => handleConfirmReceipt()}
>
    Confirm Receipt
</button>
<button
    className="decline-receipt-button"
    onClick={() => handleDeclineReceipt()}
>
    Decline Receipt
</button>


        </div>
      </div>
    </div>
  );
};

export default CartItems;
