import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import React from "react";



function CreateCabinForm({cabinToEditData = {}, onCloseModal}) {
  //flag to check if form is adding data or updating 
  const {id:editId, ...EditData} = cabinToEditData
  const isEditSession = Boolean(editId)
  //creating cabin code
  const {register, handleSubmit, getValues, reset, formState  } = useForm({
    defaultValues: isEditSession ? EditData :{}
  })
  const {errors} = formState
  const {isCreating, createCabin}= useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()



  const isWorking = isEditing || isCreating
  
  const onSubmitForm =(data)=>{
    const image = typeof data.image ==='string'? data.image : data.image[0]
    console.log('test', image, data)
    if(isEditSession) {
      editCabin({newCabinData: {...data, image:image}, id: editId},{
        onSuccess: (data)=>{
          reset()
          onCloseModal?.()}
      })
    }else{
      createCabin({...data, image:image},{
        onSuccess: (data)=>reset()
      })
      // console.log({...data, image:image})
    }
    //So because the image returns an object with the image file itself 
    //stored at 0, we just parse the array and include just the image 
    
  }
  const onError =(errors)=>{
    console.log(errors)
  }


  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)} type={onCloseModal?"modal":"regular"}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input 
          disabled={isWorking}
          type="text" 
          id="name" 
          {...register("name", {
            required:"This field is required"
          })} 
        />
         
      </FormRow>

      <FormRow label={"Maximum Capacity"} error={errors?.maxCapacity?.message}>
        <Input 
          type="number" 
          id="maxCapacity" 
          disabled={isWorking}
          {...register("maxCapacity", {
            required:"This field is required",
            min:{
              value:1,
              message: 'Minimum Capacity should be at least 1'
            }
          } )} />
      </FormRow>

      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
        <Input 
          type="number" 
          id="regularPrice" 
          disabled={isWorking}
          {...register("regularPrice", {
            required:"This field is required",
            min:{
              value:1,
              message: 'Regular price should be at least 1 usd'
            }
          })}  />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input type="number" 
        id="discount" 
        disabled={isWorking}
        defaultValue={0} 
        {...register("discount", {
          required:"This field is required",
          validate:(value)=> 
            value <= getValues().regularPrice ||"Discount should be less than price"
          
        })} />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea 
        type="number" 
        id="description" 
        disabled={isWorking}
        defaultValue="" 
        {...register("description", {
          required:"This field is required"
        })}  />
      </FormRow>

      <FormRow label={"Cabin Photo"} error={errors?.image?.message}>
        <FileInput 
        id="image"
        disabled={isWorking}
        accept="image/*" 
        {...register("image", {
          required: isEditSession? false:"This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={()=>onCloseModal?.()} disabled={isWorking} variations="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession?'Edit cabin': 'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
