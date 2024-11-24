# (npm create vite@latest) :- 
create react app

# npm install react-router-dom :-
Ham react-router-dom ka use kar sakte ho browser routing ke liye. Yeh React applications ke andar routes handle karne ke liye sabse popular package hai. Isse ham easily different pages ke liye routes configure kar sakte ho.

# (npm install concurrently) :-  
concurrently ek NPM package hai jo hamko multiple commands ko ek hi time par parallel mein run karne ki facility deta hai. Yeh especially tab helpful hota hai jab hamko development ke time par ek se zyada processes ko saath mein chalana hota hai, jaise ki:

Backend server (e.g., Express.js)
Frontend (e.g., React)

# npm i react-icons :- 
react-icons ek NPM package hai jo hamko popular icon libraries ko easily React components ke form mein use karne ki facility deta hai. Aap famous icon sets jaise FontAwesome, Material Icons, Bootstrap Icons, etc., ko as React components import kar sakte ho aur apne UI mein use kar sakte ho.

# (npm i @reduxjs/toolkit) :- 
Redux Toolkit ek official, recommended package hai jo Redux ka use karna bahut easier aur less boilerplate ke saath banata hai. Yeh Redux ke common patterns aur features ko simplify karta hai. Isko install karne se aapko Redux ke core functionalities aur kuch extra tools milte hain, jisme slices, createAsyncThunk, configureStore, etc. included hote hain.

Features provided by Redux Toolkit:

createSlice: Yeh reducer aur actions ko ek saath define karne ka method hai. Isse reducers aur actions automatically generate ho jaate hain.
configureStore: Ek improved store setup function, jo middleware aur Redux DevTools ko automatically integrate karta hai.
createAsyncThunk: Asynchronous logic handle karne ka easy way, jo async actions (like API calls) ke liye helpful hota hai.
Immer: Yeh Redux Toolkit ke saath default hota hai, jo immutable updates ko easy aur efficient banata hai.

# (npm install redux react-redux) :- 
redux: Redux ek state management library hai. jo hamko global state ko manage karne ke liye ek centralized store provide karta hai. Yeh useful hota hai jab hamko application mein shared state ko manage karna ho, like user authentication, cart data, etc. Redux standalone ek predictable state container hai, lekin React ke saath kaam karne ke liye hume react-redux ka use karna padta hai.

react-redux: Yeh ek binding library hai jo React components ko Redux store se connect karne ke liye use hoti hai. Iska main kaam React aur Redux ke beech ek bridge banana hai. Isme hooks jaise useSelector, useDispatch, aur Provider component hote hain, jo Redux store ko React ke saath effectively integrate karte hain.

# (npm i react-hot-toast) :- 
react-hot-toast ek NPM package hai jo hamko React applications mein simple aur customizable toast notifications add karne ki facility deta hai. Toast notifications wo small pop-up messages hote hain jo screen ke kisi corner mein show hote hain aur user ko temporary notifications provide karte hain, like success, error, info, etc.

# const location = useLocation() :-
Yeh line useLocation hook ko use karke current URL ki location object ko capture karti hai. location object ke paas important details hoti hain jaise pathname, search (query params), aur hash. Is example mein, location.pathname ko specifically use kiya ja raha hai. location.pathname current URL ka path deta hai, jaise /about ya /catalog/python.

# matchPath: 
Yeh function react-router-dom se aata hai aur iska kaam yeh hai ke woh current URL ko kisi specific pattern ke against match kare. Jaise ki agar hamko check karna ho ki current URL ek particular route ke path ke sath match karta hai ya nahi, toh aap matchPath ka use karte ho. Yeh exact ya partial path match ko handle kar sakta hai.

# matchRoute:- 
Is function ko component ke andar banaya gaya hai. Yeh ek helper function hai jo matchPath ko use karta hai. Jab ham matchRoute ko call karte ho aur ek route pass karte ho, toh yeh dekhta hai ki jo route aapne diya hai, woh current URL se match kar raha hai ya nahi. Agar match hota hai toh yeh true return karega, warna false.

# link?.path 
? ye ek optinal chaning operator hai.
link?.path ka matlab yeh hai ki agar link object exist karta hai aur uske andar path property hai, toh usse access karo. Agar link null ya undefined hai, toh error throw karne ke bajaye undefined return kar do. Yeh tarika safe access provide karta hai bina program ko crash kiye.

# key={index} :- 
index ko key tab use kiya jaata hai jab ham list items ko render karte ho. key React ko yeh batata hai ki har element unique kaise hai, taaki React efficiently DOM update kar sake. index ko key sirf tab use karo jab list static hai ya rarely update hoti hai. Agar list dynamic hai ya frequently change hoti hai, toh index ko key use karna achha idea nahi hai, uss case mein unique ID ya unique property use karni chahiye, taaki React correctly update kar sake.

# LocalStorage :-
 ek web browser ki built-in storage feature hai jo allow karta hai data ko client-side (user ke browser mein) store karne ke liye. Ye ek tarah ki key-value storage hoti hai jisme aap JavaScript se data save kar sakte ho aur future mein access kar sakte ho, bina server ke paas baar-baar data bhejne ke.

# LocalStorage ki Key Features:
Client-Side Storage: Data directly user ke browser mein store hota hai, server pe nahi.
No Expiration: LocalStorage mein stored data manually remove hone tak persist karta hai. Iska matlab hai ki jab tak aap data ko clear nahi karte, ya user browser cache clear nahi karta, tab tak data safe rehta hai.
5-10MB Storage Limit: Har browser mein 5-10MB tak ka data store kiya ja sakta hai.
Synchronous API: LocalStorage ko access karna synchronous (block karne wala) hota hai, yani jab aap data save ya retrieve karte ho, toh uske liye turant response milta hai.
Key-Value Pairs: Data ko key-value pairs ke format mein store kiya jata hai, jisme keys aur values dono strings hote hain.

Use Cases:
User Preferences: Jaise dark mode ya language settings.
Shopping Cart Data: Temporary cart details ko store karna jab user shopping kar raha ho.
Session Data: Agar user login kiya hai, toh uska session token store kar sakte ho.

Use Case in Redux Example:
Cart ko localStorage mein save karna ek achha use case hai, taaki jab user page refresh kare ya browser band kare, toh cart data persist rahe. Iska fayda hai ki user ko cart firse nahi banana padta.

Important Points:
Only String Data: LocalStorage mein sirf strings store kar sakte hain. Agar aapko object ya array store karna hai, toh use karna padega JSON.stringify() jab store kar rahe ho, aur JSON.parse() jab access kar rahe ho.
Security: Sensitive data ko store karne se avoid karna chahiye, kyunki localStorage easily accessible hota hai.

# useSelector :-
ye React-Redux hook hai jo aapko Redux store se specific data ko fetch karne mein madad karta hai. Aapko Redux store ka state access karna hota hai toh aap useSelector ka use karte ho. ye redux store se hamare react component ke andar state ko fetch kar ke lata hai.

# State -
ka matlab hai kisi bhi application ke data ka current status ya condition. Jab hum React, Redux, ya kisi aur state management library ki baat karte hain, toh state ka concept bahut important hota hai. Yeh application ki dynamic behavior ko manage karne mein madad karta hai.

State ke Key Features:

Data Representation:
State aapke application ke andar ka data ko represent karta hai, jaise user information, UI ki current condition, form inputs, etc.

Dynamic:
State dynamically change hota hai jab user actions, API responses, ya koi aur event occur hota hai. Jab bhi state change hota hai, toh UI automatically update hota hai.

Local aur Global:
Local State: Yeh state component ke andar hota hai, jaise React components mein useState hook se manage hota hai.
Global State: Yeh state application ke bahar hota hai, jaise Redux store mein, jisse multiple components access kar sakte hain.

Single Source of Truth:
Application ki state ek centralized location mein store hoti hai, jisse data consistency aur synchronization asan hota hai.

Reactivity:
State change hone par React automatically re-render karta hai component ko, jisse latest data display hota hai.

# npm i react-type-animation
react-type-animation ek React library hai jo aapko typing animation effect create karne deti hai. Iska matlab hai ki text ek character-by-character tareeke se appear hota hai, jaise koi real-time mein type kar raha ho. Ye feature aap engaging UI elements banane ke liye use kar sakte ho, jaise headers, introductions, ya phir aisi jagah jaha aapko lagta hai ki text gradually appear hona chahiye.

Key Features:
Typing Animation: Text ko ek-ek character type hone ka animation deta hai.
Custom Speed: Aap control kar sakte ho text kis speed se type ya delete hoga.
Looping: Text ko aap loop ya baar-baar repeat karwa sakte ho.
Dynamic Text: Ek hi animation mein alag-alag strings ko type karwa sakte ho.


# npm run build


# Otp Input 


# React Hook Form


# npm i @ramonak/react-progress-bar

# npm i react-rating-stars-component


# npm i react-super-responsive-table


# npm i swiper


# npm i copy-to-clipboard


# npm i video-react



##################################
write code in frontend viewCourse 
second ReviewSlider component create and import in Home pages component
added/import ReviewSlider in about component
added/import ReviewSlider in contactUs component


###################################
change we are do in backend api.
first in course controller
second in profile controller
third courseProgress contoller create and his route create
fourth changing some in payment contoller in enrolledCourse function