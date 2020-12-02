import { resolve } from 'path'
require('dotenv').config({ path: resolve('.env') })
const got = require('got')

interface AocDayProgress {
  1: { get_star_ts: string }
  2?: { get_star_ts: string }
}

interface AocStatsMember {
  id: string
  name: string
  stars: number
  last_star_ts: string
  local_score: number
  global_score: number
  completion_day_level: { [index: string]: AocDayProgress }
}

interface AocLeaderboardStats {
  event: string
  owner_id: string
  members: {
    [index: string]: AocStatsMember
  }
}

const fetchLeaderboardStats = (
    leaderboardId: string,
    year = 2020
  ): Promise<AocLeaderboardStats> => {
    return got
      .get(`https://adventofcode.com/${year}/leaderboard/private/view/${leaderboardId}.json`, {
        headers: {
          Cookie: `session=${process.env.AOC_SESSION_TOKEN}`,
        },
      })
      .json()
  },
  starTsDateString = (getStarTs?: string) => {
    if (!getStarTs) {
      return '--'
    }
    const date = new Date(Number(getStarTs) * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  },
  sortMembers = (
    members: AocLeaderboardStats['members'],
    sortKey: keyof Pick<AocStatsMember, 'local_score' | 'global_score' | 'stars'>
  ) => {
    return Object.values(members).sort((a, b) => b[sortKey] - a[sortKey])
  },
  logForCompletionDayEntry = ([day, { '1': part1, '2': part2 }]: [string, AocDayProgress]) => {
    return [
      '| Day ' + day,
      `|   ☆ ${starTsDateString(part1.get_star_ts)}`,
      `|   ★ ${starTsDateString(part2?.get_star_ts)}`,
    ].join('\n')
  },
  logForMember = ({ name, stars, local_score, completion_day_level }: AocStatsMember) => {
    return [
      [name, `${stars}*`, local_score].join(' - '),
      ...Object.entries(completion_day_level).map(logForCompletionDayEntry),
    ].join('\n')
  }

;(async () => {
  const { members } = await fetchLeaderboardStats('974246'),
    logs = sortMembers(members, 'local_score').map(logForMember).join('\n\n')
  console.log(logs)
})()
