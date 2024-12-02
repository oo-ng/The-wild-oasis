import Form from '../../ui/Form';
import React, { useEffect } from 'react';
import { FormRow } from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSettings';

function UpdateSettingsForm() {
  const {isPending, settingsData} = useSettings()
  const {isUpdating, updateSetting} = useUpdateSetting()
  
  
  function handleUpdate(e, field){
    const {value} = e.target
    if(!value)return
    updateSetting({[field]:value})
  }
  return (
    <Form >
      <FormRow label='Minimum nights/booking'>
        <Input defaultValue={settingsData?.minBookingLength} type='number' id='min-nights' disabled={isUpdating} onBlur={(e)=>handleUpdate(e,"minBookingLength")} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input defaultValue={settingsData?.maxBookingLength} type='number' id='max-nights' disabled={isUpdating} onBlur={(e)=>handleUpdate(e,"maxBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input defaultValue={settingsData?.maxGuestPerBooking} type='number' id='max-guests' disabled={isUpdating} onBlur={(e)=>handleUpdate(e,"maxGuestPerBooking")}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input defaultValue={settingsData?.breakfastPrice} type='number' id='breakfast-price' disabled={isUpdating} onBlur={(e)=>handleUpdate(e,"breakfastPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
