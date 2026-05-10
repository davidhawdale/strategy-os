import { Fragment, type ReactNode } from 'react';
import { resolveSectionOrder } from '../../../dashboard/layoutModel';

export interface OrderedSection {
  id: string;
  render: () => ReactNode;
}

export function renderOrderedSections(sectionOrder: string[] | undefined, sections: OrderedSection[]): ReactNode[] {
  const defaultOrder = sections.map(section => section.id);
  const sectionLookup = new Map(sections.map(section => [section.id, section]));

  return resolveSectionOrder(defaultOrder, sectionOrder).map(id => {
    const section = sectionLookup.get(id);
    if (!section) return null;

    return (
      <Fragment key={id}>
        {section.render()}
      </Fragment>
    );
  });
}
