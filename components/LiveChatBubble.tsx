
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import XIcon from './icons/XIcon';
import Button from './Button';

interface QuickReply {
  question: string;
  answer: string;
}

const quickReplies: QuickReply[] = [
  { question: "Payment options?", answer: "We accept MTN MoMo, Telecel Cash, and Card payments. You can also opt for Delivery First and pay on delivery/pickup." },
  { question: "Delivery time?", answer: "Standard delivery within Accra is 1-2 days. Outside Accra, it's 2-4 days. We'll confirm when you place your order." },
  { question: "How to track order?", answer: "Once your order is shipped for online payments, you'll get a tracking number. For 'Delivery First', our team will coordinate with you directly." },
];

const LiveChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatLog, setChatLog] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleQuickReply = (reply: QuickReply) => {
    setChatLog(prev => [
      ...prev,
      { type: 'user', text: reply.question },
      { type: 'bot', text: reply.answer },
    ]);
  };

  return (
    <>
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[90] bg-electric-orange text-white p-4 rounded-full shadow-soft-xl dark:shadow-dark-soft-xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close chat" : "Open live chat"}
      >
        <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
            <motion.div key="closeChat" initial={{rotate: -90, opacity:0}} animate={{rotate:0, opacity:1}} exit={{rotate: -90, opacity:0}}>
                <XIcon className="w-7 h-7" />
            </motion.div>
        ) : (
            <motion.div key="openChat" initial={{rotate: 90, opacity:0}} animate={{rotate:0, opacity:1}} exit={{rotate: 90, opacity:0}}>
                <ChatBubbleIcon className="w-7 h-7" />
            </motion.div>
        )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-[89] w-80 sm:w-96 max-h-[70vh] bg-white dark:bg-dm-medium-gray rounded-xl shadow-soft-2xl dark:shadow-dark-soft-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-window-title"
          >
            <header className="p-4 bg-deep-purple dark:bg-dm-deep-purple text-white flex justify-between items-center">
              <h3 id="chat-window-title" className="font-semibold">ModernShop Support</h3>
              <button onClick={toggleChat} className="text-gray-300 hover:text-white" aria-label="Close chat window">
                <XIcon className="w-5 h-5" />
              </button>
            </header>
            
            <div className="flex-grow p-4 space-y-3 overflow-y-auto">
              {chatLog.length === 0 && (
                <div className="text-center text-gray-500 dark:text-dm-lighter-gray py-4">
                  Hi there! How can we help you today? Select a quick question below.
                </div>
              )}
              {chatLog.map((entry, index) => (
                <div key={index} className={`flex ${entry.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] p-2.5 rounded-lg text-sm
                      ${entry.type === 'user' 
                        ? 'bg-electric-orange text-white rounded-br-none' 
                        : 'bg-gray-100 dark:bg-dm-dark-gray text-dark-gray dark:text-dm-light-gray rounded-bl-none'
                      }`}
                  >
                    {entry.text}
                  </div>
                </div>
              ))}
            </div>

            <footer className="p-3 border-t border-gray-200 dark:border-dm-dark-gray bg-gray-50 dark:bg-dm-dark-gray space-y-2">
              <p className="text-xs text-center text-gray-500 dark:text-dm-lighter-gray mb-1">Quick Questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickReplies.map((qr) => (
                  <Button
                    key={qr.question}
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleQuickReply(qr)}
                    className="!text-xs text-left justify-start !py-1.5"
                  >
                    {qr.question}
                  </Button>
                ))}
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatBubble;
