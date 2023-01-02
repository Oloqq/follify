export function extractPrefixedIds(tracks: Map<string, Track>): string[] {
  let res: string[] = [];
  tracks.forEach(track => {
    res.push(`spotify:track:${track.id}`);
  })
  return res;
}

