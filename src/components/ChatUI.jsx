import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { ReactTyped } from "react-typed";

function ChatUI() {
  const [input, setinput] = useState("");
  const [answer, setAnswer] = useState("How can I assist you today?");
  const [isLoading, setIsLoading] = useState(false);
  async function generateContent() {
    if (!input) return;
    setAnswer("Loading...");
    setIsLoading(true);
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_APP_API_KEY}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: `${input} in 4 lines , with simpler words` }] }],
      },
    });
    setinput("");
    setAnswer(response.data.candidates[0].content.parts[0].text);
    setIsLoading(false);
}

return (
    <div className="bg-[#1e1e1e] m-auto h-[90%] w-[30%] relative rounded-[20px]">
        <h1 className="p-7 font-bold text-2xl">lite⚡
        </h1>
        
        <hr className="opacity-[.4]" />
        <div className="box bg-[#3c3c3c] m-10 rounded-[20px] text-[#fcfaf2] p-5 text-xl font-bold">
            {isLoading ? <span className="loading loading-dots loading-lg"></span> : <ReactTyped strings={[`${answer}`]} typeSpeed={30} />}
        </div>
        <div className="flex items-center absolute bottom-0 p-8 w-full">
            <input
                className="input w-full bg-white text-black rounded-[20px]"
                value={input}
                placeholder="Type here..."
                onChange={(e) => setinput(e.target.value)}
                name="input"
            ></input>
            <button className="btn rounded-full m-2 bg-[#3ec77d] hover:bg-[#2ca65f]" onClick={generateContent}>
                <IoSend color="black" className="text-[17px]"/>
            </button>
        </div>
    </div>
);
}

export default ChatUI;
