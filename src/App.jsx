import { useEffect, useState } from 'react'
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Spinner } from 'flowbite-react';
import _ from 'lodash';

import './App.css'


function App() {

  const chatModel = new ChatOpenAI({
    openAIApiKey: "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",
  });

  const [messages, setMessages] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);



  const getResp = async (userInput) => {

    setMessages(null);
    setIsFetching(true);

    try {

      const response = await chatModel.stream(userInput);
      console.log(response);
      setChatHistory([...chatHistory, response])
      setMessages(response);
    } catch (error) {
      console.error('getResp', error)
    } finally {
      setIsFetching(false);
    }

  }

  useEffect(() => {
    console.log(chatHistory)
  }, [chatHistory]);

  const handleClick = async () => {
    setQuery('')
    const prompt = ChatPromptTemplate.fromMessages([
      ["user", "{input}"],
    ]);
    const promptValue = await prompt.invoke({ input: query });
    const promptAsString = promptValue.toString();
    console.log(promptValue)
    chatHistory.push(...promptValue.messages);
    setChatHistory([...chatHistory,])
    getResp(promptAsString);
  }

  

  function renderChats() {
    if(_.isEmpty(chatHistory)) return null;

    return  chatHistory
    .filter((chat) => !_.isEmpty(chat.content))
    .map((chat, index) => 
    <p key={index} className='p-3 border rounded mt-5'>
      {chat?.content}</p>);
  }


  return (
    <div className='h-screen w-screen p-5 flex flex-col justify-end'>
  
      <div>

        {renderChats()}
        {isFetching ? <div className="text-left p-5">
          <Spinner aria-label="Center-aligned spinner example" size="md" />
        </div> : null
        }
      </div>
      <div className='flex flex-col gap-4 mt-5'>
        <label className='text-2xl'>Type query</label>
        <input type='text' className='rounded text-xl p-3 bg-gray-900' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>


    </div>
  )

}

export default App
