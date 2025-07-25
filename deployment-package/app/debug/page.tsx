'use client';
import React, { useState, useEffect } from "react";

const DebugEverything = () => {
  const [results, setResults] = useState<any[]>([]);
  const [cookies, setCookies] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCookies(document.cookie);
      setCurrentUrl(window.location.href);
    }
  }, []);

  const addResult = (test: string, status: string, details: string) => {
    setResults((prev) => [
      ...prev,
      {
        test,
        status,
        details,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const testRoute = async (route: string | URL | Request) => {
    try {
      addResult(`Route Test: ${route}`, "🧪 TESTING", "Attempting to fetch...");

      const response = await fetch(route);
      const text = await response.text();

      if (response.ok) {
        addResult(
          `Route Test: ${route}`,
          "✅ SUCCESS",
          `Status: ${response.status}`
        );
      } else {
        addResult(
          `Route Test: ${route}`,
          "❌ FAILED",
          `Status: ${response.status} - ${text.substring(0, 100)}`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        addResult(`Route Test: ${route}`, " ERROR", error.message);
      } else {
        // Handle other types of errors
      }
    }
  };

  const testLogin = async () => {
    try {
      addResult("Login API", "🧪 TESTING", "Attempting login...");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        addResult("Login API", "✅ SUCCESS", `Token received, cookies updated`);
        setCookies(document.cookie); // Update cookie display
      } else {
        addResult("Login API", "❌ FAILED", data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        addResult("Login API", " ERROR", error.message);
      } else {
        // Handle other types of errors
      }
    }
  };

  const testRegistration = async () => {
    try {
      addResult("Registration API", "🧪 TESTING", "Attempting registration...");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Debug User",
          email: `debug-${Date.now()}@example.com`,
          password: "password123",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        addResult(
          "Registration API",
          "✅ SUCCESS",
          `User created: ${data.user?.email}`
        );
      } else {
        addResult("Registration API", "❌ FAILED", data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        addResult("Registration API", " ERROR", error.message);
      } else {
        // Handle other types of errors
      }
    }
  };

  const navigateDirectly = (path: string) => {
    addResult(`Direct Navigation`, "🧪 TESTING", `Going to ${path}...`);
    window.location.href = path;
  };

  const clearEverything = () => {
    // Clear cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    addResult(
      "Clear Everything",
      "✅ DONE",
      "Cookies, localStorage, sessionStorage cleared"
    );
    setCookies("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full">
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-red-800">
            🚨 EMERGENCY DEBUG MODE
          </h1>
          <p className="text-red-700">Let's find out exactly what's broken!</p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">🍪 Current Cookies:</h3>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              {cookies || "No cookies found"}
            </code>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">📍 Current URL:</h3>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              {currentUrl}
            </code>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => testRoute("/api/auth/login")}
            className="bg-blue-500 text-white p-2 rounded text-sm"
          >
            Test Login API
          </button>
          <button
            onClick={() => testRoute("/dashboard")}
            className="bg-green-500 text-white p-2 rounded text-sm"
          >
            Test Dashboard Route
          </button>
          <button
            onClick={() => testRoute("/dashboard-emergency")}
            className="bg-purple-500 text-white p-2 rounded text-sm"
          >
            Test Emergency Dashboard
          </button>
          <button
            onClick={testLogin}
            className="bg-orange-500 text-white p-2 rounded text-sm"
          >
            Full Login Test
          </button>
          <button
            onClick={testRegistration}
            className="bg-indigo-500 text-white p-2 rounded text-sm"
          >
            Full Registration Test
          </button>
          <button
            onClick={() => navigateDirectly("/dashboard")}
            className="bg-red-500 text-white p-2 rounded text-sm"
          >
            Force Dashboard
          </button>
          <button
            onClick={() => navigateDirectly("/dashboard-emergency")}
            className="bg-yellow-500 text-white p-2 rounded text-sm"
          >
            Force Emergency Dashboard
          </button>
          <button
            onClick={clearEverything}
            className="bg-gray-500 text-white p-2 rounded text-sm"
          >
            Clear Everything
          </button>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">🧪 Test Results:</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-gray-500 italic">
                No tests run yet. Click buttons above to start!
              </p>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">{result.test}</span>
                    <span className="text-xs text-gray-500">{result.time}</span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="mr-2">{result.status}</span>
                    <span className="text-gray-700">{result.details}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Manual URLs */}
        <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">
            🔗 Manual Test URLs:
          </h3>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Emergency Dashboard:</strong>{" "}
              <a
                href="/dashboard-emergency"
                className="text-blue-600 underline"
              >
                http://localhost:3000/dashboard-emergency
              </a>
            </div>
            <div>
              <strong>Regular Dashboard:</strong>{" "}
              <a href="/dashboard" className="text-blue-600 underline">
                http://localhost:3000/dashboard
              </a>
            </div>
            <div>
              <strong>Login:</strong>{" "}
              <a href="/login" className="text-blue-600 underline">
                http://localhost:3000/login
              </a>
            </div>
            <div>
              <strong>This Debug Page:</strong>{" "}
              <a href="/debug" className="text-blue-600 underline">
                http://localhost:3000/debug
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugEverything;
