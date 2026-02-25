# Digital Time Capsule – **For the Future You (Or the Future of Your Friends)** 🕰️✨

### **Overview** 🚀

A time capsule app that lets users write messages and unlock them at a chosen future date.

With the **Digital Time Capsule**, you can:

* Create messages that unlock at a chosen future date.
* Store text and images securely using Firebase.
* Revisit past thoughts once their unlock time has passed.
* Experience a playful “message from the past” effect — no paradoxes required.

---

### **How It Works** 💻

1. **You Write Your Message**
   Type your deeply thoughtful, or completely random, message to your future self. Maybe you’ll ask yourself, “What was I thinking?” or “How do I still not know how to cook pasta?”

2. **Set Your Unlock Time**
   Pick when you want the message to appear. It could be a year, a decade, or 2045 (because let’s be real, no one’s going to remember to open it until then).

3. **Add Media**
   Include photos. Maybe a dance challenge? A prophecy about the future? A clip of your dog stealing your lunch? You decide.

4. **Sign in with Google**
   (Or don’t — we’re not judging.) Sign in like a responsible adult, or wing it like a time-traveling rebel. ⏳

5. **Activate Dark Mode**
   For maximum future vibes. Dark mode is for people who want to look like they’re working late or living in a dystopian future. It’s basically a time capsule for your eyes.

---

### **Technologies Used** 🔧

* Firebase Realtime Database
* Firebase Authentication (Google Sign-In)
* Cookies (UI preferences & auth state)
* SessionStorage
* Service Workers (basic offline support)
* Vanilla JavaScript

---

### **Key Features** 🎉

1. **Future Self?**
   Write messages for *yourself*. Or, if you’re feeling generous, write messages intended for a friend and share them later (emotionally risky, but brave).

2. **Set a Time to Unlock**
   Pick any date. Imagine rediscovering a message on your birthday… or during a full-blown “what is life?” phase.

3. **Upload Images**
   Perfect for preserving memories, embarrassing moments, or proof that you once had a solid fashion sense (questionable).

4. **Google Sign-In**
   Because signing in with Google makes everything feel more official. ☑️

5. **Dark Mode**
   For when you want secret-agent energy but are really just reminding yourself how to fold a fitted sheet.

---

### **Screenshots**

![Project Screenshot](Digital-Time-Capsule-Light.png)
![Project Screenshot](Digital-Time-Capsuled-Dark.png)

---

### **Demo Video** 🎥


[Watch the demo video here](https://youtu.be/JxN5uzTxgsI)
---

### **Getting Started** 🚀

1. Clone this repo and try not to mess anything up. (Kidding — you probably won’t.)
2. Open it in your browser and let the time-traveling magic begin.
3. If anything breaks, blame it on *time dilation*. That’s science.

---

### **Firebase Setup** 🔑

To use the **Digital Time Capsule** app, you'll need to set up **Firebase**. Here’s how you can do that:

1. **Create a Firebase Project:**

   * Go to the [Firebase Console](https://console.firebase.google.com/).
   * Create a new Firebase project or use an existing one.

2. **Get Your Firebase API Keys:**

   * Go to **Project Settings** > **General** > **Firebase SDK Snippet** and copy the config object. It should look like this:

     ```javascript
     const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
         databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_PROJECT_ID.appspot.com",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
     };
     ```

3. **Create `config.js`:**

   * Create a file called `config.js` in the root of the project and paste the config you copied inside.

     ```javascript
     // config.js

     const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
         databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_PROJECT_ID.appspot.com",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
     };

     export default firebaseConfig;
     ```

### **Roadmap** 🛤️

* **Phase 1**: Make it work (done!).
* **Phase 2**: Messages to your past self (results may be confusing).
* **Phase 3**: A “message to your future dog” feature. 🐶
* **Phase 4**: Build a time machine (stretch goal).

---

### **Final Thoughts** 🧠

This app is *whimsical*, *useful*, and only slightly a waste of time. It’s a fun experiment in locking away thoughts, memories, and mild chaos for future-you to rediscover.

So go ahead — write your future self a note.
It’s like sending a postcard to tomorrow… with more nostalgia and zero actual time travel.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

# Happy Time Traveling! ⏳🎉
