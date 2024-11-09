import { TextField } from "@mui/material";

type props={
    name:string;
    type:string;
    label:string;
}
export const CustomisedInput=(Props: props)=> {
  return (
    <TextField 
    sx={{padding:"10px", mt:"10px"}}
    InputLabelProps={{style:{color:"white",fontSize:"20px"}}} 
    name={Props.name} 
    type={Props.type} 
    label={Props.label}
    inputProps={{style:{width:"300px",borderRadius:10, fontSize:20,color:"white", margin:"normal"}}}
    />
  )
};

