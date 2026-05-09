import type { DestructionView } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import './KillSignalAuditSection.css';

interface Props {
  killSignalAudit?: DestructionView['killSignalAudit'];
}

export function KillSignalAuditSection({ killSignalAudit }: Props) {
  if (!killSignalAudit) return null;

  return (
    <div className="destruction-section">
      <h3 className="section-heading">
        Kill Signal Audit
        <span className="section-heading__count">{killSignalAudit.ignored}/{killSignalAudit.total} ignored</span>
      </h3>
      <DataTable
        caption="Kill signal audit"
        columns={[
          { key: 'signal', header: 'Signal', render: r => r.signal },
          {
            key: 'ignored',
            header: 'Ignored?',
            render: r => <span className={r.ignored ? 'text-fails' : 'text-passes'}>{r.ignored ? 'Yes' : 'No'}</span>,
          },
          { key: 'consequence', header: 'Consequence', render: r => r.consequenceIfIgnored },
        ]}
        data={killSignalAudit.entries}
      />
    </div>
  );
}
