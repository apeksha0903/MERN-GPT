import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
function Logo() {
  return (
    <div 
      style={{display:'flex',
        marginRight:"auto",
        alignItems:"center",
        gap:"15px"
      }}
    >
      <Link to={'/'}>
        <img 
        src="chatbot_logo.png" 
        alt="openAI" 
        title="Logo"
        width={"30px"}
        height={"30px"}
        className="image-inverted-openai"
        />
      </Link>
      <Typography 
        sx={{
          display:{md:"block",sm:"none",xs:"none"},
          mr:"auto",
          fontWeight:"800",
          textShadow:"1px 1px 20px #000"
          }}
          >
            <span style={{fontSize:"20px"}}>MERN</span>-GPT
          </Typography>
    </div>
  )
}

export default Logo;