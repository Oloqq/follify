export function extractPrefixedIds(tracks: Track[]): string[] {
  return tracks.map(track => "spotify:track:" + track.id);
}

