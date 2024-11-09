import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/Context";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type MessageBlock = 
  | { type: "code"; content: string }
  | { type: "inline-code"; content: string }
  | { type: "text"; content: string };

function extractMessageBlocks(message: string): MessageBlock[] {
  const regex = /```([\s\S]*?)```|`([^`]+)`|([^`]+)/g;  // Include inline code capture
  const blocks: MessageBlock[] = [];
  let match;

  while ((match = regex.exec(message)) !== null) {
    if (match[1]) {
      // Code block
      blocks.push({ type: "code", content: match[1].trim() });
    } else if (match[2]) {
      // Inline code
      blocks.push({ type: "inline-code", content: match[2].trim() });
    } else if (match[3]) {
      // Text block
      blocks.push({ type: "text", content: match[3].trim() });
    }
  }

  return blocks;
}
function formatText(message: string): string {
  return message
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
    // Replace inline code first
    .replace(/([^]+)/g, '<code>$1</code>')        // Inline code
    // Replace bold formatting next
    .replace(/__(.*?)__/g, '<strong>$1</strong>')     // Bold
    // Replace italics last
    .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Italics
    // Convert newlines to <br/> for line breaks
    .replace(/\n/g, '<br/>');
}


interface ChatItemProps {
  content: string;
  role: "user" | "assistant";
}

export const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const messageBlocks = extractMessageBlocks(content);
  const auth = useAuth();

  return role !== "user" ? (
    <Box sx={{
      display: "flex",
      p: 2,
      bgcolor: "#004d5612",
      my: 2,
      gap: 2,
    }}>
      <Avatar sx={{ ml: "0" }}>
        <img src='chatbot_logo.png' alt='chatBot' width='30px' />
      </Avatar>
      <Box sx={{ textAlign: "justify" }}>
        {messageBlocks.map((block, index) => {
          if (block.type === "code") {
            return (
              <SyntaxHighlighter key={index} customStyle={{ overflow: "auto" }} style={coldarkDark} language="javascript">
                {block.content}
              </SyntaxHighlighter>
            );
          }
          if (block.type === "inline-code") {
            return (
              <SyntaxHighlighter key={index} customStyle={{ display: 'inline-block' }} style={coldarkDark} language="javascript">
                {block.content}
              </SyntaxHighlighter>
            );
          }
          return (
            <Typography 
              key={index} 
              fontSize={"20px"} 
              dangerouslySetInnerHTML={{ __html: formatText(block.content)}} 
            />
          );
        })}
      </Box>
    </Box>
  ) : (
    <Box sx={{
      display: "flex",
      p: 2,
      bgcolor: "#004d56",
      gap: 2,
    }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name
  ? auth.user.name.split(" ").length > 1
    ? `${auth.user.name.split(" ")[0][0].toUpperCase()}${auth.user.name.split(" ")[1][0].toUpperCase()}`
    : `${auth.user.name[0]?.toUpperCase() || ""}${auth.user.name[1]?.toUpperCase() || ""}`
  : ""}
      </Avatar>
      <Box sx={{ textAlign: "justify" }}>
        <Typography 
          fontSize={"20px"} 
          dangerouslySetInnerHTML={{ __html: formatText(content) }} 
        />
      </Box>
    </Box>
  );
};
