// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVEaivv2KHC7A3YItwM6rTK7ZOlS68hWs",
  authDomain: "chatting-1d287.firebaseapp.com",
  projectId: "chatting-1d287",
  storageBucket: "chatting-1d287.appspot.com",
  messagingSenderId: "653815240754",
  appId: "1:653815240754:web:7b44f598b312bea71ec42b",
  measurementId: "G-23RPZDMDRW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the chat collection in Firestore
const chatRef = db.collection('chatMessages');

// Send message function
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const messageText = messageInput.value.trim();

  if (messageText) {
    // Add message to Firestore
    chatRef.add({
      text: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = ''; // Clear input
  }
}

// Real-time listener for new chat messages
chatRef.orderBy('timestamp').onSnapshot(snapshot => {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = ''; // Clear current messages

  snapshot.forEach(doc => {
    const message = doc.data();
    const messageElement = document.createElement('p');
    messageElement.textContent = message.text;
    chatBox.appendChild(messageElement);
  });
});

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Optional: Enter key event listener for sending messages
document.getElementById('messageInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
