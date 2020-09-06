import React from "react"
import { useDispatch, useSelector } from "react-redux"
import _isEqual from "lodash.isequal"
import _get from "lodash.get"

import {
  getUserProfile,
  updateUserProfile,
} from "../../../app/firestore/firestoreService"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import { listenToSelectedUserProfile } from "../../../features/profiles/profileActions"
import Constants from "../../Utils/Constants/Constants"

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

  const getUserStatus = async () => {
    console.log("getUserStatus") // zzz

    if (!profile.userStatus) {
      profile.userStatus = Constants.getDefaultUserStatus()
    } else {
      if (!profile.userStatus.completedQuests) {
        profile.userStatus.completedQuests = []
      }

      if (!profile.userStatus.pockets) {
        profile.userStatus.pockets = {}
      }
    }

    await updateProfilePropsIfChanged({
      newProfileProps: { userStatus: { ...profile.userStatus } },
    })

    return profile.userStatus
  }

  const addQuestToCompletedQuests = async ({ completedQuest }) => {
    console.log("addQuestToCompletedQuests") // zzz
    const userStatus = await getUserStatus()
    console.log("userStatus", userStatus) // zzz

    const { completedQuests } = userStatus
    completedQuests.push(completedQuest)

    console.log("completedQuests", completedQuests) // zzz

    updateProfilePropsIfChanged({
      newProfileProps: { userStatus },
    })
  }

  const updateProfilePropsIfChanged = async ({ newProfileProps }) => {
    console.log("updateProfilePropsIfChanged------------------------------->>>") // zzz
    console.log("updateProfilePropsIfChanged------------------------------->>>") // zzz
    console.log("newProfileProps", newProfileProps) // zzz

    const updatedProps = { ...profile, ...newProfileProps }
    console.log("updatedProps", updatedProps) // zzz
    console.log("profile", profile) // zzz

    const needToUpdateProps = !_isEqual(updatedProps, profile)

    if (needToUpdateProps) {
      _updateProps({ newProps: updatedProps })
    }
  }

  const updateUserStatusPocketsIfChanged = async ({ pockets }) => {
    const userStatus = await getUserStatus()
    console.log("userStatus", userStatus) // zzz
    const newUserStatus = { ...userStatus, pockets }

    const needToUpdatePockets = !_isEqual(newUserStatus, userStatus)
    console.log("needToUpdatePockets", needToUpdatePockets) // zzz

    if (needToUpdatePockets) {
      updateProfilePropsIfChanged({
        newProfileProps: { userStatus: { ...newUserStatus } },
      })
    }
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const _updateProps = async ({ newProps }) => {
    console.log("_updateProps------------------------>>>") // zzz
    console.log("_updateProps------------------------>>>") // zzz
    try {
      await updateUserProfile(newProps)
    } catch (error) {
    } finally {
    }
  }

  return {
    addQuestToCompletedQuests,
    getProfile,
    updateUserStatusPocketsIfChanged,
  }
}
