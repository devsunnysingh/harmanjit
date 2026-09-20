import React, { Fragment } from 'react';
import { SanitizedLeadership } from '../../interfaces/sanitized-config';
import { formatPeriod, skeleton } from '../../utils';

const ListItem = ({
  time,
  position,
  organization,
  organizationLink,
}: {
  time: React.ReactNode;
  position?: React.ReactNode;
  organization?: React.ReactNode;
  organizationLink?: string;
}) => (
  <li className="mb-5 ml-4">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
    ></div>
    <div className="my-0.5 text-xs">{time}</div>
    <h3 className="font-semibold">{position}</h3>
    <div className="mb-4 font-normal">
      {organizationLink ? (
        <a href={organizationLink} target="_blank" rel="noreferrer">
          {organization}
        </a>
      ) : (
        organization
      )}
    </div>
  </li>
);

const LeadershipCard = ({
  leadership,
  loading,
}: {
  leadership: SanitizedLeadership[];
  loading: boolean;
}) => {
  const renderSkeleton = () =>
    Array.from({ length: 2 }, (_, index) => (
      <ListItem
        key={index}
        time={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
        position={skeleton({
          widthCls: 'w-6/12',
          heightCls: 'h-4',
          className: 'my-1.5',
        })}
        organization={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
      />
    ));

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                Leadership &amp; Professional Memberships
              </span>
            )}
          </h5>
        </div>
        <div className="text-base-content">
          <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? (
              renderSkeleton()
            ) : (
              <Fragment>
                {leadership.map((item, index) => (
                  <ListItem
                    key={index}
                    time={formatPeriod(item.from, item.to)}
                    position={item.position}
                    organization={item.organization}
                    organizationLink={item.organizationLink || undefined}
                  />
                ))}
              </Fragment>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LeadershipCard;