import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignIn } from '@clerk/clerk-react';
import React from "react";

export function SignIn() {
  const navigate = useNavigate();
  const { signIn, isLoaded } = useSignIn();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const handleSignIn = async () => {

    try {
      await signIn.create({ identifier: username, password });
      navigate(0);
      console.log('Successfully signed in');
      
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Failed to sign in. Please check your credentials');
    }

  };

  return (
    <section className=" flex gap-4 items-center justify-between h-screen bg-[#007a82]">
      <div className="w-full bg-[#007a82] mx-auto rounded-[20px]">
        <div className="w-11/12 mx-auto py-[50px]  lg:block flex justify-center items-center ">
          <img
            src="/img/logo-light.svg"
            className="w-10/12 object-cover m-auto"
          />
        </div>
      </div>
      <div className="w-2/3  justify-center items-center bg-white mx-20 rounded-lg py-10">
      
        <div className="text-center">
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-noto text-[#007a82] mx-10 font-extrabold">أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-2/3">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" className="-mb-2 font-medium text-[#007a82] font-noto">
          
              إسم المستخدم أو البريد الإلكتروني
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
              defaultValue={"admin"}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography variant="small" className="-mb-2  mt-3 font-medium text-[#007a82] font-noto">
            كلمة المرور
            </Typography>
            <Input
              type="password"
              size="lg"
              defaultValue={"admin"}
              placeholder="********"
              className=" !border-[#01A4AC] focus:!border-[#01A4AC]"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button className="mt-10 text-lg bg-[#007a82]" fullWidth onClick={()=>handleSignIn()}>
              تسجيل الدخول
          </Button>
        </form>

      </div>
      

    </section>
  );
}

export default SignIn;
