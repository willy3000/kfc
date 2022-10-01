import { createSlice } from "@reduxjs/toolkit";


export const FoodSlice = createSlice({
    name: "food",
    initialState: {foods: [], cart: [], searchTerm: ""},
    reducers: {
        loadFood: (state, action) => {
            state.foods = action.payload
            console.log(state.foods)
        },

        changeOrderState: (state, action) => {
            const newList = []
            const newCart = state.cart
            state.foods.map((food) => {
                if(food.id === action.payload){
                    newList.push({...food, order_state: !food.order_state})
                    newCart.push({...food, amount: 1})
                }else{
                    newList.push(food)
                }
            })
            state.foods=newList
            state.cart = newCart
            console.log("CART",state.cart )
        },

        addItem: (state, action) => {
            const newList = []
            state.cart.map((item) => {
                if(item.id===action.payload){
                    newList.push({...item, amount: item.amount+1})
                }else{
                    newList.push(item)
                }
            })

            state.cart = newList
            console.log("added")
        },
        removeItem: (state, action) => {
            const newList = []
            const newFoodsList = []
            state.cart.map((item) => {
                if(item.id===action.payload){
                    if(item.amount>1){
                        newList.push({...item, amount: item.amount-1})
                    }
                    else{
                        state.foods.map((food) => {
                            if(food.id===item.id){
                                newFoodsList.push({...food, order_state: !food.order_state})
                            }else{
                                newFoodsList.push(food)
                            }
                        })

                        state.foods = newFoodsList
                    }
                }else{
                    newList.push(item)
                }
            })

            state.cart = newList
        },

        deleteItem: (state, action) => {
            const newList = []
            state.cart = state.cart.filter((item) => item.id!== action.payload)

            state.foods.map((item) => {
                if(item.id === action.payload){
                    newList.push({...item, order_state: !item.order_state})
                }else{
                    newList.push({...item})
                }
            })

            state.foods = newList
        },

        searchItems: (state, action) => {
            console.log("search works", action.payload)
            state.searchTerm = action.payload
        }
    }
})


export const {loadFood, changeOrderState, removeItem, addItem, deleteItem, searchItems} =FoodSlice.actions

export default FoodSlice.reducer