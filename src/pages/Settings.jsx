import Heading from "../ui/Heading";
import React from "react";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
function Settings() {
  return(
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm></UpdateSettingsForm>
    </Row>)
}

export default Settings;