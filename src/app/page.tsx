"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";

export default function Home() {
  const [activeView, setActiveView] = useState("hero");

  const renderView = () => {
    switch (activeView) {
      case "hero":
        return <Hero />;
      case "solutions":
        return <Solutions />;
      case "approach":
        return <Approach />;
      case "contact":
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <main className="flex h-screen w-screen bg-background overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content Stage */}
      <div id="main-content" className="flex-grow md:ml-64 h-full relative overflow-hidden bg-slate-50" role="main">
        <div key={activeView} className="h-full w-full animate-fade-in">
            {renderView()}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
