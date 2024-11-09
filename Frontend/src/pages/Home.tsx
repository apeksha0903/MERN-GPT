import { Box } from "@mui/material"
import TypeAnim from "../components/typer/TypeAnimation"

function Home() {
  return (
    <Box sx={{
      height:"100%",
      width:"100%",
      }}>
        <Box sx={{
          display:"flex",
          width:"100%",
          flexDirection:"column",
          alignItems:"center",
          mx:"auto",
          my:"20px",
        }}
        >
          <Box>
            <TypeAnim/>
          </Box>
          <Box sx={{
            width:"100%",
            display:"flex",
            flexDirection:{md:"row",xs:"column",sm:"column"},
            gap:5,
            my:5,
          }}>
            <img src="robot.png" alt="robot" style={{width:"200px",margin:"auto"}}/>
            <img className="Gemini-img rotate" src="chatbot_logo.png" alt="gemini" style={{width:"200px",margin:"auto"}}/>
          </Box>
          <Box sx={{
            display:"flex",
            width:"100%",
            mx:"auto"
          }}>
            <img src="chat.png" alt="chat" style={{display:"flex",margin:"auto",width:"60%",borderRadius:20,boxShadow:"-5px -5px 105px #64f3d5",marginTop:20,marginBottom:20}}/>
          </Box>
        </Box>
    </Box>
  )
}

export default Home