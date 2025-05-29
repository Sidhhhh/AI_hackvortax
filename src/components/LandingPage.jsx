import React from 'react';
import styled from 'styled-components';
import Spline from '@splinetool/react-spline';
import Card from './Social';
import Feature from './Feature';
import Tooltip from './Share';
import Profile from './Profile';
import UI from './ui';


const Container = styled.section`
  max-width: 1200px;
  margin-left: 300px; /* Push content to the right to avoid sidebar overlap */
  padding: 1rem;
  min-height: calc(100vh - 100px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
  font-family: 'Poppins', sans-serif;
  background-color:rgb(213, 213, 234);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: 3.5rem;
  color: #0f1e6a;
  margin-bottom: 1rem;
`;

const Heading1 = styled.span`
  font-weight: 700;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #333333;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  font-size: 0.8rem;
  outline: none;
  border: none;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
`;

const LandingPage = () => {
  return (
    <div>
    <Container>
      <Content>
        <Heading>
          AI-Powered<br />
          <Heading1>Personalized </Heading1><br />
          <Heading>Learning Platform</Heading>
        </Heading>
        <Paragraph>
          Unlock your full learning potential with our intuitive education
          platform. Seamlessly blending technology and education, we provide an
          immersive learning environment that combines interactive courses,
          virtual classrooms, and intelligent chatbot.
        </Paragraph>
        <Card/>
      </Content>      
          <main className="home-container">
      <div className="spline-wrapper">
        <Spline scene="https://prod.spline.design/qkQkbv2bYlEvQsEZ/scene.splinecode" />
        <Tooltip />
      </div>
      
      <style>
        {`.home-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  padding-right: 50px; /* right space */
}

.spline-wrapper {
  width: 500px;
  height: 500px;
}`}
      </style>
    </main>
    </Container>
    <Feature/>
    <Profile/>
    </div>
    
  );
};

export default LandingPage;
