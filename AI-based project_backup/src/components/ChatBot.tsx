import { useEffect } from 'react';
const ChatBot = () => {
  // Load Tidio script on component mount
  useEffect(() => {
    if (document.getElementById('tidio-script')) return;
    const script = document.createElement('script');
    script.src = '//code.tidio.co/t0azhijz2z793e6fdpednhoh9srungfd.js'; // Tidio public key
    script.async = true;
    script.id = 'tidio-script';
    document.body.appendChild(script);
  }, []);
  // Component doesn't render any UI elements
  return null;
};
export default ChatBot;