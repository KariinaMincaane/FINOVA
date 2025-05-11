
//Import from the v11 SDK
import { initializeApp }  from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArhLXFixzSmFPv7mGfAkLXp6uCMAB847o",
  authDomain: "finova-a5e1d.firebaseapp.com",
  projectId: "finova-a5e1d",
  storageBucket: "finova-a5e1d.firebasestorage.app",
  messagingSenderId: "330673393051",
  appId: "1:330673393051:web:c1a462980a8d75bf4f653e",
  measurementId: "G-KSP7CBCVH6"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

//logout logic
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");
  if (!logoutBtn) return; 

  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.href = "sakumlapa.html";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  });
});

export { auth };
