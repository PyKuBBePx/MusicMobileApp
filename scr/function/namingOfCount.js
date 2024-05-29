export const namingCountTrack = (count) => {
  switch (true) {
    case
    (count > 5 && count < 20)
    || count % 10 === 5
    || count % 10 === 6
    || count % 10 === 7
    || count % 10 === 8
    || count % 10 === 9
    || count % 10 === 0
    :
      return `${count} треков`

    case
    count % 10 === 1 && count !== 11
    :
      return `${count} трек`

    default
    :
      return `${count} трека`
  }
}
