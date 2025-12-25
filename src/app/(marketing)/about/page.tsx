/**
 * About Us Page
 * Company story, mission, and values - Terminal Console Style
 */

'use client';

import { AboutHero } from './components/about-hero';
import { MissionSection } from './components/mission-section';
import { ValuesSection } from './components/values-section';
import { StorySection } from './components/story-section';
import { WhyChooseSection } from './components/why-choose-section';
import { AboutCTA } from './components/about-cta';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <section id="mission">
        <MissionSection />
      </section>
      <section id="values">
        <ValuesSection />
      </section>
      <section id="story">
        <StorySection />
      </section>
      <section id="why-choose">
        <WhyChooseSection />
      </section>
      <AboutCTA />
    </>
  );
}
