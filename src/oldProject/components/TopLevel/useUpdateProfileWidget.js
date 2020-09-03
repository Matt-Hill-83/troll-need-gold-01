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

export default function useUpdateProfileWidget(props) {
  const match = { params: { id: "jOAMi0Yy5YP9oI7v1MA4FtkanSV2" } }

  const dispatch = useDispatch()
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  )
  const { currentUser } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.async)
  let profile

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile
  } else {
    profile = selectedUserProfile
  }

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  })

  const updatePropsIfChanged = async ({ newProfileProps }) => {
    console.log("newProfileProps", newProfileProps) // zzz
    console.log("profile", profile) // zzz

    const newProps = { ...profile, userStatus: newProfileProps }
    console.log("newProps", newProps) // zzz
    const needToUpdateProps = !_isEqual(newProps, profile)
    console.log("needToUpdateProps", needToUpdateProps) // zzz
    if (needToUpdateProps) {
      updateProps({ newProps })
    }
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const updateProps = async ({ newProps }) => {
    console.log("updateProps------------------------>>>") // zzz
    try {
      await updateUserProfile(newProps)
    } catch (error) {
    } finally {
    }
  }
  console.log("profile", profile) // zzz
  return { updatePropsIfChanged }
}
