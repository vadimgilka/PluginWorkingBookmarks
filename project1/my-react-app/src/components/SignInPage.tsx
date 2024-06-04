import { Box, Button, Container, TextField} from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSetIsAuth from "../hooks/useIsAuth";
import React from "react";
import './SignInPage.css'

const server_address= "http://localhost:3000";

export default function SignInForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); 
  const setIsAuth = useSetIsAuth();
  return (
    <div>
    <h1 className="title-signup">Login</h1>
    <Container maxWidth={'md'} sx={{
      position: 'relative',
      left: '8%',
      marginTop: '2%'
    }}>
        
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email') as string;
          const password = formData.get("password") as string;
          
          if(email == '' || password == '')
            {
              alert("Please fill all fields.");
              return;
            }




          fetch(server_address + "/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
            body: JSON.stringify({email:email, password: password})
          }).then( respond => {
            if(respond.status == 500)
              {
                alert("Incorrect password.");
                return;
              }
              if(respond.status == 404)
                {
                  alert("User doesn't exist.");
                  return;
                }
            if(respond.status != 200)
            {
              
              return respond.json();
            }
            else {
              setIsAuth?.(true);
              navigate("/profile");
            }
        }  
        ).then(res => {
          console.log(res); 
          if (res == undefined) { return } alert(res.message)})
          
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
          fontFamily: 'Inika',
        }}
      >
        <TextField
          variant="filled"
          name="email"
          placeholder="Email"
          inputRef={inputRef}
          InputProps={{ disableUnderline: true }}
          color={"success"}
        />

        <TextField
          variant="filled"
          name="password"
          placeholder="Password"
          inputRef={inputRef}
          InputProps={{ disableUnderline: true }}
          color={"success"}
          type = "password"
        />

        <Button sx={{
            backgroundColor: '#6A110B',
            color: 'white',
            fontFamily: 'Inika',
            width: '30%',
            alignSelf: 'center',
            fontSize: 'large',
            marginTop: '2%',
            '&:hover': {
              backgroundColor: '#6A110B', // Цвет фона при наведении
              color: 'white', // Цвет текста при наведении
            }
        }} type="submit" color={"success"}>
          Login
        </Button>
        <div className="question-container" style={{display:'flex',border: 'none'}}>
          <p className="question">Don't have an account? </p>
          <Button onClick={()=>navigate("/signup")} sx={{
            color: '#6A110B',
            fontFamily: 'Inika',
            fontSize: 'large',
            fontWeight: 600,
            marginTop:'0.5%',
            '&:hover': {
              backgroundColor: 'transparent', // Цвет фона при наведении
              color: '#6A110B', // Цвет текста при наведении
              textDecorationLine: 'underline'
            }
        }}>Create</Button>
        </div>
      </Box>
    </Container>
    </div>
  );
}