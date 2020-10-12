# evil-player

> An unstoppable video player for landings

[![NPM](https://img.shields.io/npm/v/evil-player.svg)](https://www.npmjs.com/package/evil-player) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save evil-player
```

## Usage

```tsx
import React, { Component } from 'react'

import { EvilPlayer } from 'evil-player'

class Example extends Component {
  render () {
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
}
```

## License

MIT © [YChebotaev](https://github.com/YChebotaev)
