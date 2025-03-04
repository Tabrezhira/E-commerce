import React from 'react'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function PayPalButton({amount, onSuccess, onError}) {
  return (
    <PayPalScriptProvider options={{ clientId: "ARfRPADUW8sRR5u8FWQIX6psY7luVNpUADj3MH7DNzHvHs18s-tr34Jm1rFPpJDKi7hPL8hiFgPGIX14" }}>
        <PayPalButtons style={{ layout: "vertical" }} createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units:[{amount: {value: amount}}]
            })
        }} 
        onApprove={(data, actions) => {
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
        />
    </PayPalScriptProvider>
  )
}

export default PayPalButton