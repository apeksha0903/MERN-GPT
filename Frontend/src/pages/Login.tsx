import { Box, Typography, Button } from "@mui/material"
import { CustomisedInput } from "../components/shared/CustomisedInput"
import './css/login.css';
import { LuLogIn } from "react-icons/lu";
import toast from 'react-hot-toast';
import { useAuth } from "../context/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate= useNavigate();
  const auth=useAuth();
  const handleForm = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget);
    const email= formData.get("email") as string;
    const password=formData.get("password") as string;
    try {
      toast.loading("logging In",{id:"login"})
      await auth?.login(email,password);
      toast.success("Logged In Sucessfully",{id:"login"})
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed",{id:"login"});
    }
  }
  useEffect(()=>{
    if(auth?.user)
    {
      return navigate("/chat");
    }
  },[auth]);
  return (
    <Box 
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}  
    >
      <Box 
        padding={8} 
        mt={8} 
        display={{md:"flex",sm:"none",xs:"none"}}
      >
        <img src="chat_bot_login.jpeg" alt="ai-robot" style={{width:"400px"}}></img>
      </Box>
      <Box 
          display={'flex'} 
          flex={1} 
          justifyContent={"center"}
          alignItems={"center"}
          ml={{ md: 'auto', xs: 0 }}  
          mt={8}
          mr={{ md: 20, xs: 0 }} 
      >
        <form 
          onSubmit={(handleForm)}
          style={{
            margin: 'auto',
            padding: "10px", 
            boxShadow: "10px 10px 20px #000",
            border: "none",
            width: "100%",        
            maxWidth: "400px", 
            }}
        >
          <Box 
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              }}
            >
              <Typography 
                variant="h4"
                textAlign={'center'}
                padding={1}
                fontWeight={400}
                >
                  Login to your account
                </Typography>
                <CustomisedInput type="email" name="email" label="Email"/>    
                <CustomisedInput type="password" name="password" label="password"/>    
                <Button 
                  type="submit"
                 sx={{
                  px:2,
                  py:1,
                  mt:2,
                  width:"400px",
                  borderRadius:2,
                  bgcolor:"#00fffc",
                  ":hover":{
                    bgcolor:"white",
                    color:"black",

                  }
                  }}
                  endIcon={<LuLogIn/>}
                  >
                    Login </Button>
            </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login