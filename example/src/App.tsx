import React from 'react'

import { EvilPlayer } from 'evil-player'

const App = () => {
  return (
    <EvilPlayer
      src='https://firebasestorage.googleapis.com/v0/b/my-landing-924bb.appspot.com/o/offer.mp4?alt=media'
      poster='https://picsum.photos/960/540?random=poster-1'
      width={960}
      height={540}
      ranges={[
        {
          from: 42,
          to: 64,
          onEnter: () => console.log('show offer'),
          onExit: () => console.log('hide offer'),
          onTimeupdate: () => void null
        }
      ]}
    />
  )
}

export default App
