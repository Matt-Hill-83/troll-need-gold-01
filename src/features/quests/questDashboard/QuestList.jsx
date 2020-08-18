import React from "react"
import QuestListItem from "./QuestListItem"
import InfiniteScroll from "react-infinite-scroller"

export default function QuestList({
  events,
  getNextEvents,
  loading,
  moreEvents,
}) {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {events.map((event) => (
            <QuestListItem event={event} key={event.id} />
          ))}
        </InfiniteScroll>
      )}
    </>
  )
}
