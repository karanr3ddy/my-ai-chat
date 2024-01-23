import { useEffect, useState } from 'react'
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import './App.css'


function App() {

  const chatModel = new ChatOpenAI({
    openAIApiKey: "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",
  });

  const [messages, setMessages] = useState();
  const [query, setQuery] = useState();



  const getResp = async (promptAsString) => {
    const response = await chatModel.invoke(promptAsString);
    console.log(response);
    setMessages(response);
  }

  useEffect(() => {



    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a world class technical documentation writer."],
      ["user", "{input}"],
    ]);
    const promptAsString = "Human: Tell me a short joke about ice cream";



    // getResp(promptAsString);


  }, []);

  const handleClick = () => {
    getResp(query);
  }

  return (
    <>
      <h1>Hello</h1>
      <div className='flex flex-col gap-4 mt-5'>
        <label className='text-2xl'>Type query</label>
        <input type='text' className='rounded text-xl p-3' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>

      <p className='p-8 text-xl mt-5'>{messages?.content}</p>
    </>
  )
}

export default App
