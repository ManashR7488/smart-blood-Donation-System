import { create } from "zustand";
import axios from "axios";
import variables from "../env";

export const useGenStore = create((set) => ({
  messages: [
    {
      sender: "bot",
      message:
        "Hello, I am MedGenAi, a medical AI that provides personalized health advice and recommendations.",
    },
  ],
  isLoading: false,
  isTyping: false,
  generate: async (promt) => {
    set((state) => ({ ...state, isLoading: true }));
    set((state) => ({ ...state, isTyping: true }));
    try {
      set((state) => ({
        ...state,
        messages: [...state.messages, { sender: "user", message: promt }],
      }));
  
      const predata = {
        contents: [
          {
            parts: [
              {
                  // text: promt,
                text: `you are a assistant name:"Blood Buddy" of a app which is made for smart blood donation system this app is particularly mad for Bhubneswar city in odisha.responce according to previous responce or responce according to the give promt. promt:"${promt}"`,
              },
            ],
          },
        ],
      };
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${"AIzaSyBbwwrcZMy2epLIIg8zH1nGCTB6eLSvgY8"}`,
        predata
      );
      const data = await response.data.candidates[0].content.parts[0].text;
      set((state) => ({
        ...state,
        messages: [...state.messages, { sender: "bot", message: data }],
      }));
      set((state) => ({ ...state, isLoading: false })); 
      set((state) => ({ ...state, isTyping: false }));
    } catch (error) {
      console.log(error);
      set((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            sender: "bot",
            message: "Sorry, I am unable to generate a response at the moment. may be this is a Internal Or Network Error",
          },
        ],
      }));
      set((state) => ({ ...state, isLoading: false }));
      set((state) => ({ ...state, isTyping: false }));
    }
  },
}));
