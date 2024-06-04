import { Box, Button, Container, TextField} from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSetIsAuth from "../hooks/useIsAuth";
import React from "react";
import './SignUpPage.css'

const server_address= "http://localhost:3000";

export default function SignUpForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); 
  const setIsAuth = useSetIsAuth();
  
  return (
    <div>
    <h1 className="title-signup">Registration</h1>
    <Container maxWidth={'md'}   sx={{
      position: 'relative',
      left: '8%',
      marginTop: '2%'
    }}>
        
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get('name') as string;
          const email = formData.get('email') as string;
          const password = formData.get("password") as string;
          const repeat_password = formData.get("repeat_password") as string;


          if(name == '' || email == '' || password == '')
            {
              alert("Please fill all fields.");
              return;
            }
            if (!name.trim() || name.length>50 || name.length<3) {
              alert('Please enter a valid name.');
              return;
            }
          if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
          }
          if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
          }
          if (password.length > 30) {
            alert('Password must be no more than 30 characters long.');
            return;
          }
          if(password !== repeat_password) {
            alert("Password not equals");
            return;
          }

          
          fetch(server_address + "/signup", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include",
            body: JSON.stringify({email:email, password: password, name: name})
          }).then( respone => {
            if(respone.status == 500)
              {
                alert("User already exists.");
                return;
              }
              if(respone.status != 200)
              {
                return respone.json();
              }
              else {
                setIsAuth?.(true);
                navigate("/profile");
              }
          }  
          ).then(res => {console.log(res); alert(res.message)})
          
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
          className="input-field"
          variant="filled"
          name="name"
          placeholder="Name from 3 to 50 characters"
          inputRef={inputRef}
          InputProps={{ disableUnderline: true }}
          color={"success"}
        />

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
          placeholder="Password from 6 to 30 characters"
          inputRef={inputRef}
          color={"success"}
          InputProps={{ disableUnderline: true }}
          type = "password"
        />

        <TextField
          variant="filled"
          name="repeat_password"
          placeholder="Repeat password"
          inputRef={inputRef}
          color={"success"}
          InputProps={{ disableUnderline: true }}
          type = "password"

        />

        <Button  sx={{
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
        }} className="but-signup" type="submit" >
          Sign Up
        </Button>
        <div className="question-container" style={{display:'flex',border: 'none'}}>
          <p className="question">Already have an account? </p>
          <Button onClick={()=>navigate("/login")} sx={{
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
        }}>Login</Button>
        </div>
      </Box>
    </Container>
    </div>
  );
  
}