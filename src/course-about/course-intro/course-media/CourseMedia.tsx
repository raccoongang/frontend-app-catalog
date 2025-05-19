import {
  Icon, Image, useToggle,
} from '@openedx/paragon';
import { PlayCircleFilledWhite } from '@openedx/paragon/icons';
import { VideoModal } from '../../../generic/video-modal';

import { CourseMediaProps } from './types';

const CourseMedia = ({
  imageUrl, videoId, altText,
}: CourseMediaProps) => {
  const [isOpen, open, close] = useToggle(false);
  const embedVideoUrl = videoId ? `//www.youtube.com/embed/${videoId}` : '';

  return (
    <>
      {embedVideoUrl && (
        <VideoModal
          isOpen={isOpen}
          close={close}
          videoID={videoId || ''}
        />
      )}
      <div className="course-media-wrapper">
        {embedVideoUrl ? (
          <div className="course-media-video-container">
            <button
              type="button"
              className="course-media-video-thumbnail"
              onClick={open}
            >
              <Image className="course-media-image" src={imageUrl} alt={altText} />
              <Icon className="course-media-play-btn" src={PlayCircleFilledWhite} />
            </button>
          </div>
        ) : (
          <Image className="course-media-image" src={imageUrl} alt={altText} />
        )}
      </div>
    </>
  );
};

export default CourseMedia;
