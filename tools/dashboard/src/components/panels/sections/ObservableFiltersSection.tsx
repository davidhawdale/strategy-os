import './ObservableFiltersSection.css';

interface Props {
  observableFilters?: string[];
}

export function ObservableFiltersSection({ observableFilters }: Props) {
  if (!observableFilters || observableFilters.length === 0) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Observable Filters</h3>
      <ol className="observable-characteristics">
        {observableFilters.map((filter, i) => <li key={i}>{filter}</li>)}
      </ol>
    </div>
  );
}
