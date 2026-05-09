import type { JobsToBeDone } from '../../../model/types';
import './JobsSection.css';

interface Props {
  jobs?: JobsToBeDone;
}

export function JobsSection({ jobs }: Props) {
  if (!jobs || !(jobs.functional || jobs.emotional || jobs.social)) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Jobs to be Done</h3>
      <dl className="jobs-list">
        {jobs.functional && (
          <>
            <dt className="jobs-list__term">Functional</dt>
            <dd className="jobs-list__def">{jobs.functional}</dd>
          </>
        )}
        {jobs.emotional && (
          <>
            <dt className="jobs-list__term">Emotional</dt>
            <dd className="jobs-list__def">{jobs.emotional}</dd>
          </>
        )}
        {jobs.social && (
          <>
            <dt className="jobs-list__term">Social</dt>
            <dd className="jobs-list__def">{jobs.social}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
