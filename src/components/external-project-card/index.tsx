import { Fragment, useState } from 'react';
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

export const getExternalProjectCategories = (
  externalProjects: SanitizedExternalProject[],
): string[] => {
  const categories = Array.from(
    new Set(externalProjects.map((item) => item.category || 'Other Work')),
  );

  return categories.sort((first, second) => {
    const firstIndex = categoryOrder.indexOf(first);
    const secondIndex = categoryOrder.indexOf(second);
    return (
      (firstIndex === -1 ? categoryOrder.length : firstIndex) -
      (secondIndex === -1 ? categoryOrder.length : secondIndex)
    );
  });
};

const getCategoryId = (category: string): string =>
  `research-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

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
        className="card card-sm cursor-pointer overflow-hidden border border-base-300 bg-base-100 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
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

  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories((previous) => ({
      ...previous,
      [category]: !previous[category],
    }));
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

    const categories = getExternalProjectCategories(externalProjects);

    return categories.map((category) => {
      const isCollapsed = !!collapsedCategories[category];

      return (
        <div
          key={category}
          id={getCategoryId(category)}
          className={`research-category rounded-2xl border border-base-300 bg-base-100/60 p-4 shadow-sm ${
            isCollapsed ? 'collapsed' : ''
          }`}
        >
          <div
            role="button"
            tabIndex={0}
            aria-expanded={!isCollapsed}
            onClick={() => toggleCategory(category)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleCategory(category);
              }
            }}
            className="research-category-summary mb-4 flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1 transition-colors hover:bg-base-200/60"
          >
            <div className="flex flex-1 items-center gap-3">
              <h4 className="text-base font-bold uppercase tracking-[0.12em] text-base-content">
                {category}
              </h4>
              <span className="badge badge-primary badge-sm px-3">
                {groupedProjects[category].length}
              </span>
            </div>
            <div className="research-category-toggle flex h-8 w-8 items-center justify-center rounded-full bg-base-200 text-lg font-light text-primary transition-transform duration-300">
              +
            </div>
          </div>
          <div className="research-category-grid grid grid-cols-1 gap-6 overflow-hidden transition-all duration-300 ease-out md:grid-cols-2">
            {groupedProjects[category].map((item, index) =>
              renderProjectCard(item, `${category}-${index}`),
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div
        id="research-work"
        className="col-span-1 lg:col-span-2 scroll-mt-4"
      >
        <div className="card border border-base-300 bg-base-200 shadow-xl">
          <div className="card-body p-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3">
                {loading ? (
                  skeleton({
                    widthCls: 'w-12',
                    heightCls: 'h-12',
                    className: 'rounded-xl',
                  })
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                    <MdOpenInNew className="text-2xl text-primary" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-black uppercase tracking-[0.18em] text-base-content sm:text-lg">
                    {loading
                      ? skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                      : header}
                  </h3>
                  <div className="mt-1 truncate text-xs text-base-content/60 sm:text-sm">
                    {loading
                      ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                      : `Showcasing ${externalProjects.length} projects`}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {loading ? renderSkeleton() : renderExternalProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExternalProjectCard;
