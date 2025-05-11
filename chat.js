// chat.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// 2.1) Initialize Firebase
const firebaseConfig = {
  apiKey:            "AIzaSyArhLXFixzSmFPv7mGfAkLXp6uCMAB847o",
  authDomain:        "finova-a5e1d.firebaseapp.com",
  projectId:         "finova-a5e1d",
  storageBucket:     "finova-a5e1d.firebasestorage.app",
  messagingSenderId: "330673393051",
  appId:             "1:330673393051:web:c1a462980a8d75bf4f653e",
  measurementId:     "G-KSP7CBCVH6"
};
const app   = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const db    = getFirestore(app);

// 2.2) Identify the group to chat in
//    – For now we hardcode; later you can read a URL param
const groupId = "advanced-calculus";
const msgsRef = collection(db, "groups", groupId, "messages");

// 2.3) Grab the DOM elements
const messagesDiv = document.getElementById("messages");
const inputEl     = document.getElementById("msgInput");
const sendBtn     = document.getElementById("sendBtn");

// 2.4) Listen for auth state and then stream messages
onAuthStateChanged(auth, user => {
  if (!user) {
    messagesDiv.innerHTML = "<p>Please <a href='log_in.html'>log in</a> to chat.</p>";
    sendBtn.disabled = true;
    return;
  }

  const q = query(msgsRef, orderBy("createdAt"));
  onSnapshot(q, snapshot => {
    messagesDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const { text, uid, createdAt } = doc.data();
      const time = createdAt?.toDate().toLocaleTimeString() || "";
      const div = document.createElement("div");
      div.className = "msg";
      div.innerHTML = `
        <div class="meta"><strong>${uid}</strong> @ ${time}</div>
        <div class="body">${text}</div>
      `;
      messagesDiv.append(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
});

// 2.5) Send new messages on button click
sendBtn.addEventListener("click", async () => {
  const text = inputEl.value.trim();
  if (!text || !auth.currentUser) return;
  await addDoc(msgsRef, {
    text,
    uid: auth.currentUser.email || auth.currentUser.uid,
    createdAt: serverTimestamp()
  });
  inputEl.value = "";
});
