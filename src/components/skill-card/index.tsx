import { skeleton } from '../../utils';
import { SanitizedSkillGroup } from '../../interfaces/sanitized-config';

const SkillCard = ({
  loading,
  skills,
  skillGroups,
}: {
  loading: boolean;
  skills: string[];
  skillGroups: SanitizedSkillGroup[];
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div key={index}>
          {skeleton({ widthCls: 'w-16', heightCls: 'h-4', className: 'm-1' })}
        </div>,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                Research &amp; Clinical Expertise
              </span>
            )}
          </h5>
        </div>
        <div className="p-3 flow-root">
          {loading ? (
            <div className="flex flex-wrap justify-center gap-2">
              {renderSkeleton()}
            </div>
          ) : skillGroups.length !== 0 ? (
            <div className="skill-group-grid grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title} className="skill-group min-w-0">
                  <h6 className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    {group.title}
                  </h6>
                  <div className="skill-badge-list grid gap-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill}
                        className="skill-badge badge badge-primary badge-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <div key={skill} className="badge badge-primary badge-sm">
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
