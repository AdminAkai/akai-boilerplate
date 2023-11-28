import { createSelector } from '@reduxjs/toolkit'

const selectLandingSliceReducer = (state: any) => state.landing

export const selectGithubRepos = createSelector(
  [selectLandingSliceReducer],
  (state) => state.githubRepos
)
