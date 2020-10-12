export const tryPlay = async (video: HTMLVideoElement): Promise<void> => {
  if (video.paused) {
    try {
      await video.play()
    } catch (error) {
      if (
        !error.message.includes("user didn't interact with the document first")
      ) {
        console.error(error)
      }
    }
  }
}
