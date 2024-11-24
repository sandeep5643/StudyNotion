1. corn Library :- corn jobs ye ek npm package hai. jo cron jobs ko handle karta hai. means crons jobs wo task hote hai jo specific time intrval par automatic execute hota hai. exmaple ke liye agar hamko har 5 minutes me koi task karwana hai to ham cron job ka use karte hai. Cron library task schedule or manage karne ke liye use hota hai.

Yeh mostly Node.js applications mein background tasks ko automate karne ke liye kaam aati hai. Isme ham specific timing format ke through tasks ko set kar sakte hai, jaise "every minute", "every hour" ya kisi specific time par daily.

Corn Library ke features: 
Simple Syntax: Iska syntax easy hai, jisme ham cron expressions use karke apne tasks schedule kar sakte hai.
Time Zones: Ham specific time zones bhi set kar sakte hai. taaki hamara task ek correct region ke according run ho.
Repeatable Jobs: Ham regular intervals par repeat hone wale jobs easily set kar sakte hai.

-------------------------------------------------------
const cron = require('corn');

// Har 5 second mein yeh function chalega
const job = cron.schedule('*/5 * * * * *', () => {
  console.log('5 second par ek task chal raha hai');
});

job.start();  // Isse job ko shuru kiya jata hai
-------------------------------------------------------
Yahaan */5 * * * * * ka matlab hai har 5 second mein task run karega. Corn library aapko aise kaafi flexible tarike se time-based tasks ko handle karne ka option deti hai.

2. Modal in payment integration :- Modal ek pop-up window jaisa hota hai jo current page ke upar display hota hai. Jab user koi action karta hai (jaise "Pay Now" button click karta hai), tab payment modal appear hota hai jaha user apna payment details (card info, UPI, etc.) dalta hai bina current page ko reload kiye ya change kiye.

3. payment integration using Razorpay :- Steps for Razorpay Payment Integration -
Sabse pehle, hame Razorpay ka merchant account create karna hoga.
Account create karne ke baad hame ek API Key aur Secret Key milega. jo hamare backend ke sath Razorpay ko authenticate karne ke liye use hota hai.
Backend me Razorpay ke APIs ko handle karne ke liye hame Razorpay ka Node.js SDK install karna hoga. (npm install razorpay).

Frontend me Razorpay Modal Setup-
Frontend me Razorpay ka modal trigger karne ke liye, tumhe HTML aur JavaScript me Razorpay ke checkout modal ka code likhna hoga.

Backend Integration (Node.js + Express.js)-
Ab backend me tumhe Razorpay ke orders ko handle karna hoga aur payment verification karni hogi.

Razorpay Setup on Server-side-
Tum Razorpay ke Node.js SDK ko use karoge taaki tum server-side pe orders generate kar sako.

Create an Order from Server-
Jab frontend pe user "Pay" button click karta hai, to backend ek new order create karega using Razorpay API.
Frontend se amount aur currency receive karke, backend Razorpay order banata hai, jiska response frontend ko return hota hai.

Verify Payment Signature on Server-
Payment complete hone ke baad Razorpay se webhook ya response aata hai jisme signature hota hai. Ye signature validate karna zaroori hota hai taaki hum verify kar sakein ki payment genuine hai.

Full Workflow:-
frontend-
User "Pay Now" button click karta hai.
Razorpay modal open hota hai.
Modal me payment authorize hoti hai, and Razorpay response ke sath payment ID, order ID bhejta hai.
backend-
Backend Razorpay API ko call karta hai taaki order create ho sake.
Payment hone ke baad backend signature verify karta hai aur ensure karta hai ki payment valid hai.
Successfully payment verify hone ke baad user ko confirmation milta hai.


4. Web Hook :-


5. Proxy Server :-

6. crypto.createHmac

7. SHA Algorithm

8. checkSum