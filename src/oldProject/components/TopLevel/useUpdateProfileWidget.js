import React from "react"
import { useDispatch, useSelector } from "react-redux"
import _isEqual from "lodash.isequal"
import _get from "lodash.get"

import {
  getUserProfile,
  updateUserProfile,
} from "../../../app/firestore/firestoreService"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import { listenToSelectedUserProfile } from "../../../features/profiles/profileActions"
import Constants from "../../../Common/Constants/Constants"

export default function useUpdateProfileWidget() {
  const dispatch = useDispatch()
  const { currentUserProfile } = useSelector((state) => state.profile)
  const { currentUser = {} } = useSelector((state) => state.auth)

  const profile = currentUserProfile || {}
  const idParam = profile.id || "none"

  useFirestoreDoc({
    query: () => getUserProfile(idParam),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, idParam],
    shouldExecute: idParam !== (currentUser && currentUser.uid),
  })

  const getProfile = () => profile

  const getUserStatus = async () => {
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

  const getCompletedQuests = () => {
    return profile?.userStatus?.completedQuests || []
  }

  const addQuestToCompletedQuests = async ({ completedQuest }) => {
    const userStatus = await getUserStatus()

    const { completedQuests } = userStatus
    if (!completedQuests.includes(completedQuest)) {
      completedQuests.push(completedQuest)
    }

    updateProfilePropsIfChanged({
      newProfileProps: { userStatus },
    })
  }

  const updateProfilePropsIfChanged = async ({ newProfileProps }) => {
    const updatedProps = { ...profile, ...newProfileProps }
    const needToUpdateProps = !_isEqual(updatedProps, profile)

    if (needToUpdateProps) {
      _updateProps({ newProps: updatedProps })
    }
  }

  const updateUserStatusPocketsIfChanged = async ({ pockets }) => {
    // only save gold to server
    const pockets2 = { gold: pockets.gold }
    const userStatus = await getUserStatus()
    const newUserStatus = { ...userStatus, pockets: pockets2 }

    const needToUpdatePockets = !_isEqual(newUserStatus, userStatus)

    if (needToUpdatePockets) {
      updateProfilePropsIfChanged({
        newProfileProps: { userStatus: { ...newUserStatus } },
      })
    }
  }

  const _updateProps = async ({ newProps }) => {
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
    getCompletedQuests,
  }
}
