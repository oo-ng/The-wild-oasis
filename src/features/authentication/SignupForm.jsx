import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import React from "react";
import { FormRow } from "../../ui/FormRow";
import { useSignUp } from "./useSignUp";


// Email regex: /\S+@\S+\.\S+/

export function SignupForm() {
  const{signUp, isSigningUp}= useSignUp()
   const {register, reset, getValues, formState, handleSubmit}= useForm()
   const {errors} = formState

   function onSubmit({fullName, email, password }){
    signUp({fullName, email, password },
      {onSettled:()=> reset}
    )
   }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input 
        type="text" 
        id="fullName"
        disabled={isSigningUp}
        {...register("fullName", {required: 'This field is required'})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" 
        id="email"
        disabled={isSigningUp}
        {...register("email", {required: 'This field is required', pattern:{
          value:/\S+@\S+\.\S+/,
          message: "Provide a valid email address"
        }})} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" 
        id="password"
        disabled={isSigningUp}
        {...register("password", 
        {required: 'This field is required',
          minLength:{
            value:8,
            message:'Password needs a minimum of 8 characters'}
        }, 
        )} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" 
        disabled={isSigningUp}
        id="passwordConfirm"
        {...register("passwordConfirm", {required: 'This field is required',
          validate:(value)=> value === getValues().password|| 'Password needs to match'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
        disabled={isSigningUp} 
        onClick={reset}
        variations="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigningUp} type="submit">Create new user</Button>
      </FormRow>
    </Form>
  );
}


