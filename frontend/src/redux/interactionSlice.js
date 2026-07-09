import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interactions: [],
  selectedInteraction: null,
  chatMessages: [],
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,

  reducers: {
    addInteraction(state, action) {
      state.interactions.push(action.payload);
    },

    setSelectedInteraction(state, action) {
      state.selectedInteraction = action.payload;
    },

    addMessage(state, action) {
      state.chatMessages.push(action.payload);
    },

    clearMessages(state) {
      state.chatMessages = [];
    },
  },
});

export const {
  addInteraction,
  setSelectedInteraction,
  addMessage,
  clearMessages,
} = interactionSlice.actions;

export default interactionSlice.reducer;