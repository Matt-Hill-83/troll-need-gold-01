import useLocalState from "../../oldProject/components/TopLevel/useLocalState.js"
import { useState } from "react"

import TopLevelUtils from "./TopLevelUtils.js"
import { useDispatch, useSelector } from "react-redux"

export default function useUtils2() {
  // export default function UpdateProfileWidget(props) {
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
    const newProps = { ...profile, ...newProfileProps }
    const needToUpdateProps = !_isEqual(newProps, profile)
    if (needToUpdateProps) {
      updateProps()
    }
  }

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile
  } else {
    profile = selectedUserProfile
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />

  const updateProps = async () => {
    try {
      await updateUserProfile({ ...profile, ...newProfileProps })
    } catch (error) {
    } finally {
    }
  }
  return { updatePropsIfChanged }
}

// export default useUtils2
