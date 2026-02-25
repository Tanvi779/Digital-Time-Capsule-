import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// Firebase setup
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Firebase Realtime Database setup
const database = getDatabase();

// DOM elements
const signOutButton = document.getElementById('sign-out');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');

document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')  
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  } else {
    console.log('Service Workers are not supported in this browser.');
  }

  const imageUpload = document.getElementById('image-upload');
 
  if (imageUpload) {
    imageUpload.addEventListener('change', handleImageUpload);
  } else {
    console.error("Image upload input element not found.");
  }
  
  function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const message = document.getElementById('message').value;
      const unlockTime = document.getElementById('unlock-time').value;
      storeMessageAndImageInRealtimeDatabase(message, unlockTime, reader.result);
    };
    reader.readAsDataURL(file);
  }

  function storeMessageAndImageInRealtimeDatabase(messageData, unlockTime, imageData) {
    const messageRef = ref(database, 'messages');
    const imageRef = ref(database, 'images');

    // Create the message object to store in 'messages' node
    const messageObject = {
      message: messageData,
      unlockTime: unlockTime,
      created: new Date().toISOString(),
    };

    const imageObject = {
      imageData: imageData,
      created: new Date().toISOString(),
    };

    const newMessageKey = push(messageRef).key;
    const newImageKey = push(imageRef).key;

    set(ref(database, 'messages/' + newMessageKey), messageObject);
    set(ref(database, 'images/' + newImageKey), imageObject);

    console.log("Message and image stored in Firebase Realtime Database.");
  }

  const mode = document.getElementById('mode-toggle');
  const body = document.body;

  const savedMode = getCookie('mode');
  if (savedMode === 'dark') {
    body.classList.add("dark");
    mode.checked = true;
  } else {
    body.classList.remove('dark');
  }

  mode.addEventListener('change', () => {
    mode.checked 
      ? (body.classList.add("dark"), storeCookie('dark'), console.log("Dark mode activated"))
      : (body.classList.remove("dark"), storeCookie('light'), console.log("Light mode activated"));
  });

  function storeCookie(modeValue) {
    document.cookie = `mode=${modeValue}; max-age=${365 * 24 * 60 * 60}; path=/`; 
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  document.getElementById('google-sign-in').addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        userName.textContent = user.displayName || 'No name provided';
        userEmail.textContent = user.email;
        userInfo.style.display = 'block';  
        signOutButton.style.display = 'block'; 
    
        setAuthCookie(user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
      });
  });

  signOutButton.addEventListener("click", () => {
    firebaseSignOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        userInfo.style.display = 'none';  
        signOutButton.style.display = 'none';

        clearAuthCookie();
      })
      .catch((error) => {
        console.error("Error during sign-out:", error.message);
      });
  });

  document.getElementById("upload-trigger")
  .addEventListener("click", () => {
    document.getElementById("image-upload").click();
  });

  function setAuthCookie(user) {
    document.cookie = `userAuthenticated=true; max-age=${365 * 24 * 60 * 60}; path=/`;
    document.cookie = `userName=${user.displayName}; max-age=${365 * 24 * 60 * 60}; path=/`;
  }

  function clearAuthCookie() {
    document.cookie = `userAuthenticated=false; max-age=0; path=/`;
    document.cookie = `userName=; max-age=0; path=/`;
  }

     const submitBtn = document.querySelector('.submit-btn');
    const messageInput = document.getElementById('message');
    const unlockTimeInput = document.getElementById('unlock-time');
    
    flatpickr(unlockTimeInput, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",  
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault(); 

        const messageValue = messageInput.value.trim();
        const unlockTimeValue = unlockTimeInput.value;

        console.log("Message Value: ", messageValue);
        console.log("Unlock Time Value: ", unlockTimeValue);

        if (!messageValue) {
            console.error("Message is empty!");
            return;
        }
        if (!unlockTimeValue) {
            console.error("Unlock time is empty! Make sure to select a date/time.");
            return;
        }

        console.log("Message: ", messageValue);
        console.log("Unlock Time: ", unlockTimeValue);

        sessionStorage.setItem("message", messageValue);
        sessionStorage.setItem("unlockTime", unlockTimeValue);

        storeMessageInRealtimeDatabase({
            text: messageValue,
            unlockTime: unlockTimeValue,
            recipient: "Future Self",
        });

        alert("Message saved successfully! Check console for details.");
    });

    function storeMessageInRealtimeDatabase(messageData) {
        const messageRef = ref(database, 'messages');
        const newMessageKey = push(messageRef).key;

        const messageObject = {
            message: messageData.text,
            recipient: messageData.recipient,
            unlockTime: messageData.unlockTime,
            created: new Date().toISOString(),
        };

        set(ref(database, 'messages/' + newMessageKey), messageObject);
        console.log("Message stored in Firebase Realtime Database.");
    }
 });
