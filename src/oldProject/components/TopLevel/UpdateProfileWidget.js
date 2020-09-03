import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "semantic-ui-react"

import {
  getUserProfile,
  updateUserProfile,
} from "../../../app/firestore/firestoreService"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import { listenToSelectedUserProfile } from "../../../features/profiles/profileActions"
import _isEqual from "lodash.isequal"

export default function UpdateProfileWidget(props) {
  useEffect(() => {
    console.log("new props ===UpdateProfileWidget===>>>>>")
    updatePropsIfChanged({ newProfileProps, profile })
  }, [props.newProfileProps])

  const {
    match = { params: { id: "jOAMi0Yy5YP9oI7v1MA4FtkanSV2" } },
    newProfileProps,
  } = props

  const dispatch = useDispatch()
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  )
  const { currentUser } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.async)
  let profile

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  })

  const updatePropsIfChanged = async ({ newProfileProps, profile }) => {
    console.log("newProfileProps", newProfileProps) // zzz
    console.log("profile", profile) // zzz

    const newProps = { ...profile, ...newProfileProps }
    const test = _isEqual(newProps, profile)
    console.log({ test })
    onClick()
  }

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile
  } else {
    profile = selectedUserProfile
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const onClick = async () => {
    try {
      await updateUserProfile({ ...profile, ...newProfileProps })
    } catch (error) {
    } finally {
    }
  }
  console.log("profile", profile) // zzz

  return null
}
