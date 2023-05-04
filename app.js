const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, doc, orderBy, onSnapshot } = require('firebase/firestore');

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
    const q = query(messagesCol, where('threadId', '==', threadId), orderBy('timestamp'));
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
  (async () => {
    try {
      const threadId = 'dORB3L9x9BxCsPtBxf1i'; // Everyone Thead
      const messages = await getMessagesForThread(db, threadId);

      console.log("Messages for thread: " + threadId);
      
      // Print out the messages
      for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        console.log(message.senderName,": ", message.content);
      }

    } catch (error) {
      console.error('Error getting messages:', error);
    }
  })();

  const threadId = 'dORB3L9x9BxCsPtBxf1i'; // Replace with the thread ID you want to listen for new messages

  const unsubscribe = listenForNewMessages(db, threadId, (message) => {
    console.log(message.senderName, ': ', message.content);
  });