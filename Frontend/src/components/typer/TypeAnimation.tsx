import { TypeAnimation } from 'react-type-animation'
function TypeAnim() {
  return (
    <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Chat With Your Own AI 💻',
    1000,
    'Built with Gemini',
    2000,
    'Your Own Personlised ChatBot🤖',
    1500,
  ]}
  speed={50}
  style={{ fontSize:"40px", color:"white",display:"inline-block", textShadow:"1px 1px 20px #000" }}
  repeat={Infinity}
/>
  )
}

export default TypeAnim;