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
    <div className="card card-sm bg-base-100 shadow-xl ring-1 ring-base-300/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-80">
                Core Competencies
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
                <div key={group.title} className="skill-group min-w-0 rounded-xl border border-base-300 bg-base-200/30 p-3">
                  <h6 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {group.title}
                  </h6>
                  <div className="skill-badge-list flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill}
                        className="skill-badge badge badge-primary badge-sm px-3 py-3 text-[10px] font-semibold uppercase tracking-wide"
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
                <div key={skill} className="badge badge-primary badge-sm px-3 py-3 text-[10px] font-semibold uppercase tracking-wide">
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
