// src/components/PageBackgrounds.jsx
import React from "react";

export function BgEditorial() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-br
          from-[#e2dbd4]
          via-[#f2ede8]
          to-[#e7dfd7]"
      />
      <div className="absolute -top-48 -left-48 h-[800px] w-[800px] rounded-full bg-[#e5d6c6]/30 blur-3xl" />
      <div className="absolute top-1/2 -right-48 h-[700px] w-[700px] rounded-full bg-[#d8cbbd]/20 blur-3xl" />
    </div>
  );
}

export function BgStageLight() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-br
          from-[#cfc9c2]
          via-[#e6e0da]
          to-[#f2ede8]"
      />
      <div className="absolute -top-60 left-1/4 h-[900px] w-[900px] rounded-full bg-[#b8afa5]/25 blur-[160px]" />
      <div className="absolute bottom-0 -right-60 h-[800px] w-[800px] rounded-full bg-[#d9cec2]/25 blur-[160px]" />
    </div>
  );
}

export function BgEveningHall() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-br
          from-[#d6cfc7]
          via-[#efe8e1]
          to-[#f5f1ec]"
      />
      <div className="absolute top-1/4 -left-48 h-[800px] w-[800px] rounded-full bg-[#e2cbb4]/35 blur-3xl" />
      <div className="absolute bottom-0 -right-48 h-[700px] w-[700px] rounded-full bg-[#d1bfae]/30 blur-3xl" />
    </div>
  );
}