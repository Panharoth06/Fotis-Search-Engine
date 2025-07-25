import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
        <section className='flex flex-col items-center'>
            <div className="loader">
                <div className="react-star">
                <div className="nucleus" />
                <div className="electron electron1" />
                <div className="electron electron2" />
                <div className="electron electron3" />
             </div>
            </div>
        </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    height: 25rem;
    width: 25rem;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-star {
    position: relative;
    width: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
    animation: rotate 3s infinite;
  }

  .nucleus {
    position: absolute;

    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: linear-gradient(#0738e8, cyan);
    height: 2rem;
    width: 2rem;
    animation: rotate 1s linear infinite;
  }

  .electron {
    position: absolute;
    width: 15rem;
    height: 6rem;
    border-radius: 50%;
    border: 0.3rem solid #00ffff;
    animation: revolve 1s linear infinite;
  }

  .electron1::before,
  .electron2::before,
  .electron3::before {
    content: "";
    position: absolute;
    top: 60%;
    left: 100%;
    transform: translate(-50%, -50%);
    width: 1rem;
    height: 1rem;
    background-color: cyan;
    border-radius: 50%;
    animation: moveElectron 1s infinite;
  }
  .electron2 {
    transform: rotate(60deg);
    animation-delay: -0.66s;
  }
  .electron2::before {
    animation-delay: -0.66s;
  }

  .electron3 {
    transform: rotate(-60deg);
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg) scale3d(1.1, 1.1, 0);
    }
  }

  @keyframes revolve {
    0% {
      border-color: #00ffff9c;
      border-right: transparent;
    }
    25% {
      border-color: #00ffff9c;
      border-bottom-color: transparent;
    }
    50% {
      border-color: #00ffff9c;
      border-left-color: transparent;
    }
    75% {
      border-color: #00ffff9c;
      border-top-color: transparent;
    }
    100% {
      border-color: #00ffff9c;
      border-right-color: transparent;
    }
  }

  @keyframes moveElectron {
    0% {
      top: 60%;
      left: 100%;
    }
    25% {
      top: 100%;
      left: 60%;
    }
    50% {
      top: 60%;
      left: 0%;
    }
    75% {
      top: 0%;
      left: 60%;
    }
    100% {
      top: 60%;
      left: 100%;
    }
  }`;

export default Loader;
