import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGPf3b7Cafiq7Yla4FoCLDiScjVAKTcQ4",
    authDomain: "project-guidance-1c41d.firebaseapp.com",
    projectId: "project-guidance-1c41d",
    storageBucket: "project-guidance-1c41d.appspot.com",
    messagingSenderId: "660929735902",
    appId: "1:660929735902:web:7be00af0a33f609274a64f",
    measurementId: "G-D1PM2M16BM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of threads from your database
async function getThreads(db) {
  const threadsCol = collection(db, 'threads');
  const threadSnapshot = await getDocs(threadsCol);
  const threadList = threadSnapshot.docs.map(doc => doc.data());
  return threadList;
}

// Get a list of threads for a specific user
async function getThreadsForUser(db, uid) {
    const threadsCol = collection(db, 'threads');
    const q = query(threadsCol, where('members', 'array-contains', uid));
    const threadSnapshot = await getDocs(q);
    const threadList = threadSnapshot.docs.map(doc => doc.data());
    return threadList;
  }

  // Get a list of messages for a specific thread
  async function getMessagesForThread(db, threadId) {
    const messagesCol = collection(db, 'messages');
    //const q = query(messagesCol, where('threadId', '==', threadId), orderBy('timestamp'));
    const q = query(messagesCol, where('threadId', '==', threadId));
    const messageSnapshot = await getDocs(q);
    const messageList = messageSnapshot.docs.map(doc => doc.data());
    return messageList;
  }

  function listenForNewMessages(db, threadId, onMessageReceived) {
    const messagesCol = collection(db, 'messages');
    const q = query(messagesCol, where('threadId', '==', threadId), orderBy('timestamp'));
  
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const message = change.doc.data();
          onMessageReceived(message);
        }
      });
    });
  }

// Test the getThreads function
// (async () => {
//     try {
//       const threads = await getThreads(db);

//         console.log("All threads:");

//         // Print out the threads
//         for (let index = 0; index < threads.length; index++) {
//             const element = threads[index].subject;
//             console.log(element);
            
//         }
//     //   console.log(threads);
//     } catch (error) {
//       console.error('Error getting threads:', error);
//     }
//   })();


  // Test the getThreadsForUser function
  // (async () => {
  //   try {
  //       const uid = 'feHUM4T2IVZri1oLriUknGl7PJ22'; // Josiah UID
  //       const userThreads = await getThreadsForUser(db, uid);

  //       console.log("Threads for user: " + uid);

  //       // Print out the threads
  //       for (let index = 0; index < userThreads.length; index++) {
  //           const element = userThreads[index].subject;
  //           console.log(element);
        
  //       }
  //   } catch (error) {
  //     console.error('Error getting threads:', error);
  //   }
  // })();

  // Test the getMessagesForThread function
  // (async () => {
  //   try {
  //     const threadId = 'dORB3L9x9BxCsPtBxf1i'; // Everyone Thead
  //     const messages = await getMessagesForThread(db, threadId);

  //     console.log("Messages for thread: " + threadId);
      
  //     // Print out the messages
  //     for (let index = 0; index < messages.length; index++) {
  //       const message = messages[index];
  //       console.log(message.senderName,": ", message.content);
  //     }

  //   } catch (error) {
  //     console.error('Error getting messages:', error);
  //   }
  // })();

  
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();


const configuration = new Configuration({
    organization: "org-QGPFrC2VuY4POelQsOdLm5gq",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

  //async function testOpenAI() {
  // (async () => {
  //   try {
  //     const completion = await openai.createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: [{role: "user", content: "Hello world"}],
  //     });
  //     console.log(completion.data.choices[0].message);
      
  //   } catch (error) {
  //     console.error('Error listing models:', error);
  //   }
  // })();

  // Test the getMessagesForThread function
  // (async () => {
  //   try {
  //     const threadId = 'dORB3L9x9BxCsPtBxf1i';
  //     const messages = await getMessagesForThread(db, threadId);
  
  //     console.log("Messages for thread: " + threadId);
  
  //     for (let index = 0; index < messages.length; index++) {
  //       const message = messages[index];
  //       console.log(message.senderName, ": ", message.content);
  //     }
  
  //   } catch (error) {
  //     console.error('Error getting messages:', error);
  //   }
  // })();
  
  // const threadId = 'dORB3L9x9BxCsPtBxf1i';
  
  // const unsubscribe = listenForNewMessages(db, threadId, (message) => {
  //   console.log(message.senderName, ': ', message.content);
  // });

  

  // Test the getMessagesForThread function
  // (async () => {
  //   try {
  //     const threadId = 'dORB3L9x9BxCsPtBxf1i';
  //     const messages = await getMessagesForThread(db, threadId);
  
  //     console.log("Messages for thread: " + threadId);
  
  //     for (let index = 0; index < messages.length; index++) {
  //       const message = messages[index];
  //       console.log(message.senderName, ": ", message.content);
  //     }
  
  //   } catch (error) {
  //     console.error('Error getting messages:', error);
  //   }
  // })();


  // function listenForNewMessagesAfterNow(db, threadId, onMessageReceived) {
  //   const messagesCol = collection(db, 'messages');
  //   const currentTimestamp = new Date();
  //   const q = query(
  //     messagesCol,
  //     where('threadId', '==', threadId),
  //     where('timestamp', '>', currentTimestamp),
  //     orderBy('timestamp')
  //   );
  
  //   return onSnapshot(q, (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === 'added') {
  //         const message = change.doc.data();
  //         onMessageReceived(message);
  //       }
  //     });
  //   });
  // }
  
  // const threadId = 'dORB3L9x9BxCsPtBxf1i'; // Replace with your thread ID
  // const unsubscribe = listenForNewMessagesAfterNow(db, threadId, (message) => {


  //   console.log(message.senderName, ': ', message.content);
  // });



  const systemUIDs = ["feHUM4T2IVZri1oLriUknGl7PJ22"];
  const assistantUIDs = ["6HA4v0qlNEQBIliZLJK5RLDa28z1"];

  function formatMessages(messages) {
    // Sort messages by timestamp in descending order
    messages.sort((a, b) => b.timestamp - a.timestamp);
  
    // Take the 10 most recent messages
    const recentMessages = messages.slice(0, 10);
  
    return recentMessages.map(message => {
      let role;
  
      if (systemUIDs.includes(message.senderId)) {
        role = "system";
      } else if (assistantUIDs.includes(message.senderId)) {
        role = "assistant";
      } else {
        role = "user";
      }
  
      return { role: role, content: message.content };
    });
  }

  
  // Test the getMessagesForThread function
  // (async () => {
  //   try {
  //     const threadId = 'dORB3L9x9BxCsPtBxf1i';
  //     const messages = await getMessagesForThread(db, threadId);
  
  //     console.log("Messages for thread: " + threadId);

  //     const fomatedMessages = formatMessages(messages);
  
  //     for (let index = 0; index < fomatedMessages.length; index++) {
  //       const message = fomatedMessages[index];
  //       console.log(message.role, ": ", message.content);
  //     }
  
  //   } catch (error) {
  //     console.error('Error getting messages:', error);
  //   }
  // })();
  
  // const threadId = 'dORB3L9x9BxCsPtBxf1i';
  // const allMessages = [];
  // const unsubscribe = listenForNewMessages(db, threadId, (message) => {

  //   console.log(message.senderName, ': ', message.content);
  // });


  


  // async function generateChatResponse(messages) {
  //   try {
  //     const formattedMessages = messages.map(message => {

  //       const role = "";// = message.senderId === "system" ? "system" : "user";

  //       switch (message.senderId) {
  //         case "system":
  //           role = "system";
  //           break;
  //         case "assistant":
  //           role = "assistant";
  //           break;
  //         default:
  //           role = "user";
  //           break;
  //       }
  //       return { role: role, content: message.content };
  //     });
  
  //     const completion = await openai.createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: formattedMessages,
  //     });
  
  //     console.log(completion.data.choices[0].message);
  //   } catch (error) {
  //     console.error('Error generating chat response:', error);
  //   }
  // }

  // const messages = [
  //   { senderId: "user1", content: "Hello world" },
  //   { senderId: "system", content: "System message" },
  //   { senderId: "user2", content: "Another user message" },
  // ];
  
  // generateChatResponse(messages);

  async function generateChatResponse(messages) {
    try {
      // const formattedMessages = messages.map(message => {
      //   const role = message.senderId === "system" ? "system" : "user";
      //   return { role: role, content: message.content };
      // });

      //const formattedMessages = formatMessages(messages);

      // for (let index = 0; index < messages.length; index++) {
      //   const element = messages[index];
      //   console.log(element.role, ": ", element.content);
        
      // }
  
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
  
      console.log("assistant : ", completion.data.choices[0].message.content);

      return completion.data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating chat response:', error);
    }
  }
  

  const messages = [
    { senderId: "feHUM4T2IVZri1oLriUknGl7PJ22", content: "You will be providing computer assistance for users" },
    { senderId: "feHUM4T2IVZri1oLriUknGl7PJ22", content: "Provide simple instuctions to resolve the issuse the user provides" },
    { senderId: "u00vbNFoshfcmt3rJFbBWSNHIyk2", content: "Hello my name is Janelle" },
    { senderId: "6HA4v0qlNEQBIliZLJK5RLDa28z1", content: "Hello Janelle, how can I help you today?" },
    { senderId: "u00vbNFoshfcmt3rJFbBWSNHIyk2", content: "How I change what program opens when I click on a pdf?" },
  ];
  

  import { addDoc } from 'firebase/firestore';

  async function writeMessageToThread(db, message) {
    try {
      const messagesCol = collection(db, 'messages');
      const newMessage = {
        content: message.content,
        read: message.read,
        senderName: message.senderName,
        senderId: message.senderId,
        threadId: message.threadId,
        timestamp: message.timestamp,
      };
      await addDoc(messagesCol, newMessage);
      console.log('Message written successfully');
    } catch (error) {
      console.error('Error writing message:', error);
    }
  }


  (async () => {
    try {
      const threadId = 'nZolESlGu8QU2quRu1Ps';

      // Get messages for thread from Firestore
      const messages = await getMessagesForThread(db, threadId);

      // Format messages for OpenAI
      const formattedMessages = formatMessages(messages);

      // Generate chat response from OpenAI
      const response = await generateChatResponse(formattedMessages);


      const responseMessage = {
        content: response,
        read: ['6HA4v0qlNEQBIliZLJK5RLDa28z1'],
        senderName: 'AI Guideance',
        senderId: '6HA4v0qlNEQBIliZLJK5RLDa28z1',
        threadId: threadId,
        timestamp: new Date(),
      };

      // Write message to Firestore
      await writeMessageToThread(db, responseMessage);
  
      // Print messages to console
      console.log("Messages for thread: " + threadId);
  
      // 
      for (let index = 0; index < formattedMessages.length; index++) {
        const message = formattedMessages[index];
        console.log(message.role, ": ", message.content);
      }
  
    } catch (error) {
      console.error('Error getting messages:', error);
    }
  })();
  



  
  
  
  
  