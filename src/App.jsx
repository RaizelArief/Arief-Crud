import React from "react";
import "./App.css";
import Data from "./component/Data";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar />
      <main className="flex-1 max-w-full px-4 py-6">
        <Data />
      </main>
      <Footer />
    </div>
  );
}

export default App;
