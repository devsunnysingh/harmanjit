import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import profileImage from '../../assets/profile_image.jpeg';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  headline?: string;
  contactEmail?: string;
}

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  headline,
  contactEmail,
}): React.JSX.Element => {
  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-8 rounded-full w-32 h-32 ${
                avatarRing
                  ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
              {
                <LazyImage
                  src={profileImage}
                  alt={profile.name}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              }
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {profile.name}
              </span>
            )}
          </h5>
          <div className="mt-3 text-base-content font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
          {headline && (
            <p className="mt-4 text-sm font-semibold tracking-wide text-primary">
              {headline}
            </p>
          )}
        </div>
        {(resumeFileUrl || contactEmail) && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {resumeFileUrl &&
              (loading ? (
                <div>
                  {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
                </div>
              ) : (
                <a
                  href={resumeFileUrl}
                  target="_blank"
                  className="btn btn-outline btn-sm text-xs opacity-50"
                  download
                  rel="noreferrer"
                >
                  Download Resume
                </a>
              ))}
            {contactEmail && !loading && (
              <a
                href={`mailto:${contactEmail}`}
                className="btn btn-primary btn-sm text-xs"
              >
                Let's Connect
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCard;
