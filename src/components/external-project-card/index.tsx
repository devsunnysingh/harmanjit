import { Fragment } from 'react';
import LazyImage from '../lazy-image';
import { MdOpenInNew } from 'react-icons/md';
import { ga, skeleton } from '../../utils';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';

const categoryOrder = [
  'Featured Online Work',
  'Research & Thesis',
  'Journal Clubs',
  'Posters & Patient Education',
  'Cover Letters',
  'Certificates',
  'Resumes',
  'Professional & Leadership',
  'Essays & Public Health',
];

const ExternalProjectCard = ({
  externalProjects,
  header,
  loading,
  googleAnalyticId,
}: {
  externalProjects: SanitizedExternalProject[];
  header: string;
  loading: boolean;
  googleAnalyticId?: string;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < externalProjects.length; index++) {
      array.push(
        <div className="card shadow-md card-sm bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    <div className="avatar w-full h-full">
                      <div className="w-24 h-24 mask mask-squircle mx-auto">
                        {skeleton({
                          widthCls: 'w-full',
                          heightCls: 'h-full',
                          shape: '',
                        })}
                      </div>
                    </div>
                    <div className="mt-2">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                    <div className="mt-2 flex items-center flex-wrap justify-center">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderProjectCard = (item: SanitizedExternalProject, key: string) => {
    const projectUrl = item.link.startsWith('content/')
      ? `${import.meta.env.BASE_URL}${item.link}`
      : item.link;
    const imageUrl = item.imageUrl?.startsWith('work-images/')
      ? `${import.meta.env.BASE_URL}${item.imageUrl}`
      : item.imageUrl;
    const isLocalDocument = item.link.startsWith('content/');

    return (
      <a
        className="card shadow-md card-sm bg-base-100 cursor-pointer overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
        key={key}
        href={projectUrl}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalyticId) {
              ga.event('Click External Project', {
                post: item.title,
              });
            }
          } catch (error) {
            console.error(error);
          }

          const documentTab = window.open('', '_blank');

          if (!documentTab) {
            return;
          }

          if (!isLocalDocument) {
            documentTab.location.href = projectUrl;
            return;
          }

          void fetch(projectUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Unable to load ${projectUrl}`);
              }

              return response.blob();
            })
            .then((documentBlob) => {
              const documentUrl = URL.createObjectURL(documentBlob);
              documentTab.location.href = documentUrl;
              window.setTimeout(() => URL.revokeObjectURL(documentUrl), 60000);
            })
            .catch((error) => {
              console.error(error);
              documentTab.location.href = projectUrl;
            });
        }}
      >
        <div className="h-full w-full">
          {imageUrl && (
            <div className="h-44 w-full overflow-hidden bg-base-300">
              <LazyImage
                src={imageUrl}
                alt={`${item.title} preview`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                placeholder={skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-full',
                  shape: '',
                })}
              />
            </div>
          )}
          <div className="flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-lg text-base-content">
                {item.title}
              </h2>
              <MdOpenInNew className="mt-1 shrink-0 text-primary" />
            </div>
            <p className="mt-3 text-sm leading-6 text-base-content/70">
              {item.description}
            </p>
          </div>
        </div>
      </a>
    );
  };

  const renderExternalProjects = () => {
    const groupedProjects = externalProjects.reduce<
      Record<string, SanitizedExternalProject[]>
    >((groups, item) => {
      const category = item.category || 'Other Work';
      groups[category] ||= [];
      groups[category].push(item);
      return groups;
    }, {});

    const categories = Object.keys(groupedProjects).sort((first, second) => {
      const firstIndex = categoryOrder.indexOf(first);
      const secondIndex = categoryOrder.indexOf(second);
      return (
        (firstIndex === -1 ? categoryOrder.length : firstIndex) -
        (secondIndex === -1 ? categoryOrder.length : secondIndex)
      );
    });

    return categories.map((category) => (
      <section key={category}>
        <div className="mb-4 flex items-center gap-3">
          <h4 className="text-base font-semibold tracking-wide text-base-content">
            {category}
          </h4>
          <span className="badge badge-ghost">
            {groupedProjects[category].length}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {groupedProjects[category].map((item, index) =>
            renderProjectCard(item, `${category}-${index}`),
          )}
        </div>
      </section>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-3">
                {loading ? (
                  skeleton({
                    widthCls: 'w-12',
                    heightCls: 'h-12',
                    className: 'rounded-xl',
                  })
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                    <MdOpenInNew className="text-2xl" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-base-content truncate">
                    {loading
                      ? skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                      : header}
                  </h3>
                  <div className="text-base-content/60 text-xs sm:text-sm mt-1 truncate">
                    {loading
                      ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                      : `Showcasing ${externalProjects.length} projects`}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-10">
              {loading ? renderSkeleton() : renderExternalProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExternalProjectCard;
