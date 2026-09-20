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
    <div className="card card-sm bg-base-100 shadow-xl ring-1 ring-base-300/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="grid place-items-center py-8 px-4">
        <div className="mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-80" />
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
        <div className="text-center mx-auto px-2 sm:px-6">
          <h5 className="font-black text-2xl md:text-3xl tracking-tight text-base-content/80">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-80">{profile.name}</span>
            )}
          </h5>
          <div className="mt-3 text-base-content/80 font-mono text-sm tracking-wide">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
          {headline && (
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              {headline}
            </p>
          )}
          <div className="mt-5 rounded-2xl border border-base-300 bg-base-200/40 p-3 text-left shadow-sm">
            <h6 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Professional Summary
            </h6>
            <p className="text-xs leading-relaxed text-base-content/80">
              PharmD and MS Pharmaceutical Sciences candidate with experience in
              clinical research, drug development, regulatory documentation,
              scientific writing, literature review, and healthcare operations.
              Strong in source documentation, data analysis, and communicating
              with clinical and scientific stakeholders.
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/80">
              Open to: Clinical Research • Regulatory Affairs • Scientific Writing
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-3 text-left shadow-sm">
            <h6 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Selected Achievements
            </h6>
            <ul className="space-y-2 text-xs leading-relaxed text-base-content/80">
              <li>• Supported literature review, source documentation, and research communication in regulated healthcare settings.</li>
              <li>• Contributed to quality-conscious clinical and scientific documentation workflows.</li>
              <li>• Applied data analysis and evidence synthesis to support research and presentation-ready reporting.</li>
            </ul>
          </div>
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
                  className="btn btn-outline btn-sm text-xs tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  download
                  rel="noreferrer"
                >
                  Download Resume
                </a>
              ))}
            {contactEmail && !loading && (
              <a
                href={`mailto:${contactEmail}`}
                className="btn btn-primary btn-sm text-xs tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
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
