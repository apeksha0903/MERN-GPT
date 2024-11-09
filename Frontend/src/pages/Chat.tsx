import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/Context';
import { red } from '@mui/material/colors';
import { ChatItem } from '../components/chat/chatItem';
import { IoMdSend } from 'react-icons/io';
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicators';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "model";
  content: string;
};

function Chat() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // Function to handle sending a message
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  // Function to handle deleting chats
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "DeleteChats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "DeleteChats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats failed", { id: "DeleteChats" });
    }
  };

  // Fetch chats when the component mounts
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Loaded Chats Successfully", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  // Scroll to the bottom of the chat container when chatMessages changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
      overflow: "hidden"
    }}>
      <Box sx={{
        display: { md: "flex", sm: "none", xs: "none" },
        flex: 0.2,
        flexDirection: "column",
        maxWidth: "100%",
      }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "hsl(220, 30%, 28%)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}>
           {auth?.user?.name
  ? auth.user.name.split(" ").length > 1
    ? `${auth.user.name.split(" ")[0][0].toUpperCase()}${auth.user.name.split(" ")[1][0].toUpperCase()}`
    : `${auth.user.name[0]?.toUpperCase() || ""}${auth.user.name[1]?.toUpperCase() || ""}`
  : ""}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{
            mx: "auto",
            fontFamily: "work sans",
            my: 4,
            p: 3,
          }}>
            You can ask questions about Knowledge, Business, Advice, Education, etc.
            But avoid sharing personal information.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: 600,
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A200,
              },
            }}>
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box sx={{
        display: "flex",
        flex: { md: 0.8, xs: 1, sm: 1 },
        flexDirection: "column",
        px: 3,
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden"
      }}>
        <Typography sx={{
          textAlign: "center",
          fontSize: "30px",
          color: "white",
          mb: 2,
          mx: "auto"
        }}>
          Model-Gemini-1.5-flash
        </Typography>
        <Box ref={chatContainerRef} sx={{
          width: "100%",
          height: "60vh",
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          p: 2,
          boxSizing: "border-box"
        }}>
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div style={{
          width: "100%",
          padding: "20px",
          borderRadius: 8,
          backgroundColor: "hsl(220, 30%, 28%)",
          display: "flex",
          boxSizing: "border-box"
        }}>
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              color: "white",
              border: "None",
              outline: "none",
              fontSize: "20px",
              boxSizing: "border-box"
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ mr: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;
