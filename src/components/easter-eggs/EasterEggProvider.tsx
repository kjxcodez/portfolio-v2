'use client'

import { ConsoleMessage } from './ConsoleMessage'
import { KonamiCode } from './KonamiCode'
import { RageClick } from './RageClick'
import { SecretTrigger } from './SecretTrigger'
import { TabTitleTrick } from './TabTitleTrick'
import { ScrollSpeedrun } from './ScrollSpeedrun'
import { AchievementToast } from './AchievementToast'

export function EasterEggProvider() {
  return (
    <>
      <ConsoleMessage />
      <KonamiCode />
      <RageClick />
      <SecretTrigger />
      <TabTitleTrick />
      <ScrollSpeedrun />
      <AchievementToast />
    </>
  )
}

