import React, { useMemo } from "react";
import api from "../api/api"; // ✅ default import (match your hook)
import useConcerts from "../hooks/useConcerts"; // ✅ adjust path
import { deleteConcert } from "../api/concerts";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Concerts = () => {

  
  const isAdmin = isAuthenticated()
  const { concerts, loading, error, removeConcert } = useConcerts();
  
  // 📅 Date formatter (runs once per render)
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/Athens",
      }),
    []
  );
 {/*Fetching concerts and removeConcert are called from useConcerts,
  I DID THIS CAUSE I WANTED TO FETCH AGAIN CONCERTS FOR THE HOME
  SO I DONT WRITE CODE TO FETCH TWICE THE CONCERTS */}
  const handleDelete = async (id) => {
    if (!isAuthenticated()) return;
    if (!window.confirm("Delete this concert?")) return;

    try {
      await deleteConcert(id)
      removeConcert(id); // ✅ updates hook state
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete concert.");
    }
  };
 
  if (loading) return <p>Loading concerts...</p>;
  if (error)   return <p style={{color:'crimson'}}>Error: {error}</p>;
  
  


  return (
    <div className="concerts-page">
      <h1>Concerts</h1>

      {concerts.length === 0 ? (
        <p>No concerts available.</p>
      ) : (
        <>
          {/* Admin action */}
          {isAdmin && (
            <Link
              to="/createConcert"
              className="inline-block text-sm px-3 py-1 rounded bg-black text-white mb-4"
            >
              + Create Concert
            </Link>
          )}

          <ul>
            {concerts.map((concert) => (
              <li
                key={concert.id}
                className="mb-6 border p-4 rounded-xl shadow"
              >
                <h2 className="text-xl font-semibold">
                  {concert.title || "Untitled Concert"}
                </h2>

                <p>
                  <strong>Date:</strong>{" "}
                  {fmt.format(new Date(concert.date_start))}
                </p>

                {Array.isArray(concert.program) &&
                  concert.program.length > 0 && (
                    <ul
                      style={{
                        marginTop: 4,
                        paddingLeft: 0,
                        listStyle: "none",
                      }}
                    >
                      {[...concert.program]
                        .sort(
                          (a, b) =>
                            (a.order ?? 0) - (b.order ?? 0)
                        )
                        .map((piece) => (
                          <li key={piece.id}>
                            {piece.composer}: {piece.title}
                          </li>
                        ))}
                    </ul>
                  )}
                  {/* 
                    <p className="text-xs text-gray-500">
                  Auth: {String(isAdmin)}
                </p>
                */}
              
                {/* Admin-only per concert */}
                {isAdmin  && (
                  
                  <div className="mt-3">
                    <Link
                      to={`/concerts/${concert.id}/edit`}
                      className="inline-block text-sm px-3 py-1 rounded bg-black text-white mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(concert.id)
                      }
                      className="inline-block text-sm px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Concerts;