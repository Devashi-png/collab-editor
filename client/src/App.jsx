import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {

  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(true);

  const handleChange = (e) => {

    const newText = e.target.value;

    setText(newText);

    setSaved(false);

    socket.emit("send_text", newText);

    setTimeout(() => {
      setSaved(true);
    }, 1000);
  };

  useEffect(() => {

    socket.on("receive_text", (data) => {
      setText(data);
    });

    return () => {
      socket.off("receive_text");
    };

  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#111827] text-white"
          : "bg-[#f3f4f6] text-black"
      }`}
    >

      {/* Navbar */}
      <div
        className={`flex justify-between items-center px-8 py-5 shadow-md ${
          darkMode
            ? "bg-[#1f2937]"
            : "bg-white"
        }`}
      >

        <div>

          <h1 className="text-3xl font-bold">
            CollabSpace
          </h1>

          <p className="text-sm opacity-70">
            Real-Time Collaborative Editor
          </p>

        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-5 py-2 rounded-xl transition ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>

      {/* Main */}
      <div className="flex justify-center p-6">

        <div
          className={`w-full max-w-5xl rounded-2xl shadow-lg p-6 transition-all duration-500 ${
            darkMode
              ? "bg-[#1f2937]"
              : "bg-white"
          }`}
        >

          {/* Top Bar */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">

            <div>

              <h2 className="text-2xl font-semibold">
                Project Notes
              </h2>

              <p className="opacity-70 text-sm mt-1">
                Changes sync instantly between users
              </p>

            </div>

            <div className="flex items-center gap-4">

              <div
                className={`px-4 py-2 rounded-full text-sm ${
                  darkMode
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-700"
                }`}
              >
                ● Live
              </div>

              <div
                className={`text-sm ${
                  saved
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {saved ? "Saved" : "Saving..."}
              </div>

            </div>

          </div>

          {/* Editor */}
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Start writing your ideas here..."
            className={`w-full h-[550px] p-6 rounded-2xl resize-none outline-none text-lg leading-8 transition-all duration-500 ${
              darkMode
                ? "bg-[#111827] text-white"
                : "bg-[#f9fafb] text-black"
            }`}
          />

          {/* Bottom Section */}
          <div className="flex justify-between items-center mt-4 text-sm opacity-70">

            <p>
              Characters: {text.length}
            </p>

            <p>
              {new Date().toLocaleString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
                