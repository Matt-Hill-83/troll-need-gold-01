import React from "react"
import { Button } from "semantic-ui-react"
import { useDispatch } from "react-redux"
import { closeModal } from "../../app/common/modals/modalReducer"
import { socialLogin } from "../../app/firestore/firebaseService"

export default function SocialLogin() {
  return null
  const dispatch = useDispatch()

  function handleSocialLogin(provider) {
    dispatch(closeModal())
    socialLogin(provider)
  }

  return (
    <>
      <Button
        onClick={() => handleSocialLogin("facebook")}
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content="Log in with Facebook"
      />
      <Button
        onClick={() => handleSocialLogin("google")}
        icon="google"
        fluid
        color="google plus"
        content="Log in with Google"
      />
    </>
  )
}
