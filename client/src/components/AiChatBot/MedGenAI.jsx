import { useState } from "react";
import { motion } from "framer-motion";
import { FaHospitalUser } from "react-icons/fa";

export default function MedGenAIChat() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm MedGenAI, your blood donation assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const responses = {
    donate: `🩸 Thank you for your willingness to save lives! Here's what you need to know:
<ul class='list-disc pl-6'>
  <li>Age: 18-65 years</li>
  <li>Weight: Minimum 50kg</li>
  <li>Good health condition</li>
  <li>No recent major surgery</li>
</ul>
Shall I help you locate the nearest blood donation center?`,
    eligibility: `🩸 Eligibility criteria include:
<ul class='list-disc pl-6'>
  <li>No infections in past 2 weeks</li>
  <li>Hemoglobin ≥12.5 g/dL</li>
  <li>No new tattoos (last 6 months)</li>
  <li>Not pregnant or breastfeeding</li>
</ul>
Would you like to check your eligibility now?`,
    default: `🩸 I specialize in blood donation information. Ask me about:
<ul class='list-disc pl-6'>
  <li>Donation requirements</li>
  <li>Pre-donation preparation</li>
  <li>Post-donation care</li>
  <li>Center locations</li>
</ul>
How can I assist you today?`
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    const lowerMsg = userMessage.toLowerCase();
    let reply = responses.default;
    if (lowerMsg.includes("donate") || lowerMsg.includes("donation")) {
      reply = responses.donate;
    } else if (lowerMsg.includes("eligibility") || lowerMsg.includes("eligible")) {
      reply = responses.eligibility;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-5 right-5 w-14 h-14 z-[100] bg-red-800 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setVisible(!visible)}
      >
        <motion.span animate={{ rotate: visible ? 360 : 0 } }  className="text-white text-2xl">
        <FaHospitalUser />
        </motion.span>
      </motion.div>

      {visible && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed top-1/2 left-1/2 z-[100] h-150 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-95 backdrop-blur-lg border border-red-100 rounded-2xl shadow-2xl flex flex-col"
        >
          <div className="bg-gradient-to-r from-red-900 to-red-600 text-white px-6 py-4 rounded-t-2xl flex items-center gap-3">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <span className="animate-pulse text-2xl">🩸</span> MedGenAI
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-red-50/40">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl px-4 py-3 text-sm shadow max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-red-900 to-red-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-red-100 rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce delay-200"></span>
                </div>
                MedGenAI is typing...
              </div>
            )}
          </div>

          <div className="p-4 bg-white bg-opacity-80 rounded-b-2xl flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about donation requirements, eligibility, or locations..."
              className="flex-1 px-4 py-2 rounded-lg border border-red-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-gradient-to-r from-red-900 to-red-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:shadow-md hover:-translate-y-0.5 transition-all"
              onClick={sendMessage}
              disabled={input.trim()}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}