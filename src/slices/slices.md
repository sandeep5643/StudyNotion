Redux Toolkit ka use ham state management ke liye karte hai jaha ham ek centerlized store/Global store banate hai en store me slice ke form data store hote hai or jo slice create huye rahte hai wo portions of data se bane hote hai. 

1. first step slice creation :- jo createSlice() method se create hote hai and enme object ke form me name, initialState, reducers create karte hai. and reducers bhi ek function hi hota hai enme ham object ke form me functionality define karte hai.

Yahan pe authSlice, profileSlice, aur cartSlice alag-alag parts ko handle kar rahe hain. auth slice sirf authentication se related state ko manage karega, profile user profile data ko, aur cart shopping cart ko.