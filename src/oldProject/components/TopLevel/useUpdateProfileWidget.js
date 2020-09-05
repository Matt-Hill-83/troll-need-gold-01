import React from "react"
import { useDispatch, useSelector } from "react-redux"
// import { Button } from "semantic-ui-react"
import _isEqual from "lodash.isequal"

import {
  getUserProfile,
  updateUserProfile,
} from "../../../app/firestore/firestoreService"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import { listenToSelectedUserProfile } from "../../../features/profiles/profileActions"

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

  const getProfile = () => profile

  const updatePropsIfChanged = async ({ newProfileProps }) => {
    console.log("updatePropsIfChanged") // zzz
    console.log("updatePropsIfChanged") // zzz
    console.log("updatePropsIfChanged") // zzz
    console.log("updatePropsIfChanged") // zzz
    console.log("newProfileProps", newProfileProps) // zzz
    const newProps = { ...profile, userStatus: newProfileProps }
    console.log("newProps", newProps.userStatus) // zzz
    console.log("profile", profile.userStatus) // zzz
    const needToUpdateProps = !_isEqual(newProps, profile)
    console.log("needToUpdateProps", needToUpdateProps) // zzz
    if (needToUpdateProps) {
      _updateProps({ newProps })
    }
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const _updateProps = async ({ newProps }) => {
    console.log("_updateProps------------------------>>>") // zzz
    console.log("_updateProps------------------------>>>") // zzz
    console.log("_updateProps------------------------>>>") // zzz
    console.log("_updateProps------------------------>>>") // zzz
    console.log("_updateProps------------------------>>>") // zzz
    console.log("_updateProps------------------------>>>") // zzz
    const gold = newProps.userStatus.pockets.gold
    console.log("newProps-gold", gold) // zzz
    try {
      if (newProps.pockets) {
        newProps.pockets = null
        delete newProps.pockets
      }
      await updateUserProfile(newProps)
    } catch (error) {
    } finally {
    }
  }

  return { updatePropsIfChanged, getProfile }
}
