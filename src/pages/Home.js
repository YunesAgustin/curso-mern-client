import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HomeMyCoursesWork from '../components/Web/HowMyCoursesWork';
import { Helmet } from 'react-helmet';
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Agustin | Home</title>
      </Helmet>
      <MainBanner />
      <HomeCourses />
      <HomeMyCoursesWork />
    </>
  );
}
