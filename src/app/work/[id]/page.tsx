import { notFound } from 'next/navigation';

import { MOCK_PROJECTS } from './project-data';
import { WorkProjectView } from './WorkProjectView';

type PageParams = { id: string };

type PageProps = {
  /** Next 15+ passes `params` as a Promise; older types may still model a plain object. */
  params: Promise<PageParams> | PageParams;
};

export function generateStaticParams() {
  return Object.keys(MOCK_PROJECTS).map((id) => ({ id }));
}

async function resolveId(
  params: PageProps['params'],
): Promise<string> {
  const resolved = await Promise.resolve(
    params as Promise<PageParams> | PageParams,
  );
  const raw = resolved?.id;
  return typeof raw === 'string' ? raw : '';
}

export default async function WorkProjectPage({ params }: PageProps) {
  const id = await resolveId(params);
  const project = MOCK_PROJECTS[id];

  if (!project) {
    notFound();
  }

  return <WorkProjectView project={project} />;
}
