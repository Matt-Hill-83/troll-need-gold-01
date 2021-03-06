import React from "react"
import { Tab } from "semantic-ui-react"
import AboutTab from "./AboutTab"
import PhotosTab from "./PhotosTab"

export default function ProfileContent({ profile, isCurrentUser }) {
  // const [activeTab, setActiveTab] = useState(1)
  const panes = [
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab
          profile={profile}
          isCurrentUser={isCurrentUser}
          // activeTab={activeTab}
        />
      ),
    },
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
  ]

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      // onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  )
}
