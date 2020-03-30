import React from 'react';
import { ReactComponent as YoutubeIcon } from '../../../assets/img/youtube.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/twitter.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/linkedin.svg';
import './SocialLinks.scss';
export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.youtube.com/"
        className="youtube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YoutubeIcon />
      </a>
      <a
        href="https://www.facebook.com/"
        className="facebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://twitter.com/home"
        className="twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </a>
      <a
        href="https://www.linkedin.com/feed/"
        className="linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
}
