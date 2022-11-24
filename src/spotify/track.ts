export function extractIds(tracks: Track[]): string[] {
  return tracks.map(track => track.id);
}

