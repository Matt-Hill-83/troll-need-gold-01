import React from "react"
import { Button } from "semantic-ui-react"
import { Formik, Form } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"

import { updateUserProfile } from "../../../app/firestore/firestoreService"
import MyTextArea from "../../../app/common/form/MyTextArea"
import MyTextInput from "../../../app/common/form/MyTextInput"

export default function ProfileForm({ profile }) {
  console.log("profile", profile) // zzz
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
        cat: profile.cat || "",
        userStatus: JSON.stringify(profile.userStatus) || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values)
        } catch (error) {
          toast.error(error.message)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea
            name="description"
            placeholder="Description"
            label="description"
          />
          <MyTextArea name="cat" placeholder="Cat" label="cat" />
          <MyTextArea
            name="userStatus"
            placeholder="userStatus"
            label="props"
          />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
            type="submit"
            size="large"
            positive
            content="Update profile"
          />
        </Form>
      )}
    </Formik>
  )
}
