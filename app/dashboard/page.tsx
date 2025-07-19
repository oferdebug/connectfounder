export default function EmergencyDashboard() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "green", fontSize: "24px" }}>
        🚨 EMERGENCY DASHBOARD WORKING! 🚨
      </h1>
      <p>If you can see this, your Next.js routing is working fine.</p>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px",
        }}
      >
        <h2>🔧 Debug Info:</h2>
        <p>• URL: dashboard-emergency</p>
        <p>• No auth required</p>
        <p>• No middleware interference</p>
        <p>• Plain React component</p>
      </div>

      <div
        style={{
          backgroundColor: "yellow",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>✅ Next Steps:</h3>
        <p>1. If you see this page → routing works</p>
        <p>2. If you don't see this page → Next.js issue</p>
        <p>3. Check browser console for errors</p>
      </div>

      <button
        onClick={() => (window.location.href = "/login")}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        ← Back to Login
      </button>
    </div>
  );
}
