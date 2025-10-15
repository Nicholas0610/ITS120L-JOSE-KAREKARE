import React from "react";
import ReactDOM from "react-dom/client";

// Main App component
function App() {
return (
<div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
<h1>Jose's Kare-kare and Bulalo House</h1>
<p>Welcome to our AI-based food ordering platform!</p>
    </div>
    );
}

// Render the App inside the <div id="root"></div> from index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
    <App />
  </React.StrictMode>
);
